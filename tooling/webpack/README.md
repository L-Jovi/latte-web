# Webpack learning topics

English | [简体中文](README.zh-Hans.md)

Each topic changes one part of a shared build. Run `npm run dev -w @latte/webpack` for the starter; to serve another topic, run `npm exec -w @latte/webpack -- webpack serve --config lazy-loading/webpack.config.cjs`. The server binds to localhost:4180. Configuration context makes paths independent of your shell directory. Official background: https://webpack.js.org/concepts/.

## Run and observe

From the repository root, run `npm ci`, then `npm run build -w @latte/webpack`. Inspect the generated `dist/` output described below.

## Read and compare

Start at [base.cjs](base.cjs), [build.cjs](build.cjs). Build tools organize files; they do not make application logic correct. This is a bounded teaching example, not a production starter.

## Verify

`npm run check` checks types, builds workspace outputs, tests mechanisms and loads library artifacts. `npm run test:browser` opens built pages in Chromium, Firefox and WebKit. Install browser engines once with `npx playwright install chromium firefox webkit`.

## Sources and license

MIT. [Migration and original revision](../../docs/migration.md); [attribution](../../NOTICE.md). Generated build outputs are ignored and regenerated locally.
