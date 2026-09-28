# 类型与显式 Redux 风格 reducer

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

可辨识联合类型展示成功与错误分支的收窄。enthusiasm reducer 保留原来的增减场景，数值最低为一；重复 CRA 应用退役。TypeScript 检查 action 形状，但来自类型系统以外的输入仍需要边界校验。现代 Redux Toolkit 减少 action/reducer 样板；显式写法帮助理解它生成了什么。

## 运行与预期

在仓库根目录执行 `npm ci`，然后运行 `npm run build -w @latte/typescript`。查看下面说明的 `dist/` 生成结果。

## 从哪里读

从 [types/narrowing.ts](types/narrowing.ts), [actions/index.ts](actions/index.ts), [reducers/index.ts](reducers/index.ts) 开始。构建工具负责组织文件，并不保证应用逻辑正确。这个示例只表达所述机制，不作为生产项目模板。

## 验证

`npm run check` 检查类型、构建工作区、验证机制并加载打包后的库。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开生成页面。首次执行 `npx playwright install chromium firefox webkit` 安装浏览器。

## 来源与许可

MIT。[迁移与原始版本](../../docs/migration.zh-Hans.md)；[署名](../../NOTICE.md)。构建产物通过命令重建，不提交到仓库。
