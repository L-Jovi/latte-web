# 编译生命周期插件

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

插件订阅编译器生命周期；loader 转换单个模块。此插件在 processAssets/REPORT 阶段使用 RawSource 输出 FILELIST.md。原先未完成的 hooks 草稿并入这个可运行流程。两者都属于构建期 API。

## 运行与预期

在仓库根目录执行 `npm ci`，然后运行 `npm run build -w @latte/webpack`。运行 `npm run dev`，打开 `http://127.0.0.1:4173/tooling/webpack/plugins/dist/index.html`。

## 从哪里读

从 [webpack.config.cjs](webpack.config.cjs), [src/index.js](src/index.js), [plugins/file-list-plugin.cjs](plugins/file-list-plugin.cjs) 开始。构建工具负责组织文件，并不保证应用逻辑正确。这个示例只表达所述机制，不作为生产项目模板。

## 验证

`npm run check` 检查类型、构建工作区、验证机制并加载打包后的库。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开生成页面。首次执行 `npx playwright install chromium firefox webkit` 安装浏览器。

## 来源与许可

MIT。[迁移与原始版本](../../../docs/migration.zh-Hans.md)；[署名](../../../NOTICE.md)。构建产物通过命令重建，不提交到仓库。
