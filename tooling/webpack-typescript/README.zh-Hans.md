# Webpack 中的 React 属性类型

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

保留的 class 组件要求 compiler/framework 属性，通过 createRoot 挂载。Babel 删除 TypeScript 语法，却不检查类型；独立 tsc 命令在 Webpack 输出页面前发现无效属性。可与 Vite 组件示例比较构建职责。

## 运行与预期

在仓库根目录执行 `npm ci`，然后运行 `npm run build -w @latte/webpack-typescript`。运行 `npm run dev`，打开 `http://127.0.0.1:4173/tooling/webpack-typescript/dist/index.html`。

## 从哪里读

从 [src/components/Hello.tsx](src/components/Hello.tsx), [webpack.config.cjs](webpack.config.cjs), [tsconfig.json](tsconfig.json) 开始。构建工具负责组织文件，并不保证应用逻辑正确。这个示例只表达所述机制，不作为生产项目模板。

## 验证

`npm run check` 检查类型、构建工作区、验证机制并加载打包后的库。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开生成页面。首次执行 `npx playwright install chromium firefox webkit` 安装浏览器。

## 来源与许可

MIT。[迁移与原始版本](../../docs/migration.zh-Hans.md)；[署名](../../NOTICE.md)。构建产物通过命令重建，不提交到仓库。
