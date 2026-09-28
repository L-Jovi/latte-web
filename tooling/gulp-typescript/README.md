# Task sequencing and TypeScript

English | [简体中文](README.zh-Hans.md)

Gulp runs clean, compiler and HTML-copy tasks in order. Compilation calls the supported TypeScript CLI rather than abandoned Browserify/gulp-typescript adapters. Native browser ES modules load the emitted greeting. Gulp sequences arbitrary work; Vite additionally understands modules and development reloads.

## Run and observe

From the repository root, run `npm ci`, then `npm run build -w @latte/gulp-typescript`. Run `npm run dev` and open `http://127.0.0.1:4173/tooling/gulp-typescript/dist/index.html`.

## Read and compare

Start at [gulpfile.js](gulpfile.js), [src/greet.ts](src/greet.ts), [src/main.ts](src/main.ts). Build tools organize files; they do not make application logic correct. This is a bounded teaching example, not a production starter.

## Verify

`npm run check` checks types, builds workspace outputs, tests mechanisms and loads library artifacts. `npm run test:browser` opens built pages in Chromium, Firefox and WebKit. Install browser engines once with `npx playwright install chromium firefox webkit`.

## Sources and license

MIT. [Migration and original revision](../../docs/migration.md); [attribution](../../NOTICE.md). Generated build outputs are ignored and regenerated locally.
