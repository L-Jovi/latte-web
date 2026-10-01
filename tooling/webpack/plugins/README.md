# Writing a webpack plugin

English | [简体中文](README.zh-Hans.md)

A plugin that hooks into the build and writes a list of every output file. A _plugin_ joins the build at fixed moments and can act on all of it; a _loader_, by contrast, transforms one file at a time.

## Try it

```sh
npm ci
npm run build -w @latte/webpack
npm run dev
# open http://127.0.0.1:4173/tooling/webpack/plugins/dist/
```

The page shows **Hello Webpack**. Next to it in `dist/`, the plugin has written `FILELIST.md`, which you can also open at http://127.0.0.1:4173/tooling/webpack/plugins/dist/FILELIST.md:

```markdown
# Emitted files

- bundle.js
- bundle.js.LICENSE.txt
- index.html
```

You can also open the [live demo](https://latte.jovipro.com/tooling/webpack/plugins/dist/index.html) of the page.

## How it works

[plugins/file-list-plugin.cjs](plugins/file-list-plugin.cjs) (25 lines) is a class with an `apply(compiler)` method. webpack calls `apply` once, and the plugin uses it to _tap_ hooks, that is, to hand webpack functions to call at certain moments:

1. `compiler.hooks.thisCompilation` fires when webpack starts a compilation, the object that holds this build's modules and output files.
2. On that compilation, `processAssets` fires while webpack prepares the output files, stage by stage. The plugin asks for the last stage, `PROCESS_ASSETS_STAGE_REPORT`, which is meant for reports. By then every other file exists, including `bundle.js.LICENSE.txt`, which the minifier moves out of `bundle.js`.
3. The plugin sorts the file names, writes them as a Markdown list and adds the result with `compilation.emitAsset('FILELIST.md', new sources.RawSource(...))`. `RawSource` wraps a plain string as file content.

`FILELIST.md` does not list itself, because it is added after the list is made. [webpack.config.cjs](webpack.config.cjs) (4 lines) adds the plugin to the [shared base configuration](../base.cjs). Plugins and loaders both run in Node while webpack builds; none of this code reaches the browser.

## Then and now

The original version added its file in the compiler's `emit` hook by writing to `compilation.assets` directly. webpack 5's documentation warns against adding files in `emit`: it runs after all the processing stages, so no later step ever sees the file ([compilation hooks](https://webpack.js.org/api/compilation-hooks/#processassets)). The current [official example](https://webpack.js.org/contribute/writing-a-plugin/) uses `processAssets` and `emitAsset`, as this version does, but at the earlier `PROCESS_ASSETS_STAGE_SUMMARIZE` stage.

The original repository also held an unfinished sketch of webpack's compiler hooks, built on Tapable, the library behind webpack's hooks. This working plugin takes its place.

## Limits

- The output name is fixed; the original version accepted a `filename` option.
- It taps one hook of each kind; webpack has [many more](https://webpack.js.org/api/compiler-hooks/).
- There is no loader here, the other way to extend webpack.

## Checks and credits

- `npm run test:tooling` reads `dist/FILELIST.md` and checks that it lists `bundle.js` and `index.html`; `npm run check` builds first, then runs it. `npm run test:browser` opens the page in Chromium, Firefox and WebKit and fails on a script error or a file that does not load.
- The plugin follows the official webpack page [Writing a Plugin](https://webpack.js.org/contribute/writing-a-plugin/). The original plugin's comment pointed to [this article on Zhihu](https://zhuanlan.zhihu.com/p/102917655), and the hooks sketch to [this article on aotu.io](https://aotu.io/notes/2020/07/17/webpack-analize/index.html). The [migration ledger](../../../docs/migration.md) links to both original versions.
- Original code is MIT; see [NOTICE.md](../../../NOTICE.md).
