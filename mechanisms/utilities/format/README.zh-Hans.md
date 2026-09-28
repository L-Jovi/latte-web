# 十进制字符串格式化

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

直接分组数字字符串，避免转成 Number 后丢失精度。

## 运行与观察

在仓库根执行 `npm ci`、`npm run dev`，打开 `http://127.0.0.1:4173/mechanisms/utilities/format/index.html`。

## 阅读机制

从 [format-number.js](format-number.js) 开始。

输入合同是带可选正负号的十进制字符串；不解析科学计数法或地区格式。

## 新旧方案的联系

数值的地区化显示可以使用 Intl.NumberFormat。

## 验证与来源

`npm test` 验证机制合同；浏览器入口由 `npm run test:browser` 验证。代码中的来源链接继续保留，[迁移清单](../../../docs/migration.zh-Hans.md) 提供原始版本入口。

## 许可证

原创代码为 MIT；第三方内容见[来源声明](../../../NOTICE.md)。
