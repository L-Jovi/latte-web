# Dot matrix clock

English | [简体中文](README.zh-Hans.md)

Run root `npm ci` and `npm run dev`, then open http://127.0.0.1:4173/examples/visuals/clock/. No build step or extra server is needed. Start reading `digit.js → app.js`.

The original digit matrix and particle idea remain visible. A fresh deadline replaces the expired 2018 date; requestAnimationFrame and elapsed time replace fixed frame increments. Particles expire and are capped. Start the countdown and observe 10 → 9; restart replaces the active loop. This is a bounded visual simulation, not an accurate physics engine.

Verify with `npx playwright test tests/browser/visuals.spec.js`; pixel filters and carousel slots also have Node regression tests. Touch event sequences are synthetic; pointer/mouse and keyboard actions use real browser input. Physical mobile gestures remain a manual check. Source: [original canvas-clock](https://github.com/L-Jovi/latte-web/tree/1be029e8f4fdc38a0c62ec2a9569187c1659875f/vision-samples/canvas-clock). License: [local GPL-2.0 notice](LICENSE). Self-authored replacement graphics contain no bundled fonts or borrowed photos.
