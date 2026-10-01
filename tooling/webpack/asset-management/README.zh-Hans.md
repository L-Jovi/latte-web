# 加载 CSS、图片和数据文件

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

导入 CSS、SVG 和 XML，看各自由哪种 loader 或资源类型处理。

## 试一试

```sh
npm ci
npm run build -w @latte/webpack
npm run dev
# 打开 http://127.0.0.1:4173/tooling/webpack/asset-management/dist/
```

页面上是红色的 **Hello webpack**，背景铺满了重复的图标，后面还跟着同一个图标的图片。浏览器控制台打印出 `note`，这是 XML 文件根元素的名字。`dist/` 里还多了那个 SVG，只存了一份，文件名是一串哈希，比如 `427e6e23fcca9a23d75f.svg`。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/asset-management/dist/index.html)。

## 原理

[webpack.config.cjs](webpack.config.cjs) 加了三条规则。每条规则用 `test` 匹配文件名，并指定由谁来处理：

| 文件        | 由谁处理                            | 导入后你的代码拿到什么                     |
| ----------- | ----------------------------------- | ------------------------------------------ |
| `style.css` | 先 `css-loader`，再 `style-loader`  | 没有可用的值；CSS 会被加到页面上           |
| `icon.svg`  | `type: 'asset/resource'`            | 文件的 URL；文件本身被复制到 `dist/`       |
| `data.xml`  | `type: 'asset/source'`              | 文件的文本内容，是一个字符串               |

loader 是把一个文件转换成 JavaScript 的函数。`use` 里的 loader 从右往左执行：`css-loader` 读取 CSS，并跟进其中的 `url('./icon.svg')`；接着 `style-loader` 加入一段代码，把 CSS 放进 `<style>` 标签。CSS 和 JavaScript 指向的是同一个图标，所以它只输出一次。`asset/resource` 和 `asset/source` 属于资源模块（asset modules）：它们是 webpack 内置的，不需要额外安装包。

[src/index.js](src/index.js) 用到了这三个导入：给文字加上 `hello` 类让它变红，把图标的 URL 放进一个 `<img>`，再用浏览器的 `DOMParser` 解析 XML 字符串。

## 过去与现在

webpack 5 之前，常用的是 `file-loader`（把文件复制到输出目录并返回 URL）、`url-loader`（把文件以 data URI 的形式内联进包里）和 `raw-loader`（把文件作为字符串导入）。这个专题最初的版本用 `file-loader` 处理图片，用 `xml-loader` 处理 XML。[资源模块](https://webpack.js.org/guides/asset-modules/)取代了这些 loader：`asset/resource` 做的是 `file-loader` 的事，`asset/source` 做的是 `raw-loader` 的事。

CSS 也在走同一条路。从 webpack 5.109.0 起，[`experiments.css`](https://webpack.js.org/configuration/experiments/#experimentscss) 默认为 `'auto'`：webpack 会自己处理 `.css` 文件，除非已经有带 loader 的规则匹配了它们，就像这里的规则一样。

## 刻意省略

- 解析 XML 只是为了打印一个名字，页面上并没有用到它的内容。
- 没有处理字体、CSV 文件的规则，也没有把图片内联成 data URI 的规则。

## 验证与来源

- `npm run test:browser` 在 Chromium、Firefox、WebKit 中打开页面，只要出现脚本错误或有文件加载失败就会报错，所以图标缺失也会被发现。它不检查颜色，也不检查控制台输出。
- 基于 webpack 官方指南 [Asset Management](https://webpack.js.org/guides/asset-management/) 和 [Asset Modules](https://webpack.js.org/guides/asset-modules/)。图标是为本仓库绘制的。[迁移清单](../../../docs/migration.zh-Hans.md)链接到最初的版本。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../../NOTICE.md)。
