# Gulp: running tasks in order

English | [简体中文](README.zh-Hans.md)

Clean, compile TypeScript and copy HTML as a small Gulp pipeline. Gulp runs each step as a plain JavaScript function, one after another, and stops at the first one that fails.

## Try it

```sh
npm ci
npm run build -w @latte/gulp-typescript
npm run dev
# open http://127.0.0.1:4173/tooling/gulp-typescript/dist/
```

Gulp reports `Starting` and `Finished` for `clean`, `compile` and `html`, in that order. The page heading changes from `Loading greeting` to **Hello from TypeScript modules via Gulp**. `dist/` holds `index.html` and one `.js` file for each `.ts` file: `main.js` and `greet.js`. You can also open the [live demo](https://latte.jovipro.com/tooling/gulp-typescript/dist/index.html).

## How it works

[gulpfile.js](gulpfile.js) (16 lines) exports three small functions, and a default task that runs them with `series`:

- `clean` deletes `dist/` with Node's own `rm`.
- `compile` starts the TypeScript compiler, `tsc`, as a separate process. `tsc` reads [tsconfig.json](tsconfig.json), checks the types and writes one JavaScript file for each TypeScript file in `src/` into `dist/`.
- `html` copies [src/index.html](src/index.html) into `dist/`.

Each function tells Gulp that it has finished through what it returns: `clean` and `html` return promises, and `compile` returns the child process. If `tsc` finds a type error, it exits with an error code, and `series` does not run `html`.

There is no bundler. `tsc` keeps the `import` in `main.js` as it is, the page loads `main.js` with `<script type="module">`, and the browser then fetches `greet.js` by itself. That is why [src/main.ts](src/main.ts) imports `./greet.js`, the name of the compiled file.

## Then and now

In the early 2010s, task runners such as [Grunt](../grunt/README.md) and Gulp copied, concatenated and minified files. The original version of this example was set up to bundle the TypeScript with Browserify, its `tsify` plugin and Babel, and kept commented-out variants with `gulp-typescript`, Watchify and uglify. This version calls the TypeScript compiler's own command, `tsc`, instead of plugins that wrap it, and lets the browser load native ES modules. It also exports its tasks instead of registering them with `gulp.task()`; Gulp's [documentation](https://gulpjs.com/docs/en/getting-started/creating-tasks/) now makes exporting the main way to define tasks.

For a new project today (2026-09), start with Vite. Gulp runs whatever steps you give it, while Vite also understands your modules and updates the page as you develop ([Why Vite](https://vite.dev/guide/why)).

## Limits

- There is no watch task: run the build again after each change.
- Nothing is bundled or minified. Each module is a separate request; the [Vite docs](https://vite.dev/guide/why) explain why that is still inefficient in production.
- The HTML is copied as it is; nothing adds hashes to file names.

## Checks and credits

- `npm run check` type-checks this folder with `tsc --noEmit`, then builds it. `npm run test:browser` opens the page in Chromium, Firefox and WebKit and fails on a script error or a file that does not load, so a missing `greet.js` would fail it; it does not check the heading text.
- The [migration ledger](../../docs/migration.md) links to the original version.
- Original code is MIT; see [NOTICE.md](../../NOTICE.md).
