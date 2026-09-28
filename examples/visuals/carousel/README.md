# Layered carousel and Scroll Snap

English | [简体中文](README.zh-Hans.md)

Run root `npm ci` and `npm run dev`, then open http://127.0.0.1:4173/examples/visuals/carousel/. No build step or extra server is needed. Start reading `geometry.js → app.js`.

Keep the rotation lesson as slot geometry: distance from the current card controls position, scale, opacity and z-index. Calculate all slots from state instead of reading styles while mutating them. Rapid clicks therefore have no stale animation lock. Next selects Card 2 in both the layered and native Scroll Snap views. Layers wrap around; the native strip stops at its ends. The browser handles native scrolling and reduced-motion preferences; the handwritten geometry remains useful for non-linear layouts. Repeated course copies, jQuery bundles and decorative photos are retired. There is no autoplay or infinite-list virtualization.

Verify with `npx playwright test tests/browser/visuals.spec.js`; pixel filters and carousel slots also have Node regression tests. Touch event sequences are synthetic; pointer/mouse and keyboard actions use real browser input. Physical mobile gestures remain a manual check. Source: [original slider/whirligig](https://github.com/L-Jovi/latte-web/tree/1be029e8f4fdc38a0c62ec2a9569187c1659875f/vision-samples/slider/whirligig). License: [local GPL-2.0 notice](LICENSE). Self-authored replacement graphics contain no bundled fonts or borrowed photos.
