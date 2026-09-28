# 任务顺序与 TypeScript

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

Gulp 顺序运行清理、编译和 HTML 复制。编译直接调用 TypeScript 官方 CLI，替代不再维护的 Browserify/gulp-typescript 适配层。浏览器原生 ES 模块加载编译后的问候语。Gulp 编排任意任务，Vite 还理解模块关系与开发重载。

## 运行与预期

在仓库根目录执行 `npm ci`，然后运行 `npm run build -w @latte/gulp-typescript`。运行 `npm run dev`，打开 `http://127.0.0.1:4173/tooling/gulp-typescript/dist/index.html`。

## 从哪里读

从 [gulpfile.js](gulpfile.js), [src/greet.ts](src/greet.ts), [src/main.ts](src/main.ts) 开始。构建工具负责组织文件，并不保证应用逻辑正确。这个示例只表达所述机制，不作为生产项目模板。

## 验证

`npm run check` 检查类型、构建工作区、验证机制并加载打包后的库。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开生成页面。首次执行 `npx playwright install chromium firefox webkit` 安装浏览器。

## 来源与许可

MIT。[迁移与原始版本](../../docs/migration.zh-Hans.md)；[署名](../../NOTICE.md)。构建产物通过命令重建，不提交到仓库。
