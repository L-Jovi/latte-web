# Loading CSS, images and data

English | [简体中文](README.zh-Hans.md)

Import CSS, an SVG and an XML file, and see which loader or asset type handles each one.

## Try it

```sh
npm ci
npm run build -w @latte/webpack
npm run dev
# open http://127.0.0.1:4173/tooling/webpack/asset-management/dist/
```

The page shows **Hello webpack** in red, on a repeating icon background, followed by the same icon as an image. The browser console prints `note`, the name of the XML file's root element. `dist/` also contains the SVG, saved once under a hashed name such as `427e6e23fcca9a23d75f.svg`. You can also open the [live demo](https://latte.jovipro.com/tooling/webpack/asset-management/dist/index.html).

## How it works

[webpack.config.cjs](webpack.config.cjs) adds three rules. Each rule matches file names with a `test` pattern and says what handles them:

| File        | Handled by                        | What the import gives your code                          |
| ----------- | --------------------------------- | -------------------------------------------------------- |
| `style.css` | `css-loader`, then `style-loader` | Nothing to use; the CSS is added to the page             |
| `icon.svg`  | `type: 'asset/resource'`          | The file's URL; the file itself is copied to `dist/`     |
| `data.xml`  | `type: 'asset/source'`            | The file's text, as a string                             |

A _loader_ is a function that turns a file into JavaScript. The loaders in `use` run from right to left: `css-loader` reads the CSS and follows its `url('./icon.svg')`, then `style-loader` adds code that puts the CSS into a `<style>` tag. Because the CSS and the JavaScript point to the same icon, it is written only once. `asset/resource` and `asset/source` are _asset modules_: they are built into webpack, so they need no extra package.

[src/index.js](src/index.js) uses all three imports. It gives the text the `hello` class, which makes it red, puts the icon URL into an `<img>`, and reads the XML string with the browser's `DOMParser`.

## Then and now

Before webpack 5, the usual tools were `file-loader` (copy a file to the output and return its URL), `url-loader` (put the file into the bundle as a data URI) and `raw-loader` (import a file as a string). The original version of this topic used `file-loader` for images and `xml-loader` for XML. [Asset modules](https://webpack.js.org/guides/asset-modules/) replace those loaders: `asset/resource` does what `file-loader` did, and `asset/source` what `raw-loader` did.

CSS is going the same way. Since webpack 5.109.0, [`experiments.css`](https://webpack.js.org/configuration/experiments/#experimentscss) defaults to `'auto'`: webpack handles `.css` files itself, unless a rule with a loader already matches them, as the rule here does.

## Limits

- The XML is parsed only to log one name; nothing on the page uses its contents.
- There are no rules for fonts, CSV files or images inlined as data URIs.

## Checks and credits

- `npm run test:browser` opens the page in Chromium, Firefox and WebKit and fails on a script error or a file that does not load, so a missing icon would fail it. It does not check the colour or the console message.
- Based on the official webpack guides [Asset Management](https://webpack.js.org/guides/asset-management/) and [Asset Modules](https://webpack.js.org/guides/asset-modules/). The icon was drawn for this repository. The [migration ledger](../../../docs/migration.md) links to the original version.
- Original code is MIT; see [NOTICE.md](../../../NOTICE.md).
