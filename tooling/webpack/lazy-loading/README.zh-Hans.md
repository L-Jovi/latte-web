# 用 import() 按需加载

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

点击按钮时才下载对应的模块。首次打开页面要加载的代码更少；代价是第一次点击时要多等一个请求。

## 试一试

```sh
npm ci
npm run build -w @latte/webpack
npm run dev
# 打开 http://127.0.0.1:4173/tooling/webpack/lazy-loading/dist/
```

先打开浏览器开发者工具的 Network（网络）面板，再加载页面。页面上有 **Hello webpack** 和一个按钮，加载的脚本只有 `bundle.js`。点击按钮：一个名字类似 `print.75b9ede9392a312ac178.js` 的文件被下载下来，控制台先打印 `The print.js module has loaded! See the network tab in dev tools...`，再打印 `Button Clicked: Here's "some text"!`。再点一次，只会出现第二行：模块已经加载过了，不会再运行一遍。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/lazy-loading/dist/index.html)。

## 原理

[src/index.js](src/index.js)（24 行）没有在文件开头导入 `print.js`，而是在点击处理函数里调用 `import()`：

```js
button.onclick = (e) =>
  import(/* webpackChunkName: "print" */ './print.js').then((module) => {
    const print = module.default;
    print();
  });
```

`import()` 是函数形式的 `import`：执行到这一行时才去加载模块，并返回一个 Promise。模块的默认导出在它的 `default` 属性上。webpack 看到 `import()`，就把 [src/print.js](src/print.js) 放进一个单独的文件，也就是 chunk（代码块），浏览器只在这次调用执行时才下载它。Lodash 是按常规方式导入的，所以仍然留在 `bundle.js` 里。

注释 `webpackChunkName: "print"` 给这个 chunk 起了名字；没有它，文件名就是一个数字。[webpack.config.cjs](webpack.config.cjs)（3 行）把 `output.chunkFilename` 设为 `[name].[contenthash].js`，文件名里的哈希就是这样加上的。

## 过去与现在

webpack 早先用自己的 `require.ensure()` 做代码分割。如今[模块方法文档](https://webpack.js.org/api/module-methods/)说它是 webpack 专有的写法，已被 `import()` 取代；`import()` 在 ES2020 成为 JavaScript 的一部分（见 [TC39 已完成提案列表](https://github.com/tc39/proposals/blob/main/finished-proposals.md)）。

## 刻意省略

- 没有加载提示，也没有错误处理：如果 chunk 下载失败，点击后页面上什么也看不到。`src/index.js` 里的注释也提到，真实网站需要提示用户正在加载。
- 只有一个模块等到点击时才加载；Lodash 仍然随页面一起加载。

## 验证与来源

- `npm run test:browser` 在 Chromium、Firefox、WebKit 中打开页面，先检查点击之前没有出现 `module has loaded`，再点击按钮，等待 `Button Clicked` 出现。它不检查网络请求。另有一个测试会打开这个页面，只要出现脚本错误或有文件加载失败就会报错。
- `npm run check` 会运行这个构建。
- 基于 webpack 官方指南 [Lazy Loading](https://webpack.js.org/guides/lazy-loading/)。[迁移清单](../../../docs/migration.zh-Hans.md)链接到最初的版本。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../../NOTICE.md)。
