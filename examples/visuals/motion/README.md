# Navigation, steps and circular progress

English | [简体中文](README.zh-Hans.md)

Run root `npm ci` and `npm run dev`, then open http://127.0.0.1:4173/examples/visuals/motion/. No build step or extra server is needed. Start reading `index.html → app.js`.

Compare a requestAnimationFrame easing calculation with a CSS width transition on the same navigation expansion. Hover or focus either link: width changes from 180 to 260 pixels. Next moves the step bar from Read to Run; the slider updates the conic-gradient ring and its accessible value. These replace duplicated timer code, obsolete prefixes and a copied circular ornament with three readable mechanisms. CSS owns simple transitions; a JS tween exposes elapsed time and interruption. No real workflow or network progress is implied.

Verify with `npx playwright test tests/browser/visuals.spec.js`; pixel filters and carousel slots also have Node regression tests. Touch event sequences are synthetic; pointer/mouse and keyboard actions use real browser input. Physical mobile gestures remain a manual check. Source: [original navigation](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/vision-samples/navigation). License: [root MIT license](../../../LICENSE). Self-authored replacement graphics contain no bundled fonts or borrowed photos.
