# 小型设计模式

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

用小例子区分创建、适配、间接访问与通知。

## 运行与观察

在仓库根执行 `npm ci`、`npm run dev`，打开 `http://127.0.0.1:4173/mechanisms/design-patterns/index.html`。

## 阅读机制

从 [factory/simple-factory.js](factory/simple-factory.js), [factory/factory-method.js](factory/factory-method.js), [plug.js](plug.js), [singleton.js](singleton.js), [descriptor.js](descriptor.js) 开始。

这些是局部机制，不建议在应用中套用所有模式。descriptor 范例替换了无法直接运行的旧字段装饰器；旧签名与当前提案的语义不同。

## 新旧方案的联系

只有模式能解决具体耦合时才使用；理解属性描述符不需要装饰器工具链。

## 验证与来源

`npm test` 验证机制合同；浏览器入口由 `npm run test:browser` 验证。代码中的来源链接继续保留，[迁移清单](../../docs/migration.zh-Hans.md) 提供原始版本入口。

## 许可证

原创代码为 MIT；第三方内容见[来源声明](../../NOTICE.md)。
