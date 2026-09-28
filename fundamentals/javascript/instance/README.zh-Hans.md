# 构造与原型查找

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

区分实例分配、构造器执行与原型链查找。

## 运行与观察

在仓库根执行 `npm ci`、`npm run dev`，打开 `http://127.0.0.1:4173/fundamentals/javascript/instance/index.html`。

## 阅读机制

从 [new.js](new.js), [instanceof.js](instanceof.js) 开始。

forgeNew 只覆盖普通构造器；forgeInstanceof 不实现 Symbol.hasInstance 和绑定函数，左侧为原始值时返回 false。

## 新旧方案的联系

应用中使用原生 new 和 instanceof；这里把操作符隐藏的步骤拆开。

## 验证与来源

`npm test` 验证机制合同；浏览器入口由 `npm run test:browser` 验证。代码中的来源链接继续保留，[迁移清单](../../../docs/migration.zh-Hans.md) 提供原始版本入口。

## 许可证

原创代码为 MIT；第三方内容见[来源声明](../../../NOTICE.md)。
