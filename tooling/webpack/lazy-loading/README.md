# Lazy loading with import()

English | [简体中文](README.zh-Hans.md)

A module is downloaded only when you click the button. The first page load carries less code; in exchange, the first click waits for one more request.

## Try it

```sh
npm ci
npm run build -w @latte/webpack
npm run dev
# open http://127.0.0.1:4173/tooling/webpack/lazy-loading/dist/
```

Open the Network tab of the browser's developer tools, then load the page. It shows **Hello webpack** and a button, and the only script is `bundle.js`. Click the button: a file with a name such as `print.75b9ede9392a312ac178.js` arrives, and the console prints `The print.js module has loaded! See the network tab in dev tools...`, then `Button Clicked: Here's "some text"!`. Click again, and only the second line appears: the module has already loaded, so it does not run a second time. You can also open the [live demo](https://l-jovi.github.io/latte-web/tooling/webpack/lazy-loading/dist/index.html).

## How it works

[src/index.js](src/index.js) (24 lines) does not import `print.js` at the top. The click handler calls `import()` instead:

```js
button.onclick = (e) =>
  import(/* webpackChunkName: "print" */ './print.js').then((module) => {
    const print = module.default;
    print();
  });
```

`import()` is the function form of `import`: it loads a module when that line runs and returns a promise for it. The module's default export is its `default` property. When webpack sees `import()`, it puts [src/print.js](src/print.js) into a separate file, a _chunk_, which the browser downloads only when the call runs. Lodash, imported the usual way, stays in `bundle.js`.

The comment `webpackChunkName: "print"` names the chunk; without it, the file would be named by a number. [webpack.config.cjs](webpack.config.cjs) (3 lines) sets `output.chunkFilename` to `[name].[contenthash].js`, which adds the hash.

## Then and now

webpack's older way to split code was its own `require.ensure()`. The [module methods page](https://webpack.js.org/api/module-methods/) now calls it specific to webpack and superseded by `import()`, which became part of JavaScript in ES2020 ([finished TC39 proposals](https://github.com/tc39/proposals/blob/main/finished-proposals.md)).

## Limits

- There is no loading indicator and no error handling: if the chunk fails to download, the click shows nothing. The comment in `src/index.js` notes that a real site would need to show that something is loading.
- Only one module waits for the click; Lodash still loads with the page.

## Checks and credits

- `npm run test:browser` opens the page in Chromium, Firefox and WebKit, checks that no `module has loaded` message appears before the click, then clicks the button and waits for `Button Clicked`. It does not look at network requests. Another test opens the page and fails on a script error or a file that does not load.
- `npm run check` runs this build.
- Based on the official webpack guide [Lazy Loading](https://webpack.js.org/guides/lazy-loading/). The [migration ledger](../../../docs/migration.md) links to the original version.
- Original code is MIT; see [NOTICE.md](../../../NOTICE.md).
