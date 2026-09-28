# 事件与调度

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

分别观察监听器传播、任务与微任务调度。

## 运行与观察

在仓库根执行 `npm ci`、`npm run dev`，打开 `http://127.0.0.1:4173/fundamentals/events/dom-event/index.html`。

## 阅读机制

从 [dom-event/event-register.js](dom-event/event-register.js), [web-task/task-order.js](web-task/task-order.js), [node-task/task-order.cjs](node-task/task-order.cjs) 开始。

DOM 范例刻意停止后续监听器。web-task 中的陷阱是 Promise.resolve(function) 只保存函数，不会调用它。Node 范例用 CommonJS 明确初始 nextTick 语境；顶层 timer 与 immediate 的相对顺序不保证。

## 新旧方案的联系

在仓库根执行 node fundamentals/events/node-task/task-order.cjs。比较实际日志，不背诵脱离环境的统一顺序。

## 验证与来源

`npm test` 验证机制合同；浏览器入口由 `npm run test:browser` 验证。代码中的来源链接继续保留，[迁移清单](../../docs/migration.zh-Hans.md) 提供原始版本入口。

## 许可证

原创代码为 MIT；第三方内容见[来源声明](../../NOTICE.md)。
