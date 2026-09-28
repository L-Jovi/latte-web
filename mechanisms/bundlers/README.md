# Two handmade bundlers

English | [简体中文](README.zh-Hans.md)

The procedural version keeps parse, graph and emit as functions. The layered version separates parsing from a Compiler object. Both follow relative static JavaScript imports, cache modules before execution and stop graph traversal at visited files. The diamond/cycle test proves a shared module executes once. Paths must include .js; package resolution, re-exports, dynamic import, source maps, full ESM live-binding semantics and sandboxing are outside this model. Generated code executes trusted input using Function. Babel 7 only rewrites module syntax; Webpack and Vite handle the broader problem.

## Run and observe

From the repository root, run `npm ci`, then `npm run build -w @latte/bundlers`. Run `npm run dev` and open `http://127.0.0.1:4173/mechanisms/bundlers/dist/index.html`.

## Read and compare

Start at [procedural/build.js](procedural/build.js), [layered/lib/compiler.js](layered/lib/compiler.js), [layered/lib/parser.js](layered/lib/parser.js). Build tools organize files; they do not make application logic correct. This is a bounded teaching example, not a production starter.

## Verify

`npm run check` checks types, builds workspace outputs, tests mechanisms and loads library artifacts. `npm run test:browser` opens built pages in Chromium, Firefox and WebKit. Install browser engines once with `npx playwright install chromium firefox webkit`.

## Sources and license

MIT. [Migration and original revision](../../docs/migration.md); [attribution](../../NOTICE.md). Generated build outputs are ignored and regenerated locally.
