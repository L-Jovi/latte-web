# A packaged number dictionary

English | [简体中文](README.zh-Hans.md)

A deliberately small dictionary converts only zero through five. It emits a CommonJS library loaded by a separate Node consumer in the test suite. Case-insensitive lookup is explicit; unknown input returns an empty word or -1. A library contract includes output format and dependencies, not only source exports.

## Run and observe

From the repository root, run `npm ci`, then `npm run build -w @latte/webpack`. Inspect the generated `dist/` output described below.

## Read and compare

Start at [src/index.js](src/index.js), [webpack.config.cjs](webpack.config.cjs). Build tools organize files; they do not make application logic correct. This is a bounded teaching example, not a production starter.

## Verify

`npm run check` checks types, builds workspace outputs, tests mechanisms and loads library artifacts. `npm run test:browser` opens built pages in Chromium, Firefox and WebKit. Install browser engines once with `npx playwright install chromium firefox webkit`.

## Sources and license

MIT. [Migration and original revision](../../../docs/migration.md); [attribution](../../../NOTICE.md). Generated build outputs are ignored and regenerated locally.
