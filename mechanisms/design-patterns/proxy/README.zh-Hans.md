# 属性代理与事件委托

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

观察对象边界的拦截与 DOM 父节点的委托。

## 运行与观察

在仓库根执行 `npm ci`、`npm run dev`，打开 `http://127.0.0.1:4173/mechanisms/design-patterns/proxy/index.html`。

## 阅读机制

从 [es6-proxy.js](es6-proxy.js), [event-proxy.js](event-proxy.js) 开始。

set trap 刻意把输入映射到固定演示值，并返回 true 满足 Proxy 合同；事件委托读取实际 event.target。

## 新旧方案的联系

两者都使用间接访问的思想，但属于不同的平台合同。

## 验证与来源

`npm test` 验证机制合同；浏览器入口由 `npm run test:browser` 验证。代码中的来源链接继续保留，[迁移清单](../../../docs/migration.zh-Hans.md) 提供原始版本入口。

## 许可证

原创代码为 MIT；第三方内容见[来源声明](../../../NOTICE.md)。
