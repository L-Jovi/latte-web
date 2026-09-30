# Content hashes for long-term caching

English | [简体中文](README.zh-Hans.md)

File names change only when their content changes, so browsers can cache them safely. A _content hash_ is a short fingerprint of a file's content, written into its name.

## Try it

```sh
npm ci
npm run build -w @latte/webpack
npm run dev
# open http://127.0.0.1:4173/tooling/webpack/caching/dist/
```

The page shows **Hello webpack**; click the text, and the console prints `Hello webpack!`. `dist/` holds three scripts with a hash in each name, such as `main.23cd93cf2c0e2c425520.js` (your code), `637.40779b51713db0a1f01b.js` (Lodash) and `runtime.613ea7698a113b2af393.js` (webpack's loader), and `index.html` points to all three. Now edit [src/print.js](src/print.js), for example change `console.log` to `console.info`, and build again: only the `main` file gets a new name, while Lodash and the runtime keep theirs. You can also open the [live demo](https://l-jovi.github.io/latte-web/tooling/webpack/caching/dist/index.html).

## How it works

[webpack.config.cjs](webpack.config.cjs) (8 lines) makes three changes:

- `output.filename: '[name].[contenthash].js'` puts the hash into each file name. Same content, same name; new content, new name. A browser can keep a file for as long as it likes, because a new version always arrives under a new name.
- `splitChunks: { chunks: 'all' }` moves Lodash, which comes from `node_modules`, into a file of its own. The [official guide](https://webpack.js.org/guides/caching/) explains why: libraries change less often than your own code, so a change to your code does not make visitors download Lodash again.
- `runtimeChunk: 'single'` moves webpack's own loader code into `runtime.<hash>.js`, so it does not sit inside the other files and change their names.

`moduleIds: 'deterministic'` gives each module a short number made from its name, not from the order in which webpack found it, so adding a module somewhere else does not renumber Lodash and change its file. Production mode already uses this setting by default. The Lodash file is named after its number, such as `637`, because the config gives it no name.

## Then and now

webpack 5 made two changes that help here ([release notes](https://webpack.js.org/blog/2020-10-10-webpack-5-release/)): `[contenthash]` became a hash of the file's real content, where before it hashed webpack's internal structure, and deterministic IDs for modules and chunks became the default in production. The original version, like the official guide, named the Lodash file `vendors` with a cache group; this version keeps webpack's number.

## Limits

- File names are only half of caching. The server must also tell browsers that they may keep these files, with a `Cache-Control` header. The local server sends `Cache-Control: no-store`, so nothing is cached here.
- `index.html` keeps its name, so it must not be cached for long: it is the file that points to the current names.

## Checks and credits

- `npm run check` runs this build. `npm run test:browser` opens the page in Chromium, Firefox and WebKit and fails on a script error or a file that does not load; it does not compare file names between builds.
- Based on the official webpack guide [Caching](https://webpack.js.org/guides/caching/). The [migration ledger](../../../docs/migration.md) links to the original version.
- Original code is MIT; see [NOTICE.md](../../../NOTICE.md).
