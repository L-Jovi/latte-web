# 小型 JavaScript 工具

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

把常见工具函数读作边界明确的算法。

## 运行与观察

在仓库根执行 `npm ci`、`npm test`，结合回归用例阅读短实现。

## 阅读机制

从 [check-type.js](check-type.js), [read-array.js](read-array.js) 开始。

read-array.js 修改原型的方式作为历史练习保留；应用更适合使用独立 reader 对象。JSON 序列化失败也不能证明存在循环引用。

## 新旧方案的联系

下级目录分别解释对象图复制、计时与格式化，不把它们包装成生产工具库。

## 验证与来源

`npm test` 验证机制合同；浏览器入口由 `npm run test:browser` 验证。代码中的来源链接继续保留，[迁移清单](../../docs/migration.zh-Hans.md) 提供原始版本入口。

## 许可证

原创代码为 MIT；第三方内容见[来源声明](../../NOTICE.md)。

`read-array.js` 用闭包保存游标，不修改 Array.prototype。`createArrayReader(array)` 返回 `read(count)`：正整数数量最多读取这么多项，结束后返回 `[]`。它读取当前数组，因此修改输入会影响后续读取。逐项消费时通常直接使用原生数组迭代器即可。
