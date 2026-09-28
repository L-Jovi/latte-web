# 前沿节流

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

限制调用频率，同时立即响应首个事件。

## 运行与观察

在仓库根执行 `npm ci`、`npm run dev`，打开 `http://127.0.0.1:4173/mechanisms/utilities/throttle/index.html`。

## 阅读机制

从 [simple.js](simple.js) 开始。

连续点击时计数每 500 ms 最多增加一次。它不安排尾部调用，真实拖拽若需要最终位置，应另行处理。

## 新旧方案的联系

单调时钟避免系统时间调整影响；节流和防抖解决不同的交互需求。

## 验证与来源

`npm test` 验证机制合同；浏览器入口由 `npm run test:browser` 验证。代码中的来源链接继续保留，[迁移清单](../../../docs/migration.zh-Hans.md) 提供原始版本入口。

## 许可证

原创代码为 MIT；第三方内容见[来源声明](../../../NOTICE.md)。
