# 通过 webpack 使用 TypeScript 和 React

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

看懂 Babel 为什么只删类型不检查，以及 tsc 还负责什么。构建时由 Babel 把 TypeScript 和 JSX 转换成 JavaScript，类型则交给单独运行的 `tsc` 检查。

## 试一试

```sh
npm ci
npm run build -w @latte/webpack-typescript
npm run dev
# 打开 http://127.0.0.1:4173/tooling/webpack-typescript/dist/
```

页面上显示标题 **Render component from TypeScript and React 19**。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/tooling/webpack-typescript/dist/index.html)。

## 原理

[webpack.config.cjs](webpack.config.cjs)（30 行）把每个 `.ts` 和 `.tsx` 文件都交给 `babel-loader`，并使用两个预设：

- `@babel/preset-typescript` 删掉所有只用来描述类型的代码，比如 `HelloProps` 接口，但不做任何检查。
- `@babel/preset-react` 把 JSX 转换成函数调用；`runtime: 'automatic'` 表示文件不必为此专门导入 React。

[src/components/Hello.tsx](src/components/Hello.tsx)（18 行）是一个 class 组件，它的 props 必须是两个字符串：`compiler` 和 `framework`。[src/index.tsx](src/index.tsx)（5 行）用 `createRoot` 挂载它，HtmlWebpackPlugin 则把脚本加进提供 `#root` 元素的 [index.html](index.html)。

Babel 一次只处理一个文件，而且从不看类型，所以它发现不了缺少的 prop。这件事归 `tsc` 管：[tsconfig.json](tsconfig.json) 设置了 `noEmit: true`，所以 `tsc` 只做检查，不写任何文件。想看这种分工，可以把 `src/index.tsx` 里的 `framework="React 19"` 删掉，再构建一次：构建照样成功，标题变成以“and”结尾。然后运行 `npm run typecheck -w @latte/webpack-typescript`：`tsc` 会报告缺少必需的 `framework` 属性。

## 过去与现在

最初的版本用 `awesome-typescript-loader` 编译，这是一个基于 TypeScript 编译器的 loader；React 17 则通过 UMD 版本的 `<script>` 标签作为全局变量加载。React 19 不再提供 UMD 构建，并且移除了 `ReactDOM.render`（见[升级指南](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)），所以这个版本把 React 一起打包，并用 `createRoot` 挂载。

Vite 也是这样分工的：它的[文档](https://vite.dev/guide/features#typescript)说明，Vite 只转译 `.ts` 文件，不做类型检查，并建议在构建之外再运行 `tsc --noEmit`。[一个组件库，三种构建方式](../../examples/components/README.zh-Hans.md)同时用 Vite 和 webpack 构建 React 组件。

## 刻意省略

- 构建本身从不检查类型：即使有类型错误，`npm run build -w @latte/webpack-typescript` 也会成功。只有 `tsc`，无论是单独运行还是通过 `npm run check` 运行，才能发现这些错误。
- 保留 class 组件是为了沿用最初版本、展示带类型的 props；新的 React 代码使用函数组件和 Hooks（见[生态是怎样变过来的](../../docs/ecosystem.zh-Hans.md)）。
- 没有开发环境的配置：没有开发服务器、source map，也没有热更新。

## 验证与来源

- `npm run check` 会在所有构建之前为这个目录运行 `tsc`，所以一旦有类型错误，检查就会停下。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开构建好的页面，只要出现脚本错误或有文件加载失败就会报错；它不检查标题。
- [迁移清单](../../docs/migration.zh-Hans.md)链接到最初的版本。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../NOTICE.md)。
