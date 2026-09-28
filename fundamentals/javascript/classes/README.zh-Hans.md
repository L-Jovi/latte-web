# Class 与函数继承

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

比较构造器自身的继承与实例原型链。

## 运行与观察

在仓库根执行 `npm ci`、`npm run dev`，打开 `http://127.0.0.1:4173/fundamentals/javascript/classes/index.html`。

## 阅读机制

从 [extends.js](extends.js) 开始。

只设置 Sub.prototype 不会建立 class extends 同时提供的构造器继承；控制台的不同结果是实验本身。

## 新旧方案的联系

现代代码用 Object.getPrototypeOf 明确表达原型检查。

## 验证与来源

`npm test` 验证机制合同；浏览器入口由 `npm run test:browser` 验证。代码中的来源链接继续保留，[迁移清单](../../../docs/migration.zh-Hans.md) 提供原始版本入口。

## 许可证

原创代码为 MIT；第三方内容见[来源声明](../../../NOTICE.md)。
