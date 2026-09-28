# Declarative file tasks with Grunt

English | [简体中文](README.zh-Hans.md)

The default clean → copy sequence copies HTML and JavaScript into dist. Copying a file does not minify it, so output keeps honest filenames. Grunt exposes file expansion and task configuration; Vite builds a module graph and serves transformed modules. This is a small historical workflow kept runnable, not a recommendation to use Grunt for new application bundling.

## Run and observe

From the repository root, run `npm ci`, then `npm run build -w @latte/grunt`. Run `npm run dev` and open `http://127.0.0.1:4173/tooling/grunt/dist/index.html`.

## Read and compare

Start at [Gruntfile.cjs](Gruntfile.cjs). Build tools organize files; they do not make application logic correct. This is a bounded teaching example, not a production starter.

## Verify

`npm run check` checks types, builds workspace outputs, tests mechanisms and loads library artifacts. `npm run test:browser` opens built pages in Chromium, Firefox and WebKit. Install browser engines once with `npx playwright install chromium firefox webkit`.

## Sources and license

ISC; see LICENSE. [Migration and original revision](../../docs/migration.md); [attribution](../../NOTICE.md). Generated build outputs are ignored and regenerated locally.
