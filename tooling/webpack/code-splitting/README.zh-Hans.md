# 多入口共享代码

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

两个入口共享一份 Lodash，不再各打包一份。两个入口都用到 Lodash，于是把它放进第三个文件，页面只加载一次。

## 试一试

```sh
npm ci
npm run build -w @latte/webpack
npm run dev
# 打开 http://127.0.0.1:4173/tooling/webpack/code-splitting/dist/
```

页面上显示 `index+module+loaded!`，控制台打印 `Another module loaded!`。`dist/` 里有四个脚本，`index.html` 全都加载了：`index.js` 和 `another.js` 只有你自己的代码，各几百字节；`shared.js` 是 Lodash，约 70 KB；`runtime.js` 是 webpack 的小型模块加载器。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/code-splitting/dist/index.html)。

## 原理

[webpack.config.cjs](webpack.config.cjs)（12 行）定义了三个入口：

```js
config.entry = {
  index: { import: './src/index.js', dependOn: 'shared' },
  another: { import: './src/another-module.js', dependOn: 'shared' },
  shared: 'lodash',
};
```

`dependOn: 'shared'` 告诉 webpack：`shared` 这个入口一定已经在页面上了，所以另外两个入口里不再放 Lodash。`output.filename: '[name].js'` 让每个文件以入口名命名。

`runtimeChunk: 'single'` 把运行时（runtime）单独放进 `runtime.js`。运行时是 webpack 用来加载模块、记录哪些模块已经加载的代码。只有一份运行时，页面上就只有一份“已加载模块”清单，两个入口用的是同一个 Lodash；否则每个入口各带一份运行时，也各自初始化一份 Lodash。[官方指南](https://webpack.js.org/guides/code-splitting/)指出，多个入口放在同一个 HTML 页面上时需要这项设置。`<script>` 标签的先后顺序无关紧要：每个入口文件只是登记自己，等 `shared.js` 到位后，由运行时启动它。

[src/index.js](src/index.js)（10 行）用 `import()` 取得 Lodash，但 Lodash 已经在 `shared.js` 里了，所以不会再多生成文件。[src/another-module.js](src/another-module.js)（3 行）用的是普通的 `import`。配置里还设置了 `splitChunks: { chunks: 'all' }`，它会自动把共用的模块拆进单独的文件；这里 `dependOn` 已经做完了这件事，所以它没有再多拆出文件。

## 过去与现在

webpack 4 之前，共用代码靠 `CommonsChunkPlugin` 抽出来。webpack 4 用 `optimization.splitChunks`（[SplitChunksPlugin](https://webpack.js.org/plugins/split-chunks-plugin/)）取代了它，webpack 5 又加入了 `dependOn`（见[发布说明](https://webpack.js.org/blog/2020-10-10-webpack-5-release/)）。这个专题最初的版本已经同时用了这两者，但把 `runtimeChunk: 'single'` 注释掉了，而且每次构建后都会打开 webpack-bundle-analyzer，用矩形树图展示每个文件里装了什么。现在的版本打开了这项设置，去掉了分析工具。

## 刻意省略

- 文件拆得越多不一定越快：每多一个文件，就多一次请求。官方指南建议尽量用一个入口导入多个模块，而不是在同一个页面上放多个入口。
- 这里共享的是页面一加载就要用的代码。能等到用的时候再加载的代码，要用 `import()` 拆分，见[用 import() 按需加载](../lazy-loading/README.zh-Hans.md)。

## 验证与来源

- `npm run check` 会运行这个构建。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开页面，只要出现脚本错误或有文件加载失败就会报错；它不比较文件大小，也不检查 Lodash 有没有被打包两次。
- 基于 webpack 官方指南 [Code Splitting](https://webpack.js.org/guides/code-splitting/)。[迁移清单](../../../docs/migration.zh-Hans.md)链接到最初的版本。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../../NOTICE.md)。
