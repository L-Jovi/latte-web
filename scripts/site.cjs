// Shared page chrome for every demo page: the house stylesheet and the top bar.
// Used by scripts/catalog.mjs (static pages and templates), the webpack base config,
// the build scripts that write HTML themselves and the browser tests.

const { existsSync } = require('node:fs');
const { join } = require('node:path');
const catalog = require('../docs/catalog.json');

const source = 'https://github.com/L-Jovi/latte-web/tree/main/';
const blob = 'https://github.com/L-Jovi/latte-web/blob/main/';

const groups = [
  {
    kind: 'foundation',
    dir: 'fundamentals',
    title: 'Fundamentals',
    titleZh: '基础',
    intro: 'How JavaScript and the browser behave, one small page at a time.',
    introZh: '一次一个小页面，看 JavaScript 和浏览器的真实行为。',
  },
  {
    kind: 'mechanism',
    dir: 'mechanisms',
    title: 'Build it yourself',
    titleZh: '动手实现',
    intro: 'Small, tested versions of tools you use every day.',
    introZh: '日常工具的小型实现，每一个都有测试。',
  },
  {
    kind: 'tooling',
    dir: 'tooling',
    title: 'Build tools',
    titleZh: '构建工具',
    intro: 'How source files become something a browser can load.',
    introZh: '源代码是怎样变成浏览器能加载的文件的。',
  },
  {
    kind: 'example',
    dir: 'examples',
    title: 'Applications and experiments',
    titleZh: '应用与实验',
    intro:
      'Complete applications with old and new versions side by side, plus visual experiments.',
    introZh: '完整的应用示例（新旧写法并排对照），以及视觉实验。',
  },
  {
    kind: 'history',
    dir: 'docs/history',
    title: 'History',
    titleZh: '历史笔记',
    intro:
      'Notes kept from earlier years. Read them for context; they are not current advice.',
    introZh: '早年留下的笔记，用来了解背景，不代表今天的推荐做法。',
  },
];

// Pages that keep their own markup untouched.
const chrome = {
  // The service worker caches its own files; an extra stylesheet would change its
  // offline behaviour. Its page gets only assets/language.js, written inline.
  skipAll: new Set(['examples/service-worker/index.html']),
  // This page teaches header/nav landmarks, so an extra <nav> would muddy the lesson.
  skipBar: new Set(['fundamentals/html/semantic.html']),
};

const escape = (s) =>
  s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
// Catalog summaries use Markdown code spans for the READMEs; render them as <code> in HTML.
const inline = (text) => escape(text).replace(/`([^`]+)`/g, '<code>$1</code>');
// In Chinese text, three or more English words in a row (Core Web Vitals) are an
// English name: marked lang="en", like the guide panel does (assets/guide.js).
const inlineZh = (text) =>
  inline(text)
    .split(/(<code>[\s\S]*?<\/code>)/)
    .map((part, i) =>
      i % 2
        ? part
        : part.replace(
            /[A-Za-z][\w.+#'’/-]*(?:[ ,]+[A-Za-z][\w.+#'’/-]*){2,}/g,
            '<span lang="en">$&</span>',
          ),
    )
    .join('');

const kindTitle = Object.fromEntries(groups.map((g) => [g.kind, g]));

// Text in both languages, one shown at a time (assets/language.js and site.css).
const pair = (en, zh, tag = 'span') =>
  `<${tag} data-l="en">${en}</${tag}><${tag} data-l="zh">${zh}</${tag}>`;

// Path from a file inside the repository to the repository root, e.g. '../../'.
const rootFrom = (file) => '../'.repeat(file.split('/').length - 1);

const stylesheet = (rel) =>
  `<link rel="stylesheet" href="${rel}assets/site.css">`;
// A classic script in <head>: it sets the language before the page is drawn.
const languageScript = (rel, vite = false) =>
  `<script src="${rel}assets/language.js"${vite ? ' vite-ignore' : ''}></script>`;
// The switch starts hidden; language.js shows it and names the other language.
const languageSwitch =
  '<button type="button" class="latte-language" data-language-switch hidden>中文</button>';

// The README link follows the language: the English README, or its Chinese mirror.
const bar = (entry, rel) =>
  `<nav class="latte-bar" aria-label="Latte Web"><a class="latte-home" href="${rel}index.html">Latte Web</a><span class="latte-crumb">${pair(escape(kindTitle[entry.kind].title), escape(kindTitle[entry.kind].titleZh))}</span><span class="latte-links"><a data-l="en" href="${source}${entry.path}">README</a><a data-l="zh" href="${blob}${entry.path}/README.zh-Hans.md">README</a>${languageSwitch}</span></nav>`;

// The catalog entry that lists `file` (a path from the repository root) as one of its pages.
const entryFor = (file) => {
  const entry = catalog.find((e) => e.pages?.includes(file));
  if (!entry) throw new Error(`${file} is not a page in docs/catalog.json`);
  return entry;
};

// A page's step-by-step guide lives under assets/guides/, at the page's own path,
// so the demo folders stay as they are. Returns the path from the repository root.
const guideFor = (file) => {
  const guide = `assets/guides/${file.replace(/\.html$/, '')}.json`;
  return existsSync(join(__dirname, '..', guide)) ? guide : null;
};
// In a Vite template, `vite-ignore` tells Vite to leave this classic script as it is
// instead of warning that it cannot bundle it; Vite drops the attribute when it builds.
const guideScript = (rel, guide, vite = false) =>
  `<script src="${rel}assets/guide.js" data-guide="${rel}${guide}"${vite ? ' vite-ignore' : ''}></script>`;

// A complete page for build outputs that have no hand-written HTML of their own.
// The bundler injects its scripts; `body` is extra markup after the heading.
const page = (file, body = '') => {
  const entry = entryFor(file);
  const rel = rootFrom(file);
  const guide = guideFor(file);
  return `<!doctype html>
<html lang="en" data-title-en="${escape(entry.title)} · Latte Web" data-title-zh="${escape(entry.titleZh)} · Latte Web">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(entry.title)} · Latte Web</title>
${stylesheet(rel)}
${languageScript(rel)}
${guide ? guideScript(rel, guide) + '\n' : ''}</head>
<body>
${bar(entry, rel)}
<h1>${pair(escape(entry.title), escape(entry.titleZh))}</h1>
<p class="latte-lead">${pair(inline(entry.summary), inlineZh(entry.summaryZh))}</p>
${body}</body>
</html>
`;
};

module.exports = {
  source,
  blob,
  groups,
  chrome,
  escape,
  inline,
  inlineZh,
  rootFrom,
  stylesheet,
  languageScript,
  languageSwitch,
  pair,
  bar,
  entryFor,
  page,
  guideFor,
  guideScript,
};
