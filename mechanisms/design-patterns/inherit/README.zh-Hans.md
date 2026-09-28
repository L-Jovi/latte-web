# 继承与反例

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

比较共享原型、借用构造器和 Object.create。

## 运行与观察

在仓库根执行 `npm ci`、`npm run dev`，打开 `http://127.0.0.1:4173/mechanisms/design-patterns/inherit/index.html`。

## 阅读机制

从 [prototype.js](prototype.js), [combination.js](combination.js), [prototype-obj.js](prototype-obj.js) 开始。

prototype.js 刻意共享父原型以展示耦合；combination.js 保留并修正寄生组合继承。各范例放在独立模块作用域中运行。

## 新旧方案的联系

class 提供更清晰的表面语法，底层仍依赖原型关系。

## 验证与来源

`npm test` 验证机制合同；浏览器入口由 `npm run test:browser` 验证。代码中的来源链接继续保留，[迁移清单](../../../docs/migration.zh-Hans.md) 提供原始版本入口。

## 许可证

原创代码为 MIT；第三方内容见[来源声明](../../../NOTICE.md)。
