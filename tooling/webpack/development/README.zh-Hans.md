# 用 source map 调试

[English](README.md) | 简体中文

> 对应英文版：2026-10-01。英文版更新后本页可能滞后。

用开发模式构建，在 DevTools 里看到原始源码。source map（源码映射）把打包产物里的每一行，对应回你自己代码里生成它的那一行。

## 试一试

```sh
npm ci
npm run build -w @latte/webpack
npm run dev
# 打开 http://127.0.0.1:4173/tooling/webpack/development/dist/?lang=zh
```

页面上有 **Hello webpack** 和一个按钮。点击按钮，控制台打印 `I get called from print.js.`，同时弹出提示框 `trigger from button :)`。接着打开浏览器的开发者工具：页面只加载了 `bundle.js`，但 Sources 面板（Firefox 里叫 Debugger）里有一个 `webpack://` 分组，其中的 `src/index.js` 和 `src/print.js` 跟你写的一模一样。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/development/dist/index.html?lang=zh)。

## 原理

[webpack.config.cjs](webpack.config.cjs)（4 行）在[共用配置](../base.cjs)的基础上改了两项：

- `mode: 'development'` 关掉压缩，所以 `dist/bundle.js` 保持可读，每个模块前面还有一行注释，写明它来自哪个文件。
- `devtool: 'inline-source-map'` 把 source map 直接放进 `bundle.js`：它以 `data:` URL 的形式写在最后一行的注释里。开发者工具读到这行注释，展示给你的就是原来的文件，而不是打包产物。

[src/index.js](src/index.js)（28 行）负责搭建页面，点击按钮时运行 [src/print.js](src/print.js)（4 行）里的 `printMe`。

想看 source map 怎样帮你定位错误，可以把 `src/print.js` 里的 `console.log` 改成 `cosnole.log`，重新构建，刷新页面后再点击。报错指向 `print.js:2`，正是要修改的那一行，而不是 `bundle.js` 深处的某一行。

如果想每次保存都自动重新构建，可以为这个专题启动 webpack 的开发服务器：`npm exec -w @latte/webpack -- webpack serve --config development/webpack.config.cjs`，然后打开 http://127.0.0.1:4180/。

## 过去与现在

最初的版本把[官方指南](https://webpack.js.org/guides/development/)列出的三种“文件一改就重新构建”的办法都演示了一遍：`webpack --watch` 会重新构建，但要你自己刷新浏览器；webpack-dev-server 还会自动刷新页面；另外还有一个用 webpack-dev-middleware 搭的小型 Express 服务器。webpack-dev-server 内部本来就用 webpack-dev-middleware，所以这个版本只保留了开发服务器。

source map 最早是为 Closure Inspector 设计的，这是一个调试优化后 JavaScript 的工具。2023–2024 年间，这种格式被整理成了 Ecma 标准 [ECMA-426](https://tc39.es/ecma426/)。

## 刻意省略

- 内联的 source map 会让打包产物变得很大：`dist/bundle.js` 将近 1.5 MB，一半以上是 source map；而[第一个 webpack 构建](../getting-started/README.zh-Hans.md)里压缩后的产物只有约 71 KB。官方指南只把 `inline-source-map` 用于演示，不建议用于生产环境；[开发构建与生产构建](../production/README.zh-Hans.md)则把 source map 写成单独的文件。
- 这里只演示了一种 `devtool` 取值。webpack 还有[很多别的取值](https://webpack.js.org/configuration/devtool/)，各自在构建速度和映射精细程度之间取舍。

## 验证与来源

- `npm run check` 会运行这个构建。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开构建好的页面，只要抛出错误或有文件加载失败就会报错；它不会点击按钮，也不检查 source map。
- 基于 webpack 官方指南 [Development](https://webpack.js.org/guides/development/)。[迁移清单](../../../docs/migration.zh-Hans.md)链接到最初的版本。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../../NOTICE.md)。
