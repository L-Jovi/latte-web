# Multiple entry points

English | [简体中文](README.zh-Hans.md)

Two entries produce two named files, and the HTML plugin adds their script tags for you.

## Try it

```sh
npm ci
npm run build -w @latte/webpack
npm run dev
# open http://127.0.0.1:4173/tooling/webpack/output-management/dist/
```

The page shows **Hello webpack** and a button. Click it, and the console prints `I get called from print.js!`. Open `dist/index.html`: it has two script tags, one for `app.js` and one for `print.js`, both written by the build. You can also open the [live demo](https://l-jovi.github.io/latte-web/tooling/webpack/output-management/dist/index.html).

## How it works

[webpack.config.cjs](webpack.config.cjs) (4 lines) replaces the single entry with two named ones, `app` and `print`, and sets `output.filename` to `[name].js`. `[name]` is a placeholder that webpack fills with each entry's name, so the build writes `app.js` and `print.js`.

HtmlWebpackPlugin, added in the [shared base configuration](../base.cjs), writes `dist/index.html` on every build, with one `<script>` tag per entry. Rename an entry and the HTML follows; a hand-written HTML file would still point to the old name. `output.clean`, also set in the base, empties `dist/` before each build, so files with old names do not pile up.

## Then and now

The original version emptied `dist/` with `clean-webpack-plugin`; the base configuration now uses webpack's own `output.clean`. As of 2026-09, the [official guide](https://webpack.js.org/guides/output-management/) no longer uses HtmlWebpackPlugin at all. With [`experiments.html`](https://webpack.js.org/configuration/experiments/#experimentshtml), added in webpack 5.107.0, the HTML file itself is the entry, and webpack rewrites its `<script src>` addresses to the generated file names. This example keeps the plugin.

## Limits

- `print.js` comes out empty (0 bytes). [src/index.js](src/index.js) imports `printMe` itself, so `app.js` already contains it. In production mode webpack drops code that nothing uses, and nothing uses what the `print` entry exports. [Sharing code between entries](../code-splitting/README.md) shows how two entries share one module instead.
- The HTML comes from the shared page in [scripts/site.cjs](../../../scripts/site.cjs), the same for every topic; this topic has no page layout of its own.

## Checks and credits

- `npm run test:browser` opens the page in Chromium, Firefox and WebKit and fails on a script error or a file that does not load. It does not click the button.
- Based on the official webpack guide [Output Management](https://webpack.js.org/guides/output-management/). The [migration ledger](../../../docs/migration.md) links to the original version.
- Original code is MIT; see [NOTICE.md](../../../NOTICE.md).
