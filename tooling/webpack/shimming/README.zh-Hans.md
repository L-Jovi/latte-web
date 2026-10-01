# 为旧式全局代码做适配（shimming）

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

给从不 import 的旧代码提供它依赖的全局变量。shim（垫片）的作用，是让旧代码在它原本没有考虑过的环境里也能运行。

## 试一试

```sh
npm ci
npm run build -w @latte/webpack
npm run dev
# 打开 http://127.0.0.1:4173/tooling/webpack/shimming/dist/?lang=zh
```

页面上显示 **Hello webpack**。写出这行字的 [src/index.js](src/index.js) 调用了 `join(...)`，却既没有导入它，也没有定义它；如果没有下面的插件，这一行会报错 `join is not defined`。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/shimming/dist/index.html?lang=zh)。

## 原理

[webpack.config.cjs](webpack.config.cjs)（4 行）加入了 webpack 的 `ProvidePlugin`：

```js
config.plugins.push(new webpack.ProvidePlugin({ join: ['lodash', 'join'] }));
```

只要某个模块用到了没有声明过的 `join`，webpack 就会替这个模块导入 Lodash 的 `join`。旧代码原样不动，缺的东西由构建补上。

## 过去与现在

在打包器出现之前，页面用单独的 `<script>` 标签加载 Lodash，再使用全局变量 `_`；按这种方式写的代码至今还依赖全局变量。[官方指南](https://webpack.js.org/guides/shimming/)提醒只在必要时才用 shim：新代码应该导入自己要用的东西。这份指南还讲了另外两种情况：代码默认 `this` 就是 `window`，以及文件只创建全局变量、不做导出。截至 2026-09，它处理这两种情况时已经不用 `imports-loader` 和 `exports-loader`，而是改用几行插件代码。

最初的版本还做了三件事：用 `imports-loader` 处理第一种情况；只在没有 `fetch` 的浏览器里加载一个 polyfill 包（`babel-polyfill` 和 `whatwg-fetch`）；向一个公开的测试 API 请求示例数据。测试用到的浏览器都自带 `fetch`，所以 polyfill 和这个请求都去掉了。Babel 从 7.4.0 版起已经弃用它那个“大而全”的 polyfill 包（见 [Babel 文档](https://babeljs.io/docs/babel-polyfill)）。

## 刻意省略

- `dist/bundle.js` 约 70 KB，因为里面是完整的 Lodash。官方指南预期 Lodash 的其余部分会被去掉，但 `lodash` 包是单个 CommonJS 文件，webpack 没法把它裁小。
- [src/globals.js](src/globals.js) 不参与构建：没有任何文件导入它。它是官方指南里的例子，一个只创建全局变量（`file` 和 `helpers`）却不导出它们的文件；这个版本没有给它补上导出。

## 验证与来源

- `npm run check` 会运行这个构建。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开页面，只要出现脚本错误或有文件加载失败就会报错，所以缺了 `join` 也会被发现。
- 基于 webpack 官方指南 [Shimming](https://webpack.js.org/guides/shimming/)。[迁移清单](../../../docs/migration.zh-Hans.md)链接到最初的版本。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../../NOTICE.md)。
