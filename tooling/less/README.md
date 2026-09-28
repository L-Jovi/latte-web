# Less compilation and native CSS variables

English | [简体中文](README.zh-Hans.md)

Read mixins, guards, @arguments and escaped values in the preserved .less files. Build emits matching CSS under dist. Legacy vendor prefixes and IE-specific strings are historical syntax examples, not current browser requirements. Open modern.html to change a custom property at runtime: Less variables disappear at compile time, CSS variables participate in the cascade after loading.

## Run and observe

From the repository root, run `npm ci`, then `npm run build -w @latte/less`. Run `npm run dev` and open `http://127.0.0.1:4173/tooling/less/modern.html`.

## Read and compare

Start at [build.mjs](build.mjs), [mix/mix.less](mix/mix.less), [arguments/args.less](arguments/args.less), [modern.html](modern.html). Build tools organize files; they do not make application logic correct. This is a bounded teaching example, not a production starter.

## Verify

`npm run check` checks types, builds workspace outputs, tests mechanisms and loads library artifacts. `npm run test:browser` opens built pages in Chromium, Firefox and WebKit. Install browser engines once with `npx playwright install chromium firefox webkit`.

## Sources and license

GPL-2.0-only; retained LICENSE applies to this directory. [Migration and original revision](../../docs/migration.md); [attribution](../../NOTICE.md). Generated build outputs are ignored and regenerated locally.
