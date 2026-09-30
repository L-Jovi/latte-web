// The guide beside each demo: it walks through the page step by step and shows what
// the page's scripts print, so nobody has to open the browser console.
// It is a classic script in <head>, even on pages that Vite bundles (Vite leaves such
// scripts alone), so it runs before the demo's own scripts and can wrap console
// before anything is logged.
// The panel has no headings, <output>, <nav> or list items on purpose: tests find
// demo elements by role, and the panel must not add a second match.
(() => {
  const url = document.currentScript?.dataset.guide;
  // Reserve the panel's column before the first paint, so adding it later moves nothing.
  document.documentElement.classList.add('latte-guided');

  const words = {
    en: {
      guide: 'Guide',
      step: (i, n) => `Guide · step ${i} of ${n}`,
      back: 'Previous step',
      next: 'Next step',
      console: 'Console',
      doIt: 'Do it',
      other: '中文',
    },
    zh: {
      guide: '说明',
      step: (i, n) => `说明 · 第 ${i} 步，共 ${n} 步`,
      back: '上一步',
      next: '下一步',
      console: '控制台',
      doIt: '动手试试',
      other: 'English',
    },
  };
  // English by default; a reader's choice is kept for the next page.
  let lang = 'en';
  try {
    if (localStorage.getItem('latte-guide-lang') === 'zh') lang = 'zh';
  } catch {}

  // Roughly what DevTools shows, without calling getters or following cycles forever.
  const format = (value, seen = new WeakSet(), depth = 0) => {
    if (typeof value === 'string') return depth ? JSON.stringify(value) : value;
    if (typeof value === 'function') return `ƒ ${value.name || 'anonymous'}()`;
    if (typeof value === 'bigint') return value + 'n';
    if (value === null || typeof value !== 'object') return String(value);
    if (value instanceof Element)
      return `<${value.localName}${value.id ? '#' + value.id : ''}>`;
    if (value instanceof Error) return `${value.name}: ${value.message}`;
    if (value instanceof Date || value instanceof RegExp) return String(value);
    // Boxed primitives, shown as DevTools does: String {"hello"}.
    if (
      value instanceof String ||
      value instanceof Number ||
      value instanceof Boolean
    )
      return `${value.constructor.name} {${JSON.stringify(value.valueOf())}}`;
    if (seen.has(value)) return '[Circular]';
    if (depth > 2) return Array.isArray(value) ? '[…]' : '{…}';
    seen.add(value);
    const inner = (v) => format(v, seen, depth + 1);
    if (Array.isArray(value)) return `[${value.map(inner).join(', ')}]`;
    if (value instanceof Map)
      return `Map(${value.size}) {${[...value].map(([k, v]) => `${inner(k)} => ${inner(v)}`).join(', ')}}`;
    if (value instanceof Set)
      return `Set(${value.size}) {${[...value].map(inner).join(', ')}}`;
    // Take the name from the prototype, never from the value itself: on a Proxy,
    // reading `value.constructor` runs its get trap, and that trap may log again.
    const proto = Object.getPrototypeOf(value);
    const name =
      proto &&
      proto !== Object.prototype &&
      typeof proto.constructor === 'function'
        ? proto.constructor.name + ' '
        : '';
    const fields = Reflect.ownKeys(value).map((key) => {
      const d = Object.getOwnPropertyDescriptor(value, key);
      return `${String(key)}: ${'get' in d ? '[Getter]' : inner(d.value)}`;
    });
    return `${name}{${fields.join(', ')}}`;
  };

  // Console lines since the guide's console was last cleared, kept from the first log
  // so the panel can show them once it exists. The panel draws them in a later task,
  // never while the demo's own code runs: changing the DOM in the middle of it would
  // queue the mutation-observer microtask early, and the task-order demo would print
  // `observer` before `promise`.
  const lines = [];
  let drawn = 0;
  let wipe = false;
  let drawing = 0;
  let log = null;
  let highlight = '';
  const show = (line) => {
    const item = document.createElement('div');
    item.className = 'latte-guide-line ' + line.kind;
    item.textContent = line.text;
    item.classList.toggle(
      'match',
      Boolean(highlight) && line.text.includes(highlight),
    );
    log.append(item);
    log.parentElement.hidden = false;
    log.scrollTop = log.scrollHeight;
  };
  const draw = () => {
    drawing = 0;
    if (!log) return;
    if (wipe) {
      log.replaceChildren();
      drawn = 0;
      wipe = false;
    }
    while (drawn < lines.length) show(lines[drawn++]);
  };
  const redraw = () => {
    if (!drawing) drawing = setTimeout(draw, 0);
  };
  const add = (kind, text) => {
    lines.push({ kind, text });
    redraw();
  };
  for (const kind of ['log', 'info', 'warn', 'error', 'debug']) {
    const original = console[kind];
    console[kind] = function (...args) {
      original.apply(this, args);
      add(kind, args.map((a) => format(a)).join(' '));
    };
  }
  addEventListener('error', (e) =>
    add('error', 'Uncaught ' + (e.error ? format(e.error) : e.message)),
  );
  addEventListener('unhandledrejection', (e) =>
    add('error', 'Uncaught (in promise) ' + format(e.reason)),
  );

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  };
  // Guide text uses `code` and **bold**, like the READMEs.
  const rich = (text) => {
    const span = el('span');
    for (const part of text.split(/(`[^`]+`|\*\*[^*]+\*\*)/)) {
      if (!part) continue;
      const code = part.startsWith('`'),
        bold = part.startsWith('**');
      span.append(
        el(
          code ? 'code' : bold ? 'strong' : 'span',
          '',
          code ? part.slice(1, -1) : bold ? part.slice(2, -2) : part,
        ),
      );
    }
    return span;
  };
  // The Chinese field when the reader chose Chinese and the guide has it.
  const pick = (item, key) =>
    (lang === 'zh' && item[key + 'Zh']) || item[key] || '';

  // Guide files come from this repository, so their short snippets are trusted code.
  // They run in the page's global scope, where the demo's own functions live.
  const evaluate = (expression) =>
    Function(`"use strict"; return (${expression})`)();
  const exec = (statements) => Function(`"use strict"; ${statements}`)();
  const inPage = (node) => !node.closest('.latte-guide');
  // Styles a step toggles, with their original inline values, so that every step
  // starts from the page as it was written.
  const toggled = new Map();
  const restore = () => {
    for (const [node, props] of toggled)
      for (const [property, value] of props) node.style[property] = value;
    toggled.clear();
  };
  const act = (action) => {
    // Start from an empty console, so only this step's output is listed.
    if (action.clear) {
      lines.length = 0;
      wipe = true;
      redraw();
    }
    if (action.fill) {
      // Set the value the way typing does, so frameworks such as React see it.
      const field = document.querySelector(action.fill.target);
      const prototype = Object.getPrototypeOf(field);
      Object.getOwnPropertyDescriptor(prototype, 'value').set.call(
        field,
        action.fill.value,
      );
      field.dispatchEvent(new Event('input', { bubbles: true }));
      field.dispatchEvent(new Event('change', { bubbles: true }));
    }
    if (action.click) document.querySelector(action.click).click();
    if (action.clickText)
      [...document.querySelectorAll('button, a, summary, [role="button"]')]
        .find(
          (node) =>
            inPage(node) && node.textContent.trim() === action.clickText,
        )
        .click();
    if (action.run) exec(action.run);
    if (action.toggle) {
      const { target, property, on, off } = action.toggle;
      for (const node of document.querySelectorAll(target)) {
        const props = toggled.get(node) ?? new Map();
        if (!props.has(property)) props.set(property, node.style[property]);
        toggled.set(node, props);
        node.style[property] = node.style[property] === off ? on : off;
      }
    }
  };
  // Outline the part of the demo a step is about, and bring it into view when the
  // reader moves to that step (not on page load, so the reading position stays).
  // The outline is a rule in the panel's own <style>, not a class on the demo's
  // elements: a demo may watch its elements with a MutationObserver (the task-order
  // page does), and the guide must not show up in what the demo observes.
  const outline = el('style');
  const focusOn = (selector, scroll) => {
    outline.textContent = selector
      ? `:is(${selector}):not(.latte-guide *) { outline: 3px dashed #c26a35; outline-offset: 4px; }`
      : '';
    const nodes = selector
      ? [...document.querySelectorAll(selector)].filter(inPage)
      : [];
    if (!scroll || !nodes.length) return;
    // Centre everything the step marks; if it is taller than the window, show its top.
    const rects = nodes.map((node) => node.getBoundingClientRect());
    const top = Math.min(...rects.map((r) => r.top));
    const bottom = Math.max(...rects.map((r) => r.bottom));
    scrollBy({
      top:
        bottom - top < innerHeight - 96
          ? (top + bottom - innerHeight) / 2
          : top - 64,
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'auto'
        : 'smooth',
    });
  };

  function build(guide) {
    const panel = el('aside', 'latte-guide');
    const out = el('div', 'latte-guide-console');
    out.hidden = true;
    const outLabel = el('p', 'latte-guide-label');
    log = el('div', 'latte-guide-lines');
    log.setAttribute('role', 'log');
    out.append(outLabel, log);
    const steps = guide?.steps || [];
    let index = 0;
    const top = el('div', 'latte-guide-top');
    const head = el('p', 'latte-guide-head');
    const switcher = el('button', 'latte-guide-lang');
    switcher.type = 'button';
    top.append(head, switcher);
    const body = el('div', 'latte-guide-step');
    body.setAttribute('aria-live', 'polite');
    const back = el('button', 'latte-guide-nav'),
      next = el('button', 'latte-guide-nav');
    back.type = next.type = 'button';
    const nav = el('div', 'latte-guide-buttons');
    nav.append(back, next);

    // The readouts follow the page: whenever the demo changes its DOM or the address,
    // they are read again, so a value that arrives late (a fetch, a React render, a
    // timer) still shows up. Changes inside the panel are ignored, or it would loop.
    let refresh = null;
    let queued = 0;
    const later = () => {
      if (refresh && !queued)
        queued = setTimeout(() => {
          queued = 0;
          refresh?.();
        }, 50);
    };
    new MutationObserver((records) => {
      if (records.some((record) => !panel.contains(record.target))) later();
    }).observe(document.documentElement, {
      subtree: true,
      childList: true,
      attributes: true,
      characterData: true,
    });
    addEventListener('hashchange', later);
    addEventListener('popstate', later);

    const render = (moved = false) => {
      const t = words[lang];
      panel.lang = lang === 'zh' ? 'zh-Hans' : 'en';
      panel.setAttribute('aria-label', t.guide);
      outLabel.textContent = t.console;
      switcher.textContent = t.other;
      switcher.lang = lang === 'zh' ? 'en' : 'zh-Hans';
      back.textContent = t.back;
      next.textContent = t.next;
      if (!steps.length) return;
      const step = steps[index];
      const action = step.action || {};
      if (moved) restore();
      focusOn(step.focus || action.click || action.toggle?.target, moved);
      head.textContent = t.step(index + 1, steps.length);
      body.replaceChildren(el('p', 'latte-guide-title', pick(step, 'title')));
      const text = el('p', 'latte-guide-text');
      text.append(rich(pick(step, 'text')));
      body.append(text);
      const watch = el('dl', 'latte-guide-watch');
      // Readouts can change many times a second, so screen readers are not told each time.
      watch.setAttribute('aria-live', 'off');
      const readouts = (step.watch || []).map((item) => {
        const shown = el('dd');
        watch.append(el('dt', '', pick(item, 'label')), shown);
        return [item, shown];
      });
      const update = () => {
        for (const [item, shown] of readouts) {
          let text;
          try {
            text = format(evaluate(item.value));
          } catch (error) {
            text = format(error);
          }
          if (shown.textContent !== text) shown.textContent = text;
        }
      };
      refresh = readouts.length ? update : null;
      if (step.action) {
        const doIt = el(
          'button',
          'latte-guide-do',
          pick(step, 'actionLabel') || t.doIt,
        );
        doIt.type = 'button';
        doIt.onclick = () => {
          act(step.action);
          // The demo's code has run and queued its microtasks, so changing the DOM now
          // cannot reorder them: draw the console at once.
          draw();
          // Click handlers and style changes apply at once, and reading a size forces
          // layout. Later DOM changes refresh the readouts by themselves (see below);
          // the second read covers values that change without touching the DOM.
          update();
          setTimeout(update, 300);
        };
        body.append(doIt);
      }
      body.append(watch);
      update();
      highlight = step.highlight || '';
      for (const line of log.children)
        line.classList.toggle(
          'match',
          Boolean(highlight) && line.textContent.includes(highlight),
        );
      back.disabled = index === 0;
      next.disabled = index === steps.length - 1;
    };
    back.onclick = () => (index--, render(true));
    next.onclick = () => (index++, render(true));
    // Switching the language keeps the page as it is: toggled styles stay switched.
    switcher.onclick = () => {
      lang = lang === 'zh' ? 'en' : 'zh';
      try {
        localStorage.setItem('latte-guide-lang', lang);
      } catch {}
      render();
    };
    panel.append(top);
    if (steps.length) panel.append(body, nav);
    panel.append(out, outline);
    draw();
    render();
    document.body.append(panel);
  }

  const ready =
    document.readyState === 'loading'
      ? new Promise((r) =>
          addEventListener('DOMContentLoaded', r, { once: true }),
        )
      : Promise.resolve();
  ready
    .then(() => (url ? fetch(url).then((r) => (r.ok ? r.json() : null)) : null))
    .catch(() => null)
    .then(build);
})();
