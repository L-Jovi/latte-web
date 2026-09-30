# Shimming old global-style code

English | [简体中文](README.zh-Hans.md)

Give legacy code the global it expects, even though it never imports it. A _shim_ adapts old code to a setup it was not written for.

## Try it

```sh
npm ci
npm run build -w @latte/webpack
npm run dev
# open http://127.0.0.1:4173/tooling/webpack/shimming/dist/
```

The page shows **Hello webpack**. The code that writes it, [src/index.js](src/index.js), calls `join(...)` without importing or defining it; without the plugin below, that line would fail with `join is not defined`. You can also open the [live demo](https://l-jovi.github.io/latte-web/tooling/webpack/shimming/dist/index.html).

## How it works

[webpack.config.cjs](webpack.config.cjs) (4 lines) adds webpack's `ProvidePlugin`:

```js
config.plugins.push(new webpack.ProvidePlugin({ join: ['lodash', 'join'] }));
```

Whenever a module uses `join` without declaring it, webpack imports Lodash's `join` export into that module for you. The old code stays as it is, and the build supplies what it expects.

## Then and now

Before bundlers, a page loaded Lodash with its own `<script>` tag and used the global variable `_`, and code written that way still expects globals. The [official guide](https://webpack.js.org/guides/shimming/) asks you to use shims only when necessary: new code should import what it uses. The guide covers two other cases: code that expects `this` to be `window`, and files that create globals without exporting them. As of 2026-09, it handles both with a few lines of plugin code instead of `imports-loader` and `exports-loader`.

The original version also used `imports-loader` for the first case, loaded a polyfill bundle (`babel-polyfill` and `whatwg-fetch`) only in browsers without `fetch`, and requested sample data from a public test API. Every browser the tests use has `fetch`, so the polyfills and the request were removed. Babel deprecated its all-in-one polyfill package in version 7.4.0 ([Babel docs](https://babeljs.io/docs/babel-polyfill)).

## Limits

- `dist/bundle.js` is about 70 KB, because it contains all of Lodash. The official guide expects the rest of Lodash to be dropped, but the `lodash` package is a single CommonJS file, which webpack cannot trim.
- [src/globals.js](src/globals.js) is not part of the build: nothing imports it. It is the guide's example of a file that creates globals (`file` and `helpers`) without exporting them, and this version does not add the exports.

## Checks and credits

- `npm run check` runs this build. `npm run test:browser` opens the page in Chromium, Firefox and WebKit and fails on a script error or a file that does not load, so it would catch a missing `join`.
- Based on the official webpack guide [Shimming](https://webpack.js.org/guides/shimming/). The [migration ledger](../../../docs/migration.md) links to the original version.
- Original code is MIT; see [NOTICE.md](../../../NOTICE.md).
