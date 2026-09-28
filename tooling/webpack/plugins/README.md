# Compiler lifecycle plugins

English | [简体中文](README.zh-Hans.md)

A plugin subscribes to compiler hooks; a loader transforms one module. This plugin emits FILELIST.md at processAssets/REPORT using RawSource. The old incomplete compiler-hooks draft is represented by this working lifecycle example. Neither extension API is a browser runtime API.

## Run and observe

From the repository root, run `npm ci`, then `npm run build -w @latte/webpack`. Run `npm run dev` and open `http://127.0.0.1:4173/tooling/webpack/plugins/dist/index.html`.

## Read and compare

Start at [webpack.config.cjs](webpack.config.cjs), [src/index.js](src/index.js), [plugins/file-list-plugin.cjs](plugins/file-list-plugin.cjs). Build tools organize files; they do not make application logic correct. This is a bounded teaching example, not a production starter.

## Verify

`npm run check` checks types, builds workspace outputs, tests mechanisms and loads library artifacts. `npm run test:browser` opens built pages in Chromium, Firefox and WebKit. Install browser engines once with `npx playwright install chromium firefox webkit`.

## Sources and license

MIT. [Migration and original revision](../../../docs/migration.md); [attribution](../../../NOTICE.md). Generated build outputs are ignored and regenerated locally.
