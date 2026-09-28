# Local search suggestions

English | [简体中文](README.zh-Hans.md)

Run root `npm ci` and `npm run dev`, then open http://127.0.0.1:4173/examples/visuals/search/. No build step or extra server is needed. Start reading `topics.json → app.js`.

Preserve suggestions and selection, replacing the expired Bing/Taobao endpoints and synchronous XHR with one local Fetch. Type graph, press ArrowDown then Enter: Selected: GraphQL appears. Escape and blur close the list. Text nodes avoid interpreting suggestions as markup; combobox/listbox attributes expose active selection. The fixed vocabulary keeps the example repeatable. A large remote service would need request cancellation, loading states and debouncing; those are separate network/utility lessons, not hidden here.

Verify with `npx playwright test tests/browser/visuals.spec.js`; pixel filters and carousel slots also have Node regression tests. Touch event sequences are synthetic; pointer/mouse and keyboard actions use real browser input. Physical mobile gestures remain a manual check. Source: [original search-input](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/vision-samples/search-input). License: [local GPL-2.0 notice](LICENSE). Self-authored replacement graphics contain no bundled fonts or borrowed photos.
