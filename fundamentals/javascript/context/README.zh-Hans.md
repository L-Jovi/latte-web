# call、apply 与 bind

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

把函数调用时的接收者变得可见。

## 运行与观察

在仓库根执行 `npm ci`、`npm run dev`，打开 `http://127.0.0.1:4173/fundamentals/javascript/context/index.html`。

## 阅读机制

从 [call.js](call.js), [apply.js](apply.js), [bind.js](bind.js) 开始。

临时方法模型会包装原始值，不能用于冻结对象，也不精确复刻严格模式的 this。bind 仅覆盖普通函数构造器，不覆盖 class 与特殊内建对象。

## 新旧方案的联系

与原生 call/apply/bind 对照。唯一 Symbol 防止撞名，finally 保证抛错后也会清理临时属性。

## 验证与来源

`npm test` 验证机制合同；浏览器入口由 `npm run test:browser` 验证。代码中的来源链接继续保留，[迁移清单](../../../docs/migration.zh-Hans.md) 提供原始版本入口。

## 许可证

原创代码为 MIT；第三方内容见[来源声明](../../../NOTICE.md)。
