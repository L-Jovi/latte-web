# Promise：三个层次

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

从状态机开始，再理解链式调用，最后阅读聚合操作。

## 运行与观察

在仓库根执行 `npm ci`、`npm run dev`，打开 `http://127.0.0.1:4173/mechanisms/promise/index.html`。

## 阅读机制

从 [simple.js](simple.js), [promise-a+.js](promise-a+.js), [index.js](index.js) 开始。

simple.js 刻意不满足 Promise/A+：then 订阅但不建立新链。promise-a+.js 实现解析过程并运行官方 A+ 套件。index.js 保留原来的 class/callback 风格，提供 all、race、finally。应用代码应使用原生 Promise。

## 新旧方案的联系

执行 npm run test:aplus，页面输出为 1,2。重点理解回调为何异步入队、then getter 为何只读一次，以及为何只能结算一次。

## 验证与来源

`npm test` 验证机制合同；浏览器入口由 `npm run test:browser` 验证。代码中的来源链接继续保留，[迁移清单](../../docs/migration.zh-Hans.md) 提供原始版本入口。

## 许可证

原创代码为 MIT；第三方内容见[来源声明](../../NOTICE.md)。

A+ 官方测试集不改动。根 npm overrides 锁定 Mocha 12.0.2、Underscore 1.13.8，替换旧测试运行器中已知有漏洞的依赖；`npm run test:aplus` 同时验证兼容性。适配器在测试运行器的同一执行环境加载经典脚本，让 `TypeError` 类型身份与标准断言一致。
