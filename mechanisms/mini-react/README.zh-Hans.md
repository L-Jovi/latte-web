# 最小元素与组件渲染器

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

沿 createElement → mount → commit → setState 阅读。每个 class 实例持有自己的状态与更新回调，两个计数器必须相互独立。挂载钩子在 DOM 插入后执行，卸载时解除回调。更新会同步替换组件子树，因而重置嵌套组件状态、焦点与选区。这里没有 key diff、批处理、Hooks、Fragment、错误边界、并发或完整 React 生命周期；组件必须返回单个元素。明确这些限制，才能看清基本的实例归属关系。

## 运行与预期

在仓库根目录执行 `npm ci`、`npm run build`，然后执行 `npm run dev`。打开 `http://127.0.0.1:4173/mechanisms/mini-react/index.html`。

## 从哪里读

[src/react.js](src/react.js), [src/component.js](src/component.js), [src/react-dom.js](src/react-dom.js), [src/index.js](src/index.js)。

## 验证

`npm run test:apps` 验证当前组件与渲染器；构建后运行 `npm run test:browser`，在 Chromium、Firefox、WebKit 中验证实际行为。历史文件不执行。上文说明测试范围与刻意简化。

## 来源与许可

原创实现与这些说明使用 MIT，目录内另有许可的除外。[迁移清单](../../docs/migration.zh-Hans.md) 提供固定原始版本，[NOTICE](../../NOTICE.md) 记录第三方署名。
