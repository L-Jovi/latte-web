# 迁移清单

[English](migration.md) | 简体中文

基线: [ef3fa2a](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/) — 805 tracked files, 20 topic roots, 24 Node packages.

最具体的路径规则优先；目录规则覆盖其中所有源文件、资源和配置。退役内容可从固定提交恢复。`pending` 尚未迁移；`retain` 保留教学机制；`merge` 提取并合并；`rewrite` 更新底座或入口；`historical` 仅保留历史阅读；`retire` 从当前树移除。新入口 README 记录教学目的和验证命令。

| 原入口（历史） | 处理 | 新入口 | 理由 | 批次 |
| --- | --- | --- | --- | --- |
| [syntax](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/syntax) | retain | [fundamentals/javascript](../fundamentals/javascript) | 保留机制理解，修正正确性并说明边界。 | 1 |
| [es-feature/class](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/es-feature/class) | retain | [fundamentals/javascript/classes](../fundamentals/javascript/classes) | 保留机制理解，修正正确性并说明边界。 | 1 |
| [es-feature/async+await](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/es-feature/async+await) | retain | [fundamentals/javascript/async-await](../fundamentals/javascript/async-await) | 保留机制理解，修正正确性并说明边界。 | 1 |
| [es-feature/generator](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/es-feature/generator) | retain | [mechanisms/generator](../mechanisms/generator) | 保留机制理解，修正正确性并说明边界。 | 1 |
| [es-feature/promise](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/es-feature/promise) | retain | [mechanisms/promise](../mechanisms/promise) | 保留机制理解，修正正确性并说明边界。 | 1 |
| [design-mode](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/design-mode) | retain | [mechanisms/design-patterns](../mechanisms/design-patterns) | 保留机制理解，修正正确性并说明边界。 | 1 |
| [event](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/event) | retain | [fundamentals/events](../fundamentals/events) | 保留机制理解，修正正确性并说明边界。 | 1 |
| [toolkit](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/toolkit) | retain | [mechanisms/utilities](../mechanisms/utilities) | 保留机制理解，修正正确性并说明边界。 | 1 |
| [browser](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/browser) | retain | [fundamentals/browser](../fundamentals/browser) | 保留机制理解，修正正确性并说明边界。 | 1 |
| [style/layout](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/style/layout) | retain | [fundamentals/css](../fundamentals/css) | 保留机制理解，修正正确性并说明边界。 | 1 |
| [template/html](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/template/html) | retain | [fundamentals/html](../fundamentals/html) | 保留机制理解，修正正确性并说明边界。 | 1 |
| [build](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/build) | pending | [build](../build) | 按计划在后续批次迁移。 | — |
| [components](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/components) | pending | [components](../components) | 按计划在后续批次迁移。 | — |
| [graphql](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/graphql) | pending | [graphql](../graphql) | 按计划在后续批次迁移。 | — |
| [network](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/network) | pending | [network](../network) | 按计划在后续批次迁移。 | — |
| [performance](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/performance) | pending | [performance](../performance) | 按计划在后续批次迁移。 | — |
| [react](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/react) | pending | [react](../react) | 按计划在后续批次迁移。 | — |
| [rich-text](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/rich-text) | pending | [rich-text](../rich-text) | 按计划在后续批次迁移。 | — |
| [storage](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/storage) | pending | [storage](../storage) | 按计划在后续批次迁移。 | — |
| [style/less](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/style/less) | pending | [style/less](../style/less) | 按计划在后续批次迁移。 | — |
| [template/handlebars](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/template/handlebars) | pending | [template/handlebars](../template/handlebars) | 按计划在后续批次迁移。 | — |
| [test](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/test) | pending | [test](../test) | 按计划在后续批次迁移。 | — |
| [typescript](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/typescript) | pending | [typescript](../typescript) | 按计划在后续批次迁移。 | — |
| [vision-samples](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/vision-samples) | pending | [vision-samples](../vision-samples) | 按计划在后续批次迁移。 | — |
| [wasm](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/wasm) | pending | [wasm](../wasm) | 按计划在后续批次迁移。 | — |
| [README.md](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/README.md) | rewrite | [README.md](../README.md) | 替换过时的仓库入口和配置。 | 1 |
| [SECURITY.md](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/SECURITY.md) | rewrite | [SECURITY.md](../SECURITY.md) | 替换过时的仓库入口和配置。 | 1 |
| [.gitignore](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/.gitignore) | rewrite | [.gitignore](../.gitignore) | 替换过时的仓库入口和配置。 | 1 |
| [.tern-project](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/.tern-project) | retire | — | 替换过时的仓库入口和配置。 | 1 |
| [event/node-task/task-order.js](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/event/node-task/task-order.js) | retain | [fundamentals/events/node-task/task-order.cjs](../fundamentals/events/node-task/task-order.cjs) | 明确保留 CommonJS 的任务队列顺序。 | 1 |
