# 经典 React 与 Redux

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

两版从 Use Redux 开始，都支持新增、编辑、删除、完成切换、筛选、全选切换、清除已完成、异步导入和 About 路由。编辑为空会删除该项。导入使用本地虚构 todos.json，分配新 ID，并显示可重试的错误。刷新会重置全部状态，没有持久化或远端账户。Hash 路由让两个构建都能在简单静态服务器运行。class 与 connect 把视图状态和 Immutable Map/List store 分开。显式 action creator 进入 reducer，Saga 编排导入并捕获错误。原来的组织思路可以在 React 19 上继续阅读，同时移除过时生命周期和把路由再同步进 Redux 的重复状态。React 仍支持 class。原来的递归 action 绑定与 BEFORE_ 广播对这个小场景没有必要，可从 Git 恢复。Draft EditorState 已提取为独立富文本示例。对照[现代版](../react-modern/README.zh-Hans.md)及[历史架构研究](../../docs/history/react/README.zh-Hans.md)。

## 运行与预期

在仓库根目录执行 `npm ci`、`npm run build -w @latte/react-classic`，然后执行 `npm run dev`。打开 `http://127.0.0.1:4173/examples/react-classic/dist/index.html`。

## 从哪里读

[src/App.jsx](src/App.jsx), [src/actions.js](src/actions.js), [src/reducer.js](src/reducer.js), [src/sagas.js](src/sagas.js), [src/store.js](src/store.js)。

## 验证

`npm run test:apps` 验证当前组件与渲染器；构建后运行 `npm run test:browser`，在 Chromium、Firefox、WebKit 中验证实际行为。历史文件不执行。上文说明测试范围与刻意简化。

## 来源与许可

原创实现与这些说明使用 MIT，目录内另有许可的除外。[迁移清单](../../docs/migration.zh-Hans.md) 提供固定原始版本，[NOTICE](../../NOTICE.md) 记录第三方署名。
