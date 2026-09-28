# 防抖

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

等一串密集调用结束后再执行工作。

## 运行与观察

在仓库根执行 `npm ci`、`npm run dev`，打开 `http://127.0.0.1:4173/mechanisms/utilities/debounce/index.html`。

## 阅读机制

从 [simple.js](simple.js), [lodash-debounce.js](lodash-debounce.js) 开始。

短版本只在尾部执行并支持 cancel；带来源声明的 Lodash 改写另行展示 leading、trailing 与 maxWait。

## 新旧方案的联系

先用短版本理解替换计时器；需要完整合同的应用应使用维护中的库。

## 验证与来源

`npm test` 验证机制合同；浏览器入口由 `npm run test:browser` 验证。代码中的来源链接继续保留，[迁移清单](../../../docs/migration.zh-Hans.md) 提供原始版本入口。

## 许可证

原创代码为 MIT；第三方内容见[来源声明](../../../NOTICE.md)。
