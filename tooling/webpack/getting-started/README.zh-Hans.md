# 第一个 webpack 构建

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

一个入口文件打包成一个文件，看中间的依赖图是怎么走的。这里的入口导入了 Lodash，webpack 把两者一起放进同一个 `bundle.js`。

## 试一试

```sh
npm ci
npm run build -w @latte/webpack
npm run dev
# 打开 http://127.0.0.1:4173/tooling/webpack/getting-started/dist/?lang=zh
```

页面上显示 **Hello Webpack**。`dist/` 里有三个文件：`index.html`；`bundle.js`，Lodash 和你的代码被压缩在这一个文件里；还有 `bundle.js.LICENSE.txt`，压缩工具把 Lodash 的许可注释挪到了这里。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/getting-started/dist/index.html?lang=zh)。

## 原理

[src/index.js](src/index.js)（9 行）导入 Lodash，用 `_.join(['Hello', 'Webpack'], ' ')` 生成一个 `<div>`，再把它加到页面上。[webpack.config.cjs](webpack.config.cjs) 原样使用[共用配置](../base.cjs)。

webpack 从入口（entry）`./src/index.js` 开始，也就是它读的第一个文件。每遇到一个 `import`，就有一个文件加入依赖图，也就是“哪个文件需要哪个文件”的关系图。这里的依赖图很短：`src/index.js` 需要 `lodash`，仅此而已。然后 webpack 把依赖图里的所有内容写进同一个打包产物（bundle）`dist/bundle.js`，并安排好顺序，保证每个模块都在它依赖的模块之后运行。

HtmlWebpackPlugin 会生成 `dist/index.html`，并写好引用 `bundle.js` 的 `<script>` 标签，所以你从来不用手动改这个文件。

## 过去与现在

在打包器出现之前，这样的页面要用单独的 `<script>` 标签加载 Lodash，再使用全局变量 `_`。[官方指南](https://webpack.js.org/guides/getting-started/)列出了这种做法的问题：看不出这段脚本依赖 Lodash；标签缺了或者顺序错了，页面就会出错；没人用的标签照样会被下载。从第 4 版开始，webpack 不写配置文件也能运行，默认从 `./src/index.js` 开始，输出 `dist/main.js`。

截至 2026-09，新的小项目建议改用 Vite；原因见[生态是怎样变过来的](../../../docs/ecosystem.zh-Hans.md)。

## 刻意省略

- 只有一个入口、一个依赖。真实项目的入口和依赖要多得多，其他专题会一项一项地加上去。
- 因为共用配置使用生产模式，产物是压缩过的。想看可读的产物，请看[用 source map 调试](../development/README.zh-Hans.md)。

## 验证与来源

- `npm run check` 会运行这个构建。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开构建好的页面，只要抛出错误或有文件加载失败就会报错；它不检查页面上的文字。
- 基于 webpack 官方指南 [Getting Started](https://webpack.js.org/guides/getting-started/)。[迁移清单](../../../docs/migration.zh-Hans.md)链接到最初的版本。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../../NOTICE.md)。
