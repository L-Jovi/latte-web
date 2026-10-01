# Source maps for debugging

English | [简体中文](README.zh-Hans.md)

Build in development mode and read your original source in DevTools. A _source map_ links each line of the bundle back to the line of your own code that produced it.

## Try it

```sh
npm ci
npm run build -w @latte/webpack
npm run dev
# open http://127.0.0.1:4173/tooling/webpack/development/dist/
```

The page shows **Hello webpack** and a button. Click it: the console prints `I get called from print.js.` and an alert says `trigger from button :)`. Now open the browser's developer tools. The page loaded only `bundle.js`, yet the Sources panel (Debugger in Firefox) has a `webpack://` section with `src/index.js` and `src/print.js`, exactly as you wrote them. You can also open the [live demo](https://l-jovi.github.io/latte-web/tooling/webpack/development/dist/index.html).

## How it works

[webpack.config.cjs](webpack.config.cjs) (4 lines) changes two settings of the [shared base configuration](../base.cjs):

- `mode: 'development'` turns off minifying, so `dist/bundle.js` stays readable, with a comment before each module that names its file.
- `devtool: 'inline-source-map'` puts the source map inside `bundle.js` itself, as a `data:` URL in a comment on the last line. The developer tools read that comment and show your files instead of the bundle.

[src/index.js](src/index.js) (28 lines) builds the page, and the button runs `printMe` from [src/print.js](src/print.js) (4 lines).

To watch the map point at a mistake, change `console.log` to `cosnole.log` in `src/print.js`, build again, reload the page and click. The error names `print.js:2`, the line you need to fix, not a line somewhere inside `bundle.js`.

To rebuild on every save instead, start webpack's dev server for this topic with `npm exec -w @latte/webpack -- webpack serve --config development/webpack.config.cjs` and open http://127.0.0.1:4180/.

## Then and now

The original version showed all three ways that the [official guide](https://webpack.js.org/guides/development/) lists for rebuilding when a file changes: `webpack --watch`, which rebuilds but leaves you to refresh the browser; webpack-dev-server, which also reloads the page; and a small Express server using webpack-dev-middleware. webpack-dev-server uses webpack-dev-middleware internally, so this version keeps only the dev server.

Source maps began with Closure Inspector, a tool for debugging optimized JavaScript. In 2023–2024 the format was turned into an Ecma standard, [ECMA-426](https://tc39.es/ecma426/).

## Limits

- An inline map makes the bundle large. `dist/bundle.js` is almost 1.5 MB, more than half of it the map, while the minified bundle of [Your first webpack build](../getting-started/README.md) is about 71 KB. The official guide uses `inline-source-map` for illustration only, not for production; [Development vs production builds](../production/README.md) writes the map to a separate file instead.
- Only one `devtool` value is shown. webpack has [many more](https://webpack.js.org/configuration/devtool/), each trading build speed against detail.

## Checks and credits

- `npm run check` runs this build. `npm run test:browser` opens the built page in Chromium, Firefox and WebKit and fails if it throws an error or a file does not load; it does not click the button or look at the source map.
- Based on the official webpack guide [Development](https://webpack.js.org/guides/development/). The [migration ledger](../../../docs/migration.md) links to the original version.
- Original code is MIT; see [NOTICE.md](../../../NOTICE.md).
