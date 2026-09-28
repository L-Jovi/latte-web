# JavaScript 基础

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

通过短脚本理解闭包、对象构造与调用接收者。

## 运行与观察

在仓库根执行 `npm ci`、`npm run dev`，打开 `http://127.0.0.1:4173/fundamentals/javascript/index.html`。

## 阅读机制

从 [closure.js](closure.js), [instance/new.js](instance/new.js), [context/bind.js](context/bind.js) 开始。

构造实验展示返回 null 与返回对象的区别。下级实验各自说明刻意限定的合同。

## 新旧方案的联系

普通 JavaScript 仍是基础；新语法不能替代对对象模型的理解。

## 验证与来源

`npm test` 验证机制合同；浏览器入口由 `npm run test:browser` 验证。代码中的来源链接继续保留，[迁移清单](../../docs/migration.zh-Hans.md) 提供原始版本入口。

## 许可证

原创代码为 MIT；第三方内容见[来源声明](../../NOTICE.md)。
