# webpack, one feature at a time

English | [简体中文](README.zh-Hans.md)

A set of small builds, each changing one thing: entries, loaders, source maps, hot reload, splitting, caching and more. Read them in order, or jump to the feature you need.

## Try it

```sh
npm ci
npm run build -w @latte/webpack
npm run dev
# open http://127.0.0.1:4173/tooling/webpack/getting-started/dist/
```

The build prints `Built getting-started`, then one line for each of the other twelve topics, and writes each topic's output to its own `dist/` folder. To open another topic, replace `getting-started` in the address with its folder name. The `library` topic has no page; its README shows how to load it from Node. Each topic's README also links a live demo.

## How it works

Each topic folder has its own `webpack.config.cjs`. All of them except `library` start from [base.cjs](base.cjs), which sets:

- `context` to the topic folder, so paths such as `./src/index.js` mean the same thing whichever directory you run the command from;
- production mode, which minifies the output;
- the entry `./src/index.js` and the output `dist/bundle.js`, with `output.clean` emptying `dist/` before each build;
- HtmlWebpackPlugin, which writes `dist/index.html` from the shared page in [scripts/site.cjs](../../scripts/site.cjs): the topic's title and summary from the learning catalog, the site's top bar, and the `<script>` tags;
- the dev server address, `127.0.0.1:4180`, with hot module replacement turned on.

[build.cjs](build.cjs) builds the topics one after another with webpack's Node API and stops at the first error.

To use webpack's dev server instead of a finished build, run `npm run dev -w @latte/webpack` for the first topic, or name another topic's config, for example `npm exec -w @latte/webpack -- webpack serve --config lazy-loading/webpack.config.cjs`. Then open http://127.0.0.1:4180/. The dev server keeps the build in memory, so it leaves `dist/` alone, and it updates the page when you save a file.

| Topic                                                                 | What it changes                                     |
| --------------------------------------------------------------------- | --------------------------------------------------- |
| [Your first webpack build](getting-started/README.md)                 | Nothing: the base configuration as it is            |
| [Loading CSS, images and data](asset-management/README.md)            | Rules for CSS, SVG and XML files                    |
| [Multiple entry points](output-management/README.md)                  | Two entries, one output file each                   |
| [Source maps for debugging](development/README.md)                    | Development mode and an inline source map           |
| [Hot module replacement](hot-module-replacement/README.md)            | Code that accepts updates while the dev server runs |
| [Lazy loading with import()](lazy-loading/README.md)                  | A module that loads on the first click              |
| [Sharing code between entries](code-splitting/README.md)              | `dependOn` and a single runtime file                |
| [Content hashes for long-term caching](caching/README.md)             | `[contenthash]` in file names                       |
| [Development vs production builds](production/README.md)              | A second config file for development                |
| [Tree shaking: dropping unused exports](tree-shaking/README.md)       | `usedExports`                                       |
| [Shimming old global-style code](shimming/README.md)                  | `ProvidePlugin`                                     |
| [Writing a webpack plugin](plugins/README.md)                         | A plugin that writes `FILELIST.md`                  |
| [Publishing a library with webpack](library/README.md)                | `output.library` and `target: 'node'`               |

## Then and now

Before bundlers, pages loaded many `<script>` tags in a careful order, and task runners such as [Grunt](../grunt/README.md) and [Gulp](../gulp-typescript/README.md) copied, concatenated and minified the files. webpack reads the `import` statements instead and builds a dependency graph from them. For a new small project today (2026-09), start with Vite. webpack 5 is still widely used, and still the clearest place to see loaders, chunks and plugins at work. [How the ecosystem changed](../../docs/ecosystem.md) tells the longer story, and [Build your own bundler, two ways](../../mechanisms/bundlers/README.md) does the same basic jobs by hand.

The original versions of these topics already used webpack 5, but relied on extra packages for jobs webpack now does itself, such as `file-loader` for images and `clean-webpack-plugin` for emptying `dist/`. They now use asset modules and `output.clean`.

## Limits

- Each topic changes one or two settings, so none of them is a complete setup for a real project.
- Only two topics build in development mode, source maps and hot module replacement; the rest keep production mode from `base.cjs`.
- The dev server runs one topic at a time, on port 4180.
- The live demos show the finished builds. Anything that needs the dev server, such as hot module replacement, works only on your machine.
- The `dist/` folders are not committed; the build creates them.

## Checks and credits

- `npm run check` runs every build, then `npm run test:tooling`, which loads the packaged library with `require` and reads the plugin's `FILELIST.md`.
- `npm run test:browser` opens every topic's page in Chromium, Firefox and WebKit and fails on a script error or a file that does not load. For lazy loading it also clicks the button. The tests open the built pages, so build first, and install the browsers once with `npx playwright install chromium firefox webkit`.
- Most topics follow the official [webpack guide](https://webpack.js.org/guides/) of the same name; [webpack concepts](https://webpack.js.org/concepts/) explains the vocabulary. The [migration ledger](../../docs/migration.md) links to the original versions.
- Original code is MIT; see [NOTICE.md](../../NOTICE.md).
