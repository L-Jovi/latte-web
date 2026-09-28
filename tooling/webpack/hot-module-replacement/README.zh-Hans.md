# 模块热替换

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

运行 webpack serve 后修改 src/print.js，再次点击按钮。import.meta.webpackHot.accept 重建元素以绑定新处理函数。自动检查验证构建结果；实际热替换通过这一步手工观察。

## 运行与预期

在仓库根目录执行 `npm ci`，然后运行 `npm run build -w @latte/webpack`。运行 `npm run dev`，打开 `http://127.0.0.1:4173/tooling/webpack/hot-module-replacement/dist/index.html`。

## 从哪里读

从 [webpack.config.cjs](webpack.config.cjs), [src/index.js](src/index.js) 开始。构建工具负责组织文件，并不保证应用逻辑正确。这个示例只表达所述机制，不作为生产项目模板。

## 验证

`npm run check` 检查类型、构建工作区、验证机制并加载打包后的库。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开生成页面。首次执行 `npx playwright install chromium firefox webkit` 安装浏览器。

## 来源与许可

MIT。[迁移与原始版本](../../../docs/migration.zh-Hans.md)；[署名](../../../NOTICE.md)。构建产物通过命令重建，不提交到仓库。
