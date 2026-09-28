# 现代 React 与 Redux Toolkit

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

两版从 Use Redux 开始，都支持新增、编辑、删除、完成切换、筛选、全选切换、清除已完成、异步导入和 About 路由。编辑为空会删除该项。导入使用本地虚构 todos.json，分配新 ID，并显示可重试的错误。刷新会重置全部状态，没有持久化或远端账户。Hash 路由让两个构建都能在简单静态服务器运行。函数组件使用带类型的 Hooks。slice 保存可序列化的本地 Todo 状态，RTK Query 负责请求与缓存状态。代码把取得的标题导入可编辑 Todo，避免把远端响应直接作为可修改的 store。Immer 让 reducer 写法简洁，同时产生不可变结果。Saga 仍适合更长的多步流程；这个简单读取操作由 RTK Query 减少手写请求状态代码。对照[经典版](../react-classic/README.zh-Hans.md)与 [Redux 迁移指南](https://redux.js.org/usage/migrating-to-modern-redux)。

## 运行与预期

在仓库根目录执行 `npm ci`、`npm run build -w @latte/react-modern`，然后执行 `npm run dev`。打开 `http://127.0.0.1:4173/examples/react-modern/dist/index.html`。

## 从哪里读

[src/App.tsx](src/App.tsx), [src/store.ts](src/store.ts)。

## 验证

`npm run test:apps` 验证当前组件与渲染器；构建后运行 `npm run test:browser`，在 Chromium、Firefox、WebKit 中验证实际行为。历史文件不执行。上文说明测试范围与刻意简化。

## 来源与许可

原创实现与这些说明使用 MIT，目录内另有许可的除外。[迁移清单](../../docs/migration.zh-Hans.md) 提供固定原始版本，[NOTICE](../../NOTICE.md) 记录第三方署名。
