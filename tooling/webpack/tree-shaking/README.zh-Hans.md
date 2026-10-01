# Tree shaking：去掉没用到的导出

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

只导入一个函数，看没用到的那个从生产包里消失。tree shaking（摇树优化）指的是删掉没人用的代码；对模块来说，就是删掉没有任何地方导入的导出。

## 试一试

```sh
npm ci
npm run build -w @latte/webpack
npm run dev
# 打开 http://127.0.0.1:4173/tooling/webpack/tree-shaking/dist/?lang=zh
```

页面上显示 `Hello webpack!,5 cubed is equal to 125`。再打开 `dist/bundle.js`：整个文件只有一行，169 字节，里面找不到 `square`。连 `cube` 也不见了，因为压缩工具直接把 `cube(5)` 换成了结果 `125`。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/tree-shaking/dist/index.html?lang=zh)。

## 原理

[src/math.js](src/math.js)（7 行）导出两个函数：`square` 和 `cube`。[src/index.js](src/index.js)（9 行）只导入了其中一个：

```js
import { cube } from './math.js';
```

这是静态导入：它写在文件顶层，并且明确写出要取哪个导出，所以 webpack 不用运行任何代码，就知道哪些导出被用到了。[webpack.config.cjs](webpack.config.cjs)（3 行）设置了 `optimization.usedExports: true`，它把 `square` 标记为未使用；在生产模式下，压缩工具随后把它删掉。生产模式默认也会开启 `usedExports`（见[优化选项](https://webpack.js.org/configuration/optimization/#optimizationusedexports)）。

[官方指南](https://webpack.js.org/guides/tree-shaking/)把这两步分开演示：它先用开发模式构建，这时 `square` 还在打包产物里，旁边标着注释 `/* unused harmony export square */`。

## 过去与现在

这个名字和思路是打包工具 Rollup 推广开的。webpack 2 加入了对 ES 模块中未使用导出的检测，webpack 4 又加入了 `package.json` 里的 `sideEffects` 字段，用来标明哪些文件在没人使用时可以整个删掉（见[官方指南](https://webpack.js.org/guides/tree-shaking/)）。这个专题最初的版本把 `usedExports` 注释掉了，只靠生产模式本身。

## 刻意省略

- `package.json` 里没有 `sideEffects` 字段。它能让 webpack 删掉整个文件；但如果把有副作用的文件误标为没有副作用，比如只为样式而导入的样式表，或者负责设置某个全局变量的文件，它就会连同它要做的事一起被删掉。
- 它只对 ES 模块语法（`import` 和 `export`）有效。`lodash` 包是 CommonJS 格式，所以[为旧式全局代码做适配（shimming）](../shimming/README.zh-Hans.md)仍然打包了完整的 Lodash。

## 验证与来源

- `npm run check` 会运行这个构建。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开页面，只要出现脚本错误或有文件加载失败就会报错。没有测试读取打包产物，所以也没有测试检查 `square` 是否真的被删掉了。
- 基于 webpack 官方指南 [Tree Shaking](https://webpack.js.org/guides/tree-shaking/)。[迁移清单](../../../docs/migration.zh-Hans.md)链接到最初的版本。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../../NOTICE.md)。
