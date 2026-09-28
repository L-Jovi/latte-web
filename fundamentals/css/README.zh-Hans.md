# CSS 布局

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

观察格式化上下文、网格放置与多种居中方式。

## 运行与观察

在仓库根执行 `npm ci`、`npm run dev`，打开 `http://127.0.0.1:4173/fundamentals/css/grid/index.html`。

## 阅读机制

从 [bfc/bfc.html](bfc/bfc.html), [vertical-center/index.html](vertical-center/index.html), [grid/index.html](grid/index.html) 开始。

旧的 overflow BFC 范例仍有价值，但裁剪是其副作用。flow-root 可以直接建立格式化上下文。固定尺寸用于方便观察，不代表响应式页面的默认写法。

## 新旧方案的联系

一般对齐优先 flex/grid；保留 table-cell 与 inline-block 写法用于理解既有代码。

## 验证与来源

`npm test` 验证机制合同；浏览器入口由 `npm run test:browser` 验证。代码中的来源链接继续保留，[迁移清单](../../docs/migration.zh-Hans.md) 提供原始版本入口。

## 许可证

原创代码为 MIT；第三方内容见[来源声明](../../NOTICE.md)。
