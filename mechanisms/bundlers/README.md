# Build your own bundler, two ways

English | [简体中文](README.zh-Hans.md)

Parse imports, build a dependency graph and emit one file: first as plain functions, then as a small compiler. Both versions turn a few small modules into one script that a browser can run.

## Try it

```sh
npm ci
npm run build -w @latte/bundlers
npm run dev
# open http://127.0.0.1:4173/mechanisms/bundlers/dist/
```

The page shows **welcome Jovi**, written into the page by the layered bundle. The browser console shows `my lord saber`, logged by the procedural bundle. Open `dist/procedural.js` in your editor: the loader is at the top, and the dependency graph is at the bottom, with each module's code stored under its file path. You can also open the [live demo](https://l-jovi.github.io/latte-web/mechanisms/bundlers/dist/index.html).

## How it works

Every bundler does three things, and both versions here do them the same way:

1. **Parse.** Read a file, let Babel turn it into a syntax tree (a data structure that describes the code), and collect its `import` statements. Babel then rewrites `import` and `export` into `require` calls and an `exports` object, so the module can run inside an ordinary function.
2. **Build the dependency graph**, the map of which file imports which. Start at the entry file and follow every import. A file that is already in the graph is skipped, so a file that is imported twice, or that is part of an import cycle, is read only once.
3. **Emit** one file: the graph as data, plus a small loader. The loader runs a module the first time it is required and keeps its `exports` in a cache. The module goes into the cache _before_ its code runs, so in a cycle the second `require` gets the unfinished `exports` instead of starting the module again.

Start with [procedural/build.js](procedural/build.js) (56 lines). It writes the three steps as functions: `analyze` parses one file, `createGraph` follows the imports, `bundle` emits the code and `build` writes it to disk.

The layered version splits the same work in two. [layered/lib/parser.js](layered/lib/parser.js) (22 lines) only parses. [layered/lib/compiler.js](layered/lib/compiler.js) (42 lines) is a `Compiler` class that takes an `entry` and an `output`, as a webpack configuration does, then builds the graph and emits the bundle. [build.mjs](build.mjs) runs both versions and writes `dist/`.

## Then and now

Before bundlers, a page loaded many `<script>` tags in a careful order. Browserify and then webpack read `require` and `import` statements and built a dependency graph, as this example does. ES modules have been part of JavaScript since ES2015, and browsers now load them natively. [Vite](https://vite.dev/guide/why) serves your source files as native modules during development and still bundles for production, because many nested imports cost extra network round trips. Vite 8, [released on 2026-03-12](https://vite.dev/blog/announcing-vite8), uses a single Rust-based bundler, Rolldown.

For a new small project today (2026-09), start with Vite. webpack 5 is still widely used, and the [webpack tour](../../tooling/webpack/README.md) shows its loaders, chunks and plugins. [How the ecosystem changed](../../docs/ecosystem.md) tells the longer story.

## Limits

- Only relative `import` statements that spell out the file name, such as `./word.js`, are followed. Nothing tries file extensions, so `./word` is not found. A package name such as `lodash` stops the build with an error.
- Re-exports (`export … from`), dynamic `import()` and source maps are not supported.
- Babel 7 only rewrites the module syntax, and the loader then follows CommonJS rules. Some rules of real ES modules, such as _live bindings_ (an imported name always showing the exporting module's current value), are not fully kept.
- Each module runs through `new Function`, with all the permissions of the page. There is no sandbox, so bundle only code you trust.
- A bundler only arranges files; it does not make the code in them correct. This is a small example to read, not a starting point for a real project. webpack and Vite solve the full problem.

## Checks and credits

- `npm run test:tooling` bundles four small files with both versions. The entry imports two files that both import a shared file, and the shared file imports the entry again, which makes a cycle. The test checks that the bundle computes the right answer, that the shared file runs exactly once, and that `import 'node:fs'` is rejected because it is not relative.
- `npm run test:browser` opens the built page in Chromium, Firefox and WebKit and fails if it throws an error or a file does not load; it does not check the text. Install the browser engines once with `npx playwright install chromium firefox webkit`. `npm run check` runs this build and the tooling test, among others; [What the checks cover](../../docs/verification.md) lists everything it runs.
- The first version of the procedural bundler had neither the cache nor the check for files already in the graph, so a shared module ran once per import and an import cycle never finished. The [migration ledger](../../docs/migration.md) links to the original versions of both bundlers, the `webpack-scratch` and `webpack-forge` folders.
- `procedural/build.js` follows [this article on Zhihu](https://zhuanlan.zhihu.com/p/76969308).
- `dist/` is not committed; the build command creates it. Original code is MIT; see [NOTICE.md](../../NOTICE.md).
