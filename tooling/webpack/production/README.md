# Development vs production builds

English | [简体中文](README.zh-Hans.md)

One project, two configs: readable output for debugging, optimized output for users. Here the production build is the main config, and a second, 6-line file turns it into a development build.

## Try it

```sh
npm ci
npm run build -w @latte/webpack
npm run dev
# open http://127.0.0.1:4173/tooling/webpack/production/dist/
```

The page shows `Hello webpack!,5 cubed is equal to 125`, and the console prints `Looks like we are in production mode!`. `dist/bundle.js` is only 257 bytes: one line of code, in which webpack has already worked out `cube(5)` as `125` and dropped both the development message and the unused `square` function, followed by `//# sourceMappingURL=bundle.js.map`, which points to the source map next to it. You can also open the [live demo](https://l-jovi.github.io/latte-web/tooling/webpack/production/dist/index.html).

## How it works

[webpack.config.cjs](webpack.config.cjs) (3 lines) keeps the production mode of the [shared base configuration](../base.cjs) and adds `devtool: 'source-map'`, which writes the source map to a file of its own, `bundle.js.map`. Production mode minifies the code and sets `process.env.NODE_ENV` to `'production'`. [src/index.js](src/index.js) (15 lines) checks that value, so one branch of its `if` can never run, and the minifier removes it. (The comma on the page comes from assigning an array to `innerHTML`, which joins the items with commas.)

[webpack.dev.cjs](webpack.dev.cjs) (6 lines) loads that config, copies it with object spread (`...config`) and changes two settings: `mode: 'development'` and `devtool: 'inline-source-map'`. The build script builds only the production config. To try the development one, run `npm exec -w @latte/webpack -- webpack serve --config production/webpack.dev.cjs` and open http://127.0.0.1:4180/: the console now says `Looks like we are in development mode!`.

[src/math.js](src/math.js) exports `square` and `cube`, and only `cube` is imported. [Tree shaking: dropping unused exports](../tree-shaking/README.md) looks at that step on its own.

## Then and now

The original version followed the [official guide](https://webpack.js.org/guides/production/): three files, `webpack.common.js`, `webpack.dev.js` and `webpack.prod.js`, combined with the `webpack-merge` package. Here the production settings are the main config, and the development file changes two of them with plain object spread, so no extra package is needed. Since webpack 4, `mode` sets `process.env.NODE_ENV` for you and turns on minifying in production.

## Limits

- `bundle.js.map` is published next to the page, so anyone can read the original source through it. The [devtool documentation](https://webpack.js.org/configuration/devtool/) advises keeping source maps away from normal users on a real server, or using `hidden-source-map`, which leaves out the comment that points to the map, so the map serves only for error reports.
- Object spread copies only the top level. That is enough to replace `mode` and `devtool`, but changing something nested, such as one rule inside `module.rules`, would take more copying. [webpack-merge](https://github.com/survivejs/webpack-merge) does that for you: it concatenates arrays and merges objects.

## Checks and credits

- `npm run check` runs the production build. `npm run test:browser` opens the built page in Chromium, Firefox and WebKit and fails on a script error or a file that does not load; it does not check the text, and no test runs the development config.
- Based on the official webpack guide [Production](https://webpack.js.org/guides/production/). The [migration ledger](../../../docs/migration.md) links to the original version.
- Original code is MIT; see [NOTICE.md](../../../NOTICE.md).
