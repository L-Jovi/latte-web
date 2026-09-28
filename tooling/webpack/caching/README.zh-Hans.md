# 内容哈希与缓存

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

内容哈希用于 chunk 文件名，确定性的模块 ID 减少无关变化。修改 print.js 后重建并比较文件名。HTTP 缓存头仍由实际服务器设置。

## 运行与预期

在仓库根目录执行 `npm ci`，然后运行 `npm run build -w @latte/webpack`。运行 `npm run dev`，打开 `http://127.0.0.1:4173/tooling/webpack/caching/dist/index.html`。

## 从哪里读

从 [webpack.config.cjs](webpack.config.cjs), [src/index.js](src/index.js) 开始。构建工具负责组织文件，并不保证应用逻辑正确。这个示例只表达所述机制，不作为生产项目模板。

## 验证

`npm run check` 检查类型、构建工作区、验证机制并加载打包后的库。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开生成页面。首次执行 `npx playwright install chromium firefox webkit` 安装浏览器。

## 来源与许可

MIT。[迁移与原始版本](../../../docs/migration.zh-Hans.md)；[署名](../../../NOTICE.md)。构建产物通过命令重建，不提交到仓库。
