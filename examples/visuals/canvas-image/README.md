# Canvas pixels and image operations

English | [简体中文](README.zh-Hans.md)

Run root `npm ci` and `npm run dev`, then open http://127.0.0.1:4173/examples/visuals/canvas-image/. No build step or extra server is needed. Start reading `pixels.js → app.js`.

The six image exercises share one small page: draw, scale, watermark, magnify, filter and generate colors. Grayscale, threshold, inversion, neighborhood blur and mosaic keep their readable loops. Filters preserve alpha and read an immutable input; edge blocks are clamped. A self-authored SVG replaces uncertain photographs. Try a filter, change Scale with arrow keys, and enable the keyboard/pointer magnifier. Its lens samples the original image at twice the displayed scale. CSS filters suit presentation-only effects; pixel loops expose the arithmetic and permit export or custom transforms. This is a small synchronous image lab, without color-management or large-image performance claims.

Verify with `npx playwright test tests/browser/visuals.spec.js`; pixel filters and carousel slots also have Node regression tests. Touch event sequences are synthetic; pointer/mouse and keyboard actions use real browser input. Physical mobile gestures remain a manual check. Source: [original canvas-image](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/vision-samples/canvas-image). License: [local GPL-2.0 notice](LICENSE). Self-authored replacement graphics contain no bundled fonts or borrowed photos.
