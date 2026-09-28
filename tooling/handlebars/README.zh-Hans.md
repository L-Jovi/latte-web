# 模板编译与转义

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

编译器把字符串 <img src=x onerror=alert(1)> 显示为文本。同一模板预编译为 dist/template.cjs，再由仅含运行时的 API 执行。双花括号转义 HTML，三花括号会明确取消转义。文本转义不等于 URL 或 JavaScript 上下文的通用净化，也不应让不可信用户提供模板源码。

## 运行与预期

在仓库根目录执行 `npm ci`，然后运行 `npm run build -w @latte/handlebars`。运行 `npm run dev`，打开 `http://127.0.0.1:4173/tooling/handlebars/dist/index.html`。

## 从哪里读

从 [index.handlebars](index.handlebars), [build.mjs](build.mjs) 开始。构建工具负责组织文件，并不保证应用逻辑正确。这个示例只表达所述机制，不作为生产项目模板。

## 验证

`npm run check` 检查类型、构建工作区、验证机制并加载打包后的库。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开生成页面。首次执行 `npx playwright install chromium firefox webkit` 安装浏览器。

## 来源与许可

MIT。[迁移与原始版本](../../docs/migration.zh-Hans.md)；[署名](../../NOTICE.md)。构建产物通过命令重建，不提交到仓库。
