# 链式求和

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

在闭包中累积数值，并观察原始值转换。

## 运行与观察

在仓库根执行 `npm ci`、`npm run dev`，打开 `http://127.0.0.1:4173/mechanisms/utilities/add/index.html`。

## 阅读机制

从 [add-mutiply.js](add-mutiply.js) 开始。

使用 String(addMutiplyParams(1,2)(3)) 观察结果，不依赖控制台自动转换函数；空输入之和为零，输入限定为数值。

## 新旧方案的联系

应用中的算术更适合显式函数；这个练习用于理解类型转换与保存状态。

## 验证与来源

`npm test` 验证机制合同；浏览器入口由 `npm run test:browser` 验证。代码中的来源链接继续保留，[迁移清单](../../../docs/migration.zh-Hans.md) 提供原始版本入口。

## 许可证

原创代码为 MIT；第三方内容见[来源声明](../../../NOTICE.md)。
