# Webpack 构建专题

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

每个专题在共同底座上改变一个构建环节。`npm run dev -w @latte/webpack` 启动入门示例；其他专题可运行 `npm exec -w @latte/webpack -- webpack serve --config lazy-loading/webpack.config.cjs`，监听 localhost:4180。配置显式指定 context，避免当前目录改变构建含义。官方概念说明：https://webpack.js.org/concepts/。

## 运行与预期

在仓库根目录执行 `npm ci`，然后运行 `npm run build -w @latte/webpack`。查看下面说明的 `dist/` 生成结果。

## 从哪里读

从 [base.cjs](base.cjs), [build.cjs](build.cjs) 开始。构建工具负责组织文件，并不保证应用逻辑正确。这个示例只表达所述机制，不作为生产项目模板。

## 验证

`npm run check` 检查类型、构建工作区、验证机制并加载打包后的库。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开生成页面。首次执行 `npx playwright install chromium firefox webkit` 安装浏览器。

## 来源与许可

MIT。[迁移与原始版本](../../docs/migration.zh-Hans.md)；[署名](../../NOTICE.md)。构建产物通过命令重建，不提交到仓库。
