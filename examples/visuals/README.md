# Visual experiments

English | [简体中文](README.zh-Hans.md)

Canvas, CSS and pointer experiments that run straight in the browser. None of them needs a build step.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/examples/visuals/clock/
```

Every experiment is a plain HTML page, so this works right after cloning; no `npm ci` is needed either. Replace `clock` with any folder name from the table below. All of them are also on the [live site](https://latte.jovipro.com/).

## How it works

Each folder has its own README that says what to try and which file to read first.

| Folder         | Experiment                                                      | What you'll see                                                                                                 |
| -------------- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `clock`        | [Dot-matrix countdown on canvas](clock/README.md)               | Digits drawn from a grid of dots; when a digit changes, its dots fall away as particles.                        |
| `canvas-image` | [Image effects with canvas pixels](canvas-image/README.md)      | Scale, watermark, magnify and filter an image by reading and writing its pixels.                                |
| `drag`         | [Dragging with mouse events and Pointer Events](drag/README.md) | The same drag written twice; Pointer Events also cover touch and pen.                                           |
| `paging`       | [Swipe to change pages](paging/README.md)                       | Turn a swipe into a page change using distance and speed thresholds, with touch events and with Pointer Events. |
| `carousel`     | [3D carousel and CSS Scroll Snap](carousel/README.md)           | Place layered slides with geometry, then let CSS Scroll Snap do similar work natively.                          |
| `photo-wall`   | [Photo wall with CSS transforms](photo-wall/README.md)          | Scattered, tilted cards that straighten and zoom in on hover.                                                   |
| `search`       | [Search suggestions with the keyboard](search/README.md)        | Filter suggestions as you type and choose one with the arrow keys, using accessible combobox markup.            |
| `motion`       | [Menu, step bar and progress ring](motion/README.md)            | An expanding menu (JavaScript tween vs CSS transition), a step bar and a `conic-gradient` progress ring.        |
| `lottery`      | [Prize wheel](lottery/README.md)                                | Spin a wheel that always stops on the sector it reports, using the Web Animations API.                          |

Besides the site-wide stylesheet, the pages share [style.css](style.css). When your system's "reduce motion" setting is on, it shortens every CSS animation and transition to almost nothing.

[Measuring page speed today](../performance/README.md) sits next to this folder but has its own Vite build.

## Then and now

These pages began as the repository's `vision-samples` folder. The originals leaned on jQuery and similar libraries, used borrowed photos and fonts, and in one case called a web service that has since expired. The new versions keep the drawing, gesture and animation code and use browser features for the rest.

Three changes run through them:

- Mouse and touch events gave way to [Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events): one set of events for mouse, touch and pen, plus pointer capture, which keeps a drag attached to the element where it started ([drag](drag/README.md), [paging](paging/README.md)).
- Hand-built sliding tracks gave way to [CSS Scroll Snap](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap), where the browser does the scrolling ([carousel](carousel/README.md)).
- A fixed step on every timer tick gave way to motion computed from the time that has passed ([clock](clock/README.md), [motion](motion/README.md)).

Where the older way still teaches something, it stays next to the new one: the mouse version of the drag, the touch version of the paging, and the hand-built layered carousel.

## Limits

- Nothing here talks to a server. The search suggestions come from a local JSON file, and the prize wheel picks its result in the browser.
- The graphics are self-made SVG, CSS and canvas drawings. There are no borrowed photos and no bundled fonts.
- The tests simulate touch with script events, so gestures on a real phone or tablet are not checked automatically.

## Checks and credits

- `npm run test:browser` opens every page in Chromium, Firefox and WebKit and tries its main interaction. Mouse and keyboard steps use real browser input; the one touch swipe is simulated. `npm test` checks the image filters and the carousel positions in Node. Each README says exactly what its test covers.
- The browser tests need the same setup as CI: `npm ci`, the Playwright browsers (`npx playwright install`) and `npm run build`. After that, `npx playwright test tests/browser/visuals.spec.js` runs only the tests for these pages and for the page-speed example.
- The [migration ledger](../../docs/migration.md) links to the original samples under `vision-samples`. The old canvas and course samples credit imooc, and the image exercises reference liuyubobobo.com.
- Six folders keep the GPL-2.0 license that came with their original sample: `clock`, `canvas-image`, `paging`, `carousel`, `photo-wall` and `search`. The rest is original code under MIT. See [NOTICE.md](../../NOTICE.md).
