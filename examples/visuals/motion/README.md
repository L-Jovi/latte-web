# Menu, step bar and progress ring

English | [简体中文](README.zh-Hans.md)

An expanding menu (JavaScript tween vs CSS transition), a step bar and a `conic-gradient` progress ring. A _tween_ is an animation computed step by step in code, from a start value to an end value.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/examples/visuals/motion/
```

It works right after cloning; no `npm ci` or build step is needed. The page has three small parts:

- The menu: hover over **JavaScript tween** or **CSS transition**, or move to them with the Tab key. Both widen from 180 to 260 pixels and shrink back when you leave. A script animates the first one; CSS animates the second.
- The step bar: click **Next** to move the highlight from **Read** to **Run** and then **Compare**; **Back** goes the other way. The text under the buttons says `Step 2 of 3` and so on.
- The progress ring: drag the **Progress** slider. The coloured part of the ring and the percentage in its middle follow it.

You can also open the [live demo](https://l-jovi.github.io/latte-web/examples/visuals/motion/index.html).

## How it works

Read [index.html](index.html) (95 lines) for the markup and the CSS, then [app.js](app.js) (53 lines).

- **CSS transition**: `transition: width 0.25s` and a wider `width` on `:hover` and `:focus-visible`. The browser animates the change and reverses it when you leave.
- **JavaScript tween**: on `mouseenter`, `mouseleave`, `focus` and `blur`, `tween()` reads the current width and animates it to 260 or 180 pixels over 250 ms. Each `requestAnimationFrame` callback works out how far along it is, `t`, from the time that has passed, and eases it with `1 - (1 - t) ** 3`: fast at first, slow at the end. A new tween cancels the old one and starts from the current width, so changing direction half-way stays smooth. With reduced motion, it jumps straight to the end.
- **Step bar**: three `<li>` items in a flex row. The current one gets `aria-current="step"`, which tells assistive technology which step you are on, and the CSS styles that attribute. **Back** is disabled on the first step and **Next** on the last.
- **Progress ring**: the slider writes its value to `--value`, a custom property (CSS variable) on the ring. The ring's background is `conic-gradient(#087b77 calc(var(--value) * 1%), #ddd 0)`: coloured up to that percentage of the circle and grey after it. A white circle on top turns the disc into a ring. The element has `role="progressbar"`, and `aria-valuenow` is updated with the value.

## Then and now

The original menu widened on a `setInterval` timer, a few pixels per tick, with the same timer code copied for growing and shrinking. The originals also used old vendor-prefixed CSS and a loading ring copied from another project.

Today a CSS transition handles a simple change like this on its own. A script tween is still worth writing when you need the elapsed time or want to stop and reverse a motion yourself. [`conic-gradient()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/gradient/conic-gradient) draws the ring without images or SVG.

## Limits

- The step bar and the ring are only visual: no real task or download is behind them.
- Each menu has a single link, with no submenu.

## Checks and credits

- `npm run test:browser` turns on reduced motion, then, in Chromium, Firefox and WebKit, focuses each menu link and checks that it becomes 260 pixels wide, clicks **Next** and checks that **Run** is the current step, and sets the slider to 70 and checks that the ring reports `aria-valuenow="70"`. With reduced motion on, the animations themselves are not tested. `npx playwright test tests/browser/visuals.spec.js` runs the visual tests on their own.
- Sources: the [original menu sample](https://github.com/L-Jovi/latte-web/tree/1be029e8f4fdc38a0c62ec2a9569187c1659875f/vision-samples/navigation), plus the step bar and loading ring samples listed in the [migration ledger](../../../docs/migration.md). The original ring was copied from [frontend9/css-count-down-demo](https://github.com/frontend9/css-count-down-demo); the ring here is new.
- Original code is MIT; see [NOTICE.md](../../../NOTICE.md).
