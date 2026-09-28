# Template compilation and escaping

English | [简体中文](README.zh-Hans.md)

The compiler renders the string <img src=x onerror=alert(1)> as text. The same template is precompiled to dist/template.cjs and executed with the runtime-only API. Double braces escape HTML; triple braces intentionally disable escaping. Escaping text is not a general URL or JavaScript-context sanitizer, and untrusted users must not supply template source.

## Run and observe

From the repository root, run `npm ci`, then `npm run build -w @latte/handlebars`. Run `npm run dev` and open `http://127.0.0.1:4173/tooling/handlebars/dist/index.html`.

## Read and compare

Start at [index.handlebars](index.handlebars), [build.mjs](build.mjs). Build tools organize files; they do not make application logic correct. This is a bounded teaching example, not a production starter.

## Verify

`npm run check` checks types, builds workspace outputs, tests mechanisms and loads library artifacts. `npm run test:browser` opens built pages in Chromium, Firefox and WebKit. Install browser engines once with `npx playwright install chromium firefox webkit`.

## Sources and license

MIT. [Migration and original revision](../../docs/migration.md); [attribution](../../NOTICE.md). Generated build outputs are ignored and regenerated locally.
