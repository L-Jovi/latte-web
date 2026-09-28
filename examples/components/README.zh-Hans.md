# Card、Button 与三种打包方式

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

Card 保留原来的容器与样式职责；Button 保留 message 属性，并转交原生按钮属性。点击计数器实际使用两者。Vite 输出库的 ESM/CJS 与独立 CSS；Webpack 输出 CJS，在浏览器加载时注入 CSS；Babel 转换 JSX，但保留独立模块与 CSS 导入。库打包时 React 始终外置，因此 Babel 输出需要理解 CSS 的消费端。根目录运行 `npm run build:storybook`，或 `npm run storybook -w @latte/components`，查看两条手写组件故事。Storybook 用于展示组件，不再复制一套实现。

## 运行与预期

在仓库根目录执行 `npm ci`，然后运行 `npm run build -w @latte/components`。运行 `npm run dev`，打开 `http://127.0.0.1:4173/examples/components/dist/demo/index.html`。

## 从哪里读

从 [src/Card.jsx](src/Card.jsx), [src/Button.jsx](src/Button.jsx), [build.mjs](build.mjs), [vite.library.config.js](vite.library.config.js), [webpack.config.cjs](webpack.config.cjs) 开始。构建工具负责组织文件，并不保证应用逻辑正确。这个示例只表达所述机制，不作为生产项目模板。

## 验证

`npm run check` 检查类型、构建工作区、验证机制并加载打包后的库。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开生成页面。首次执行 `npx playwright install chromium firefox webkit` 安装浏览器。

## 来源与许可

MIT。[迁移与原始版本](../../docs/migration.zh-Hans.md)；[署名](../../NOTICE.md)。构建产物通过命令重建，不提交到仓库。
