# 模块热替换（HMR）

[English](README.md) | 简体中文

> 对应英文版：2026-10-01。英文版更新后本页可能滞后。

开发服务器运行时修改模块，页面不刷新就能更新。模块热替换（hot module replacement，HMR）把改过的模块换进正在运行的页面，页面不必从头再来。

## 试一试

```sh
npm ci
npm exec -w @latte/webpack -- webpack serve --config hot-module-replacement/webpack.config.cjs
# 打开 http://127.0.0.1:4180/?lang=zh
```

灰色背景的页面上有 **Hello webpack** 和一个按钮。点击按钮，控制台打印 `content change :)`。现在把 [src/print.js](src/print.js) 里这段文字改掉并保存：控制台打印 `Accepting the updated printMe module!`，之前的输出都还在，说明页面没有刷新。再点一次按钮，打印出来的就是你改过的文字。

这需要 webpack 的开发服务器，所以只能在你自己的电脑上看到。[在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/hot-module-replacement/dist/index.html?lang=zh)，以及用 `npm run build -w @latte/webpack` 和 `npm run dev` 看到的页面，都是构建好的结果：看起来一样，但不会有任何更新。

## 原理

[src/index.js](src/index.js)（38 行）生成一个 `<div>`，里面按钮的点击处理函数是 `src/print.js` 导出的 `printMe`。接着它登记：`print.js` 有新版本时请通知我。

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

保存 `print.js` 后，开发服务器把新模块发给页面，webpack 随即调用这个函数。导入的 `printMe` 已经指向新代码，可按钮上绑着的还是旧函数，所以这个函数要删掉旧的 `<div>`，再重新生成一个。

`import.meta.webpackHot` 只在 HMR 运行时才存在。在构建好的产物里，webpack 把它替换成 `undefined`，这个 `if` 块什么也不做。

[webpack.config.cjs](webpack.config.cjs)（6 行）切换到开发模式，并加了一条规则，用 `css-loader` 和 `style-loader` 加载 [src/styles.css](src/styles.css)；`hot: true` 来自[共用配置](../base.cjs)。style-loader 会自己接收 CSS 的更新，所以改了背景颜色，页面同样不刷新就会变。如果改动没有任何代码接收，比如改的是 `src/index.js`，就没法替换进去，开发服务器会改为刷新整个页面。

## 过去与现在

最初的版本调用的是 `module.hot.accept`。webpack 5 增加了 `import.meta.webpackHot`，它是 `module.hot` 的别名，在严格的 ES 模块里也能用（见[发布说明](https://webpack.js.org/blog/2020-10-10-webpack-5-release/)和 [HMR API](https://webpack.js.org/api/hot-module-replacement/)），这个版本用的就是它。

截至 2026-09，[官方指南](https://webpack.js.org/guides/hot-module-replacement/)处理样式表已经不需要 style-loader：`experiments.css` 默认为 `'auto'`，webpack 会自己更新改过的 CSS。这个示例保留了 style-loader 规则；webpack 内置的 CSS 支持见[加载 CSS、图片和数据文件](../asset-management/README.zh-Hans.md)。

别的工具也用同样的思路。比如 [Vite](https://vite.dev/guide/why) 只在浏览器里替换改动的那个模块，既不用整页刷新，也不用等待重新构建。

## 刻意省略

- 只有 `print.js` 有更新处理函数；改其他 JavaScript 会刷新整个页面。
- HMR 是开发工具。官方指南明确说它不适合用于生产环境。
- 它离不开开发服务器，所以在线演示看不到效果。

## 验证与来源

- `npm run check` 会构建这个专题，`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开构建好的页面，只要出现脚本错误或有文件加载失败就会报错。没有测试会在开发服务器运行时修改文件，所以热更新只能按上面的步骤手动验证。
- 基于 webpack 官方指南 [Hot Module Replacement](https://webpack.js.org/guides/hot-module-replacement/)。[迁移清单](../../../docs/migration.zh-Hans.md)链接到最初的版本。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../../NOTICE.md)。
