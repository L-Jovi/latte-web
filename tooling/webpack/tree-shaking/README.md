# Tree shaking: dropping unused exports

English | [简体中文](README.zh-Hans.md)

Import one function and watch the unused one disappear from the production bundle. _Tree shaking_ means removing code that nothing uses; for modules, that means every export that nothing imports.

## Try it

```sh
npm ci
npm run build -w @latte/webpack
npm run dev
# open http://127.0.0.1:4173/tooling/webpack/tree-shaking/dist/
```

The page shows `Hello webpack!,5 cubed is equal to 125`. Now open `dist/bundle.js`: the whole file is one line of 169 bytes, and there is no `square` in it. Even `cube` is gone, because the minifier replaced `cube(5)` with its result, `125`. You can also open the [live demo](https://latte.jovipro.com/tooling/webpack/tree-shaking/dist/index.html).

## How it works

[src/math.js](src/math.js) (7 lines) exports two functions, `square` and `cube`. [src/index.js](src/index.js) (9 lines) imports only one of them:

```js
import { cube } from './math.js';
```

This is a _static_ import: it sits at the top of the file and names exactly what it takes, so webpack knows which exports are used without running any code. [webpack.config.cjs](webpack.config.cjs) (3 lines) sets `optimization.usedExports: true`, which marks `square` as unused, and in production mode the minifier then deletes it. Production mode also turns `usedExports` on by default ([optimization options](https://webpack.js.org/configuration/optimization/#optimizationusedexports)).

The [official guide](https://webpack.js.org/guides/tree-shaking/) shows the two steps apart: it first builds in development mode, where `square` is still in the bundle, marked with the comment `/* unused harmony export square */`.

## Then and now

The name and the idea were popularized by the bundler Rollup. webpack 2 added detection of unused exports in ES modules, and webpack 4 added the `sideEffects` field in `package.json`, which marks files that are safe to drop entirely when nothing uses them ([official guide](https://webpack.js.org/guides/tree-shaking/)). The original version of this topic had `usedExports` commented out and relied on production mode alone.

## Limits

- There is no `sideEffects` field in `package.json`. It lets webpack drop whole files, but a file wrongly marked as free of side effects, such as a stylesheet imported only for its styles or a file that sets up a global, would be dropped together with the work it does.
- It works only with ES module syntax (`import` and `export`). The `lodash` package is CommonJS, which is why [Shimming old global-style code](../shimming/README.md) still ships all of it.

## Checks and credits

- `npm run check` runs this build. `npm run test:browser` opens the page in Chromium, Firefox and WebKit and fails on a script error or a file that does not load. Nothing reads the bundle, so no test checks that `square` is gone.
- Based on the official webpack guide [Tree Shaking](https://webpack.js.org/guides/tree-shaking/). The [migration ledger](../../../docs/migration.md) links to the original version.
- Original code is MIT; see [NOTICE.md](../../../NOTICE.md).
