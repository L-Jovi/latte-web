# Gesture paging

English | [简体中文](README.zh-Hans.md)

Run root `npm ci` and `npm run dev`, then open http://127.0.0.1:4173/examples/visuals/paging/. No build step or extra server is needed. Start reading `app.js`.

Extract the Huamao vertical page mechanism and the handwritten horizontal slider into bounded three-page tracks. The horizontal version retains Touch Events and distance/time thresholds; the vertical version uses Pointer Events/capture. Both clamp indices, recalculate on resize, support arrows/buttons and cancel incomplete gestures. Swipe or choose Next: the output becomes Page 2 of 3. The third page disables Next. CSS Scroll Snap in the neighbouring carousel lets the browser own natural scrolling; these manual tracks expose gesture decisions. No full-page navigation, orientation lock or marketing-site assets remain.

Verify with `npx playwright test tests/browser/visuals.spec.js`; pixel filters and carousel slots also have Node regression tests. Touch event sequences are synthetic; pointer/mouse and keyboard actions use real browser input. Physical mobile gestures remain a manual check. Source: [original huamao](https://github.com/L-Jovi/latte-web/tree/1be029e8f4fdc38a0c62ec2a9569187c1659875f/vision-samples/huamao). License: [local GPL-2.0 notice](LICENSE). Self-authored replacement graphics contain no bundled fonts or borrowed photos.
