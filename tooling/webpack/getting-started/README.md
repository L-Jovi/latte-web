# Your first webpack build

English | [简体中文](README.zh-Hans.md)

One entry file becomes one bundle; follow the dependency graph in between. Here the entry imports Lodash, and webpack puts both into a single `bundle.js`.

## Try it

```sh
npm ci
npm run build -w @latte/webpack
npm run dev
# open http://127.0.0.1:4173/tooling/webpack/getting-started/dist/
```

The page says **Hello Webpack**. In `dist/` you will find `index.html`, `bundle.js` with Lodash and your code in one minified file, and `bundle.js.LICENSE.txt`, where the minifier moved Lodash's license comment. You can also open the [live demo](https://l-jovi.github.io/latte-web/tooling/webpack/getting-started/dist/index.html).

## How it works

[src/index.js](src/index.js) (9 lines) imports Lodash, builds a `<div>` with `_.join(['Hello', 'Webpack'], ' ')` and adds it to the page. [webpack.config.cjs](webpack.config.cjs) uses the [shared base configuration](../base.cjs) as it is.

webpack starts at the _entry_, `./src/index.js`: the first file it reads. Every `import` it finds adds another file to the _dependency graph_, the map of which file needs which. Here the graph is short: `src/index.js` needs `lodash`, and nothing else. webpack then writes everything in the graph into one _bundle_, `dist/bundle.js`, arranged so that each module runs after the modules it needs.

HtmlWebpackPlugin writes `dist/index.html` with a `<script>` tag for the bundle, so you never edit that file by hand.

## Then and now

Before bundlers, a page like this loaded Lodash with its own `<script>` tag and used the global variable `_`. The [official guide](https://webpack.js.org/guides/getting-started/) lists what goes wrong: it is not clear that the script needs Lodash, a missing or misordered tag breaks the page, and a tag nobody uses is still downloaded. Since version 4, webpack also runs without a configuration file, starting at `./src/index.js` and writing `dist/main.js`.

For a new small project today (2026-09), start with Vite instead; [How the ecosystem changed](../../../docs/ecosystem.md) explains why.

## Limits

- One entry and one dependency. Real projects have many; the other topics add features one at a time.
- The output is minified because the shared base uses production mode. [Source maps for debugging](../development/README.md) shows readable output.

## Checks and credits

- `npm run check` runs this build. `npm run test:browser` opens the built page in Chromium, Firefox and WebKit and fails if it throws an error or a file does not load; it does not check the text.
- Based on the official webpack guide [Getting Started](https://webpack.js.org/guides/getting-started/). The [migration ledger](../../../docs/migration.md) links to the original version.
- Original code is MIT; see [NOTICE.md](../../../NOTICE.md).
