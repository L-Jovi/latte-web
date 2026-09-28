# Multiple entries

English | [简体中文](README.zh-Hans.md)

The app and print entries emit named files, while HtmlWebpackPlugin injects their script tags. Compare this with manually maintaining HTML script paths.

## Run and observe

From the repository root, run `npm ci`, then `npm run build -w @latte/webpack`. Run `npm run dev` and open `http://127.0.0.1:4173/tooling/webpack/output-management/dist/index.html`.

## Read and compare

Start at [webpack.config.cjs](webpack.config.cjs), [src/index.js](src/index.js). Build tools organize files; they do not make application logic correct. This is a bounded teaching example, not a production starter.

## Verify

`npm run check` checks types, builds workspace outputs, tests mechanisms and loads library artifacts. `npm run test:browser` opens built pages in Chromium, Firefox and WebKit. Install browser engines once with `npx playwright install chromium firefox webkit`.

## Sources and license

MIT. [Migration and original revision](../../../docs/migration.md); [attribution](../../../NOTICE.md). Generated build outputs are ignored and regenerated locally.
