# Sharing code between entries

English | [简体中文](README.zh-Hans.md)

Two entries share one copy of Lodash instead of bundling it twice. Both use Lodash, so it goes into a third file that the page loads once.

## Try it

```sh
npm ci
npm run build -w @latte/webpack
npm run dev
# open http://127.0.0.1:4173/tooling/webpack/code-splitting/dist/
```

The page shows `index+module+loaded!`, and the console prints `Another module loaded!`. `dist/` has four scripts, and `index.html` loads all of them: `index.js` and `another.js` hold only your code, a few hundred bytes each; `shared.js` holds Lodash, about 70 KB; and `runtime.js` holds webpack's small module loader. You can also open the [live demo](https://latte.jovipro.com/tooling/webpack/code-splitting/dist/index.html).

## How it works

[webpack.config.cjs](webpack.config.cjs) (12 lines) defines three entries:

```js
config.entry = {
  index: { import: './src/index.js', dependOn: 'shared' },
  another: { import: './src/another-module.js', dependOn: 'shared' },
  shared: 'lodash',
};
```

`dependOn: 'shared'` tells webpack that the `shared` entry will already be on the page, so it leaves Lodash out of the other two. `output.filename: '[name].js'` names each file after its entry.

`runtimeChunk: 'single'` moves the _runtime_, webpack's code for loading modules and keeping track of them, into its own file, `runtime.js`. With one runtime, the page has one list of loaded modules, and both entries use the same Lodash. Without it, each entry would carry its own runtime and set up its own Lodash. The [official guide](https://webpack.js.org/guides/code-splitting/) says this setting is needed when several entries share one HTML page. The order of the `<script>` tags does not matter: each entry file only registers itself, and the runtime starts it once `shared.js` is there.

[src/index.js](src/index.js) (10 lines) gets Lodash with `import()`, but because Lodash is already in `shared.js`, no extra file is made. [src/another-module.js](src/another-module.js) (3 lines) uses a normal `import`. The config also sets `splitChunks: { chunks: 'all' }`, which moves shared modules into files of their own automatically; here `dependOn` has already done that, so it adds no file.

## Then and now

Before webpack 4, shared code was pulled out with `CommonsChunkPlugin`. webpack 4 replaced it with `optimization.splitChunks` ([SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/)), and webpack 5 added `dependOn` ([release notes](https://webpack.js.org/blog/2020-10-10-webpack-5-release/)). The original version of this topic already used both, but had `runtimeChunk: 'single'` commented out, and it opened webpack-bundle-analyzer, a treemap of what is inside each file, after every build. This version turns the setting on and leaves the analyzer out.

## Limits

- More files are not automatically faster: each one is another request. The official guide recommends, where possible, one entry that imports several modules instead of several entries on one page.
- This shares code that the page needs as soon as it loads. Code that can wait until it is used is split with `import()`: see [Lazy loading with import()](../lazy-loading/README.md).

## Checks and credits

- `npm run check` runs this build. `npm run test:browser` opens the page in Chromium, Firefox and WebKit and fails on a script error or a file that does not load; it does not compare file sizes or look for a second copy of Lodash.
- Based on the official webpack guide [Code Splitting](https://webpack.js.org/guides/code-splitting/). The [migration ledger](../../../docs/migration.md) links to the original version.
- Original code is MIT; see [NOTICE.md](../../../NOTICE.md).
