# Rotating selector

English | [简体中文](README.zh-Hans.md)

Run root `npm ci` and `npm run dev`, then open http://127.0.0.1:4173/examples/visuals/lottery/. No build step or extra server is needed. Start reading `app.js`.

Retain the relationship between full turns, remainder angles and a selected sector. A Web Animations promise unlocks the button only when the spin finishes; reduced-motion mode finishes immediately. Click Spin: the pointer and Selected: A/B/C/D refer to the same sector. Four CSS sectors replace borrowed images and jQueryRotate. Selection is local Math.random with fictional labels, not secure randomness, real prizes or a server-authoritative reward system.

Verify with `npx playwright test tests/browser/visuals.spec.js`; pixel filters and carousel slots also have Node regression tests. Touch event sequences are synthetic; pointer/mouse and keyboard actions use real browser input. Physical mobile gestures remain a manual check. Source: [original lottery](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/vision-samples/lottery). License: [root MIT license](../../../LICENSE). Self-authored replacement graphics contain no bundled fonts or borrowed photos.
