# Generator 状态机

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

把 yield 背后保存的程序位置展示出来。

## 运行与观察

在仓库根执行 `npm ci`、`npm run dev`，打开 `http://127.0.0.1:4173/mechanisms/generator/index.html`。

## 阅读机制

从 [forge.js](forge.js), [index.js](index.js), [transform-generator.js](transform-generator.js) 开始。

手写迭代器支持 next 与传入值，不实现 generator 的 throw、return、finally 语义。transformed.html 运行保留的历史 Babel 产物及带署名的 runtime，供对照阅读。

## 新旧方案的联系

当前浏览器可以直接用原生 generator，无需携带这份 runtime；转译后的 switch 仍能解释旧目标如何表达暂停执行。

## 验证与来源

`npm test` 验证机制合同；浏览器入口由 `npm run test:browser` 验证。代码中的来源链接继续保留，[迁移清单](../../docs/migration.zh-Hans.md) 提供原始版本入口。

## 许可证

原创代码为 MIT；第三方内容见[来源声明](../../NOTICE.md)。
