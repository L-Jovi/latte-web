# Hot module replacement

English | [简体中文](README.zh-Hans.md)

Edit a module while the dev server runs, and the page updates without a reload. _Hot module replacement_ (HMR) swaps the changed module into the running page, so the page does not start over.

## Try it

```sh
npm ci
npm exec -w @latte/webpack -- webpack serve --config hot-module-replacement/webpack.config.cjs
# open http://127.0.0.1:4180/
```

The page shows **Hello webpack** and a button on a grey background. Click the button, and the console prints `content change :)`. Now change that text in [src/print.js](src/print.js) and save. The console prints `Accepting the updated printMe module!`, and the earlier messages stay, because the page did not reload. Click again: the button prints your new text.

This needs webpack's dev server, so it works only on your machine. The [live demo](https://latte.jovipro.com/tooling/webpack/hot-module-replacement/dist/index.html), like the page you get from `npm run build -w @latte/webpack` and `npm run dev`, is a finished build: it looks the same, but nothing updates it.

## How it works

[src/index.js](src/index.js) (27 lines) builds a `<div>` with a button whose click handler is `printMe` from `src/print.js`. Then it asks to hear about new versions of `print.js`:

```js
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept('./print.js', function () {
    console.log('Accepting the updated printMe module!');
    document.body.removeChild(element);
    element = component();
    document.body.appendChild(element);
  });
}
```

When you save `print.js`, the dev server sends the new module to the page, and webpack calls this function. The imported `printMe` already refers to the new code, but the button still holds the old function, so this function removes the old `<div>` and builds a new one.

`import.meta.webpackHot` exists only while HMR is running. In a finished build, webpack replaces it with `undefined`, so the `if` block does nothing.

[webpack.config.cjs](webpack.config.cjs) (6 lines) switches to development mode and adds a rule that loads [src/styles.css](src/styles.css) with `css-loader` and `style-loader`; `hot: true` comes from the [shared base configuration](../base.cjs). style-loader accepts updates to its own CSS, so a new background colour also appears without a reload. A change that no code accepts, such as one to `src/index.js`, cannot be swapped in, so the dev server reloads the whole page instead.

## Then and now

The original version called `module.hot.accept`. webpack 5 added `import.meta.webpackHot`, an alias for `module.hot` that also works in strict ES modules ([release notes](https://webpack.js.org/blog/2020-10-10-webpack-5-release/), [HMR API](https://webpack.js.org/api/hot-module-replacement/)), and this version uses it.

As of 2026-09, the [official guide](https://webpack.js.org/guides/hot-module-replacement/) no longer needs style-loader for stylesheets: `experiments.css` defaults to `'auto'`, so webpack updates changed CSS itself. This example keeps its style-loader rule; [Loading CSS, images and data](../asset-management/README.md) explains the built-in CSS support.

Other tools use the same idea. [Vite](https://vite.dev/guide/why), for example, replaces only the changed module in the browser, without a full page reload or waiting for a rebuild.

## Limits

- Only `print.js` has an update handler; other JavaScript changes reload the page.
- HMR is a development tool. The official guide says it is not meant for production.
- It needs the dev server, so the live demo cannot show it.

## Checks and credits

- `npm run check` builds this topic, and `npm run test:browser` opens the built page in Chromium, Firefox and WebKit and fails on a script error or a file that does not load. No test edits a file while the dev server runs, so the live update is checked only by hand, as described above.
- Based on the official webpack guide [Hot Module Replacement](https://webpack.js.org/guides/hot-module-replacement/). The [migration ledger](../../../docs/migration.md) links to the original version.
- Original code is MIT; see [NOTICE.md](../../../NOTICE.md).
