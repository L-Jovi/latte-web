# Photo wall transforms

English | [简体中文](README.zh-Hans.md)

Run root `npm ci` and `npm run dev`, then open http://127.0.0.1:4173/examples/visuals/photo-wall/. No build step or extra server is needed. Start reading `index.html`.

Retain rotation, scaling, stacking and transitions using six self-authored CSS landscapes. Focus with Tab or hover to straighten/enlarge a card. Combining rotation and scale in one transform fixes the old overwritten declaration. Grid provides responsive placement; per-card custom properties retain distinct angles. There is no photo service, upload or image processing here. Reduced-motion preferences shorten transitions.

Verify with `npx playwright test tests/browser/visuals.spec.js`; pixel filters and carousel slots also have Node regression tests. Touch event sequences are synthetic; pointer/mouse and keyboard actions use real browser input. Physical mobile gestures remain a manual check. Source: [original photo-wall](https://github.com/L-Jovi/latte-web/tree/1be029e8f4fdc38a0c62ec2a9569187c1659875f/vision-samples/photo-wall). License: [local GPL-2.0 notice](LICENSE). Self-authored replacement graphics contain no bundled fonts or borrowed photos.
