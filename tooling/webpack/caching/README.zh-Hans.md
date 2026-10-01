# 用内容哈希做长期缓存

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

只有内容变了文件名才变，浏览器就能放心缓存。内容哈希（content hash）是根据文件内容算出的一小段“指纹”，写在文件名里。

## 试一试

```sh
npm ci
npm run build -w @latte/webpack
npm run dev
# 打开 http://127.0.0.1:4173/tooling/webpack/caching/dist/?lang=zh
```

页面上显示 **Hello webpack**；点击这行文字，控制台打印 `Hello webpack!`。`dist/` 里有三个脚本，文件名里都带着哈希，比如 `main.23cd93cf2c0e2c425520.js`（你的代码）、`637.40779b51713db0a1f01b.js`（Lodash）和 `runtime.613ea7698a113b2af393.js`（webpack 的加载器），`index.html` 引用了这三个文件。现在修改 [src/print.js](src/print.js)，比如把 `console.log` 改成 `console.info`，再构建一次：只有 `main` 文件换了名字，Lodash 和运行时的文件名都没变。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/caching/dist/index.html?lang=zh)。

## 原理

[webpack.config.cjs](webpack.config.cjs)（8 行）改了三处：

- `output.filename: '[name].[contenthash].js'` 把哈希写进每个文件名。内容不变，名字就不变；内容一变，名字也跟着变。浏览器想把文件留多久都可以，因为新版本总是换一个新名字送来。
- `splitChunks: { chunks: 'all' }` 把来自 `node_modules` 的 Lodash 拆进单独的文件。[官方指南](https://webpack.js.org/guides/caching/)解释了原因：第三方库比你自己的代码改得少，所以你改了代码，访问者也不必重新下载 Lodash。
- `runtimeChunk: 'single'` 把 webpack 自己的加载代码放进 `runtime.<hash>.js`，这样它就不会夹在其他文件里，连累它们改名。

`moduleIds: 'deterministic'` 根据模块名给每个模块算出一个简短的编号，而不是按 webpack 发现它们的先后顺序编号，所以在别处增加一个模块，不会让 Lodash 的编号变化、连带它的文件改名。生产模式默认就使用这项设置。Lodash 文件的名字就是它的编号，比如 `637`，因为配置里没有给它起名。

## 过去与现在

webpack 5 有两项改动对这里很有帮助（见[发布说明](https://webpack.js.org/blog/2020-10-10-webpack-5-release/)）：`[contenthash]` 改为对文件的真实内容求哈希，以前算的是 webpack 内部结构的哈希；模块和 chunk 的确定性 ID 在生产模式下成为默认。最初的版本和官方指南一样，用一个缓存组（cache group）把 Lodash 文件命名为 `vendors`；现在的版本沿用 webpack 生成的编号。

## 刻意省略

- 文件名只解决了缓存的一半问题。服务器还得通过 `Cache-Control` 响应头告诉浏览器可以保留这些文件。本地服务器发送的是 `Cache-Control: no-store`，所以这里什么都不会被缓存。
- `index.html` 的名字固定不变，所以不能缓存太久：正是它指向当前的各个文件名。

## 验证与来源

- `npm run check` 会运行这个构建。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开页面，只要出现脚本错误或有文件加载失败就会报错；它不会比较两次构建的文件名。
- 基于 webpack 官方指南 [Caching](https://webpack.js.org/guides/caching/)。[迁移清单](../../../docs/migration.zh-Hans.md)链接到最初的版本。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../../NOTICE.md)。
