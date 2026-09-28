# Promise 链与 await

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

用 then 和 await 表达同一段两步计算。

## 运行与观察

在仓库根执行 `npm ci`、`npm run dev`，打开 `http://127.0.0.1:4173/fundamentals/javascript/async-await/index.html`。

## 阅读机制

从 [index.html](index.html) 开始。

两者均返回 Promise，页面显示 6 = 6。await 暂停当前异步函数，不会把 CPU 计算自动移到别的线程。

## 新旧方案的联系

选择最能讲清顺序的语法，并联系事件循环实验阅读。

## 验证与来源

`npm test` 验证机制合同；浏览器入口由 `npm run test:browser` 验证。代码中的来源链接继续保留，[迁移清单](../../../docs/migration.zh-Hans.md) 提供原始版本入口。

## 许可证

原创代码为 MIT；第三方内容见[来源声明](../../../NOTICE.md)。
