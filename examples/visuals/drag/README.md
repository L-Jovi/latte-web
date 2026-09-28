# Mouse and Pointer Events

English | [简体中文](README.zh-Hans.md)

Run root `npm ci` and `npm run dev`, then open http://127.0.0.1:4173/examples/visuals/drag/. No build step or extra server is needed. Start reading `app.js`.

Two blocks share the same offset and boundary calculation. The classic block keeps document mousemove/mouseup listeners; the second uses pointer capture so movement remains attached to the pressed element. Drag either block; arrow keys move the Pointer block by 10 pixels. Cancel and lost capture release state. Pointer Events unify mouse, touch and pen, while the old mouse route remains a useful explanation of coordinate offsets. No inertia, drag-and-drop payload or sorting is implemented.

Verify with `npx playwright test tests/browser/visuals.spec.js`; pixel filters and carousel slots also have Node regression tests. Touch event sequences are synthetic; pointer/mouse and keyboard actions use real browser input. Physical mobile gestures remain a manual check. Source: [original drag](https://github.com/L-Jovi/latte-web/tree/1be029e8f4fdc38a0c62ec2a9569187c1659875f/vision-samples/drag). License: [root MIT license](../../../LICENSE). Self-authored replacement graphics contain no bundled fonts or borrowed photos.
