# 用 webpack 打包一个库

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

把一个很小的数字与英文单词互转工具打包成库，再在另一个 Node 程序里加载。库的构建产出的不是页面，而是一个供其他代码加载的文件。

## 试一试

```sh
npm ci
npm run build -w @latte/webpack
node -e "const n = require('./tooling/webpack/library/dist/numbers.cjs'); console.log(n.numToWord(3), n.wordToNum('five'))"
```

最后一条命令打印 `Three 5`。这里没有网页，也没有在线演示：这个库在 Node 里运行。

## 原理

[src/index.js](src/index.js)（11 行）导出两个函数，在 [src/ref.json](src/ref.json) 里查找单词；这个列表收录了从零到五的数字：

- `numToWord(3)` 返回 `'Three'`；列表里没有的数字返回 `''`。
- `wordToNum('five')` 返回 `5`，不区分大小写；列表里没有的单词返回 `-1`。

[webpack.config.cjs](webpack.config.cjs)（13 行）没有使用共用配置，因为库不需要页面：

- `target: 'node'` 表示为 Node 构建，而不是为浏览器构建。
- `output.library: { type: 'commonjs2' }` 把 `src/index.js` 的导出变成 `module.exports`，所以 `require` 拿到的是一个带有 `numToWord` 和 `wordToNum` 的对象。
- `output.filename: 'numbers.cjs'` 用了 `.cjs` 扩展名，告诉 Node 这是一个 CommonJS 文件，尽管这个工作区的 `package.json` 写着 `"type": "module"`。

webpack 把 JSON 数据直接复制进了打包产物，所以 `dist/numbers.cjs`（681 字节）不依赖任何其他文件。这一点很重要：库的使用者拿到的只有构建出来的文件，它的格式、运行时需要什么，和它导出的函数一样，都是你发布内容的一部分。

## 过去与现在

最初的版本照着[官方指南](https://webpack.js.org/guides/author-libraries/)来做。截至 2026-09，这份指南仍然构建 UMD 文件：同一个文件既能当全局变量用，也能当 CommonJS 模块或 AMD 模块用。最初的版本把库命名为 `webpackNumbers`，把 Lodash 设为外部依赖（external），也就是要使用者自己安装的依赖，并用 `libraryTarget` 指定格式；如今 [output 配置文档](https://webpack.js.org/configuration/output/)建议改用 `library.type`。现在的版本去掉了 Lodash，只为 Node 构建 CommonJS 格式。

## 刻意省略

- 它只认识零到五这几个英文单词。
- 它只有供 Node 使用的 CommonJS 格式：没有浏览器版本，没有 ES 模块版本，也没有 TypeScript 类型声明。
- 它没有发布到 npm；测试直接从 `dist/` 加载它。

## 验证与来源

- `npm run test:tooling` 像一个独立的程序那样，用 `require` 加载 `dist/numbers.cjs`，检查 `numToWord(0)` 是 `'Zero'`、`wordToNum('tWo')` 是 `2`，以及未知单词返回 `-1`。`npm run check` 会先构建，再运行这个测试。
- 基于 webpack 官方指南 [Authoring Libraries](https://webpack.js.org/guides/author-libraries/)。[迁移清单](../../../docs/migration.zh-Hans.md)链接到最初的版本。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../../NOTICE.md)。
