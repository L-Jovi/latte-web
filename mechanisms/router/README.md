# A History API router

English | [简体中文](README.zh-Hans.md)

The class router publishes the current path through Context. pushState changes the URL without emitting popstate, so Link also requests a view update. Browser back/forward emits popstate. One stable function is used for listener registration and removal at unmount. Modified clicks, download links and other origins retain native link behavior. This router only matches exact paths; no nested routes, loaders, parameters or navigation blocking. The root server supplies an explicit /about fallback so reloading this demo works. Compare with react-router-dom in the two Todo apps.

## Run and observe

From the repository root: `npm ci`, `npm run build -w @latte/router`, then `npm run dev`. Open `http://127.0.0.1:4173/mechanisms/router/dist/index.html`.

## Where to start

[src/router.jsx](src/router.jsx), [src/index.jsx](src/index.jsx).

## Verification

`npm run test:apps` runs current component and renderer tests. `npm run test:browser` exercises the visible behavior in Chromium, Firefox and WebKit after building. Historical files are not executed. The scope and deliberate limitations are described above.

## Sources and license

Original implementation and these explanations are MIT unless a local license states otherwise. See the [migration ledger](../../docs/migration.md) for the exact original revision and [NOTICE](../../NOTICE.md) for third-party attribution.
