# 多个入口

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

两个入口生成两个文件，HTML 插件自动插入对应的 script 标签。

## 试一试

```sh
npm ci
npm run build -w @latte/webpack
npm run dev
# 打开 http://127.0.0.1:4173/tooling/webpack/output-management/dist/
```

页面上有 **Hello webpack** 和一个按钮。点击按钮，控制台会打印 `I get called from print.js!`。打开 `dist/index.html`，里面有两个 script 标签，分别引用 `app.js` 和 `print.js`，都是构建时写进去的。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/output-management/dist/index.html)。

## 原理

[webpack.config.cjs](webpack.config.cjs)（4 行）把单个入口换成两个有名字的入口 `app` 和 `print`，并把 `output.filename` 设为 `[name].js`。`[name]` 是一个占位符，webpack 会填上每个入口的名字，所以构建会写出 `app.js` 和 `print.js`。

HtmlWebpackPlugin 在[共用配置](../base.cjs)里加入，每次构建都会重新生成 `dist/index.html`，并为每个入口写一个 `<script>` 标签。给入口改个名字，HTML 会跟着变；手写的 HTML 文件却还指向旧名字。同样在共用配置里设置的 `output.clean` 会在每次构建前清空 `dist/`，旧名字的文件就不会越积越多。

## 过去与现在

最初的版本用 `clean-webpack-plugin` 清空 `dist/`；现在共用配置改用 webpack 自带的 `output.clean`。截至 2026-09，[官方指南](https://webpack.js.org/guides/output-management/)已经完全不用 HtmlWebpackPlugin 了：借助 webpack 5.107.0 加入的 [`experiments.html`](https://webpack.js.org/configuration/experiments/#experimentshtml)，HTML 文件本身就是入口，webpack 会把其中 `<script src>` 的地址改写成生成的文件名。这个示例仍然使用插件。

## 刻意省略

- `print.js` 输出的是空文件（0 字节）。[src/index.js](src/index.js) 自己导入了 `printMe`，所以 `app.js` 里已经有它了。生产模式下，webpack 会去掉没人用的代码，而 `print` 这个入口导出的东西没有任何地方用到。想让两个入口共用同一个模块，请看[多入口共享代码](../code-splitting/README.zh-Hans.md)。
- HTML 来自 [scripts/site.cjs](../../../scripts/site.cjs) 里的共用页面，每个专题都一样；这个专题没有自己的页面结构。

## 验证与来源

- `npm run test:browser` 在 Chromium、Firefox、WebKit 中打开页面，只要出现脚本错误或有文件加载失败就会报错。它不会点击按钮。
- 基于 webpack 官方指南 [Output Management](https://webpack.js.org/guides/output-management/)。[迁移清单](../../../docs/migration.zh-Hans.md)链接到最初的版本。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../../NOTICE.md)。
