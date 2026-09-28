# 打包后的数字字典

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

字典刻意只支持零到五。构建输出 CommonJS 库，测试从独立 Node 消费端实际加载。单词匹配不区分大小写，未知值返回空字符串或 -1。库的使用约定包括输出格式和依赖，而不只是源码中的 export。

## 运行与预期

在仓库根目录执行 `npm ci`，然后运行 `npm run build -w @latte/webpack`。查看下面说明的 `dist/` 生成结果。

## 从哪里读

从 [src/index.js](src/index.js), [webpack.config.cjs](webpack.config.cjs) 开始。构建工具负责组织文件，并不保证应用逻辑正确。这个示例只表达所述机制，不作为生产项目模板。

## 验证

`npm run check` 检查类型、构建工作区、验证机制并加载打包后的库。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开生成页面。首次执行 `npx playwright install chromium firefox webkit` 安装浏览器。

## 来源与许可

MIT。[迁移与原始版本](../../../docs/migration.zh-Hans.md)；[署名](../../../NOTICE.md)。构建产物通过命令重建，不提交到仓库。
