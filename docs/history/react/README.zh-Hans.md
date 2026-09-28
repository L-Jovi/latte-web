# React 历史架构研究

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

这些中文研究存在于 1be029e 基线；Domain-driven-design.md 最后修改于 2019-11-15（2c6aeb0）。它们记录当时如何划分职责，是历史论述，不是当前性能数据或框架推荐。今天 Fetch 可通过 AbortController 取消；可运行应用也已替换 react-router-redux 和过时生命周期。保留原文与图片，并增加明确的历史说明。

## 运行与预期

在仓库根目录执行 `npm ci`、`npm run build`，然后执行 `npm run dev`。这是阅读材料，不需要安装历史依赖。

## 从哪里读

[notes/Domain-driven-design.md](notes/Domain-driven-design.md), [notes/structure.md](notes/structure.md), [notes/routes.md](notes/routes.md), [notes/optimize-scene.md](notes/optimize-scene.md)。

## 验证

`npm run test:apps` 验证当前组件与渲染器；构建后运行 `npm run test:browser`，在 Chromium、Firefox、WebKit 中验证实际行为。历史文件不执行。上文说明测试范围与刻意简化。

## 来源与许可

原创实现与这些说明使用 MIT，目录内另有许可的除外。[迁移清单](../../../docs/migration.zh-Hans.md) 提供固定原始版本，[NOTICE](../../../NOTICE.md) 记录第三方署名。
