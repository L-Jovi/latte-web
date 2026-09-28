# Grunt 声明式文件任务

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

默认 clean → copy 顺序把 HTML 与 JavaScript 复制到 dist。复制不会压缩内容，因此输出保留真实文件名。Grunt 展示文件匹配与任务配置；Vite 处理模块依赖图与开发转换。这里保留可运行的历史任务流，用于理解机制。

## 运行与预期

在仓库根目录执行 `npm ci`，然后运行 `npm run build -w @latte/grunt`。运行 `npm run dev`，打开 `http://127.0.0.1:4173/tooling/grunt/dist/index.html`。

## 从哪里读

从 [Gruntfile.cjs](Gruntfile.cjs) 开始。构建工具负责组织文件，并不保证应用逻辑正确。这个示例只表达所述机制，不作为生产项目模板。

## 验证

`npm run check` 检查类型、构建工作区、验证机制并加载打包后的库。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开生成页面。首次执行 `npx playwright install chromium firefox webkit` 安装浏览器。

## 来源与许可

ISC; see LICENSE。[迁移与原始版本](../../docs/migration.zh-Hans.md)；[署名](../../NOTICE.md)。构建产物通过命令重建，不提交到仓库。
