# Migration ledger

English | [简体中文](migration.zh-Hans.md)

Baseline: [ef3fa2a](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/) — 805 tracked files, 20 topic roots, 24 Node packages.

The most specific path rule wins; directory rules include source, assets and configuration. Retired content is recoverable at the fixed commit. `pending` awaits migration; `retain` preserves a mechanism; `merge` extracts into another example; `rewrite` updates the entry or runtime; `historical` is reading only; `retire` removes content from the current tree. Destination READMEs describe purpose and verification.

| Original (history) | Decision | Destination | Rationale | Batch |
| --- | --- | --- | --- | --- |
| [syntax](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/syntax) | retain | [fundamentals/javascript](../fundamentals/javascript) | Preserve the teaching mechanism; repair correctness and document its limits. | 1 |
| [es-feature/class](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/es-feature/class) | retain | [fundamentals/javascript/classes](../fundamentals/javascript/classes) | Preserve the teaching mechanism; repair correctness and document its limits. | 1 |
| [es-feature/async+await](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/es-feature/async+await) | retain | [fundamentals/javascript/async-await](../fundamentals/javascript/async-await) | Preserve the teaching mechanism; repair correctness and document its limits. | 1 |
| [es-feature/generator](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/es-feature/generator) | retain | [mechanisms/generator](../mechanisms/generator) | Preserve the teaching mechanism; repair correctness and document its limits. | 1 |
| [es-feature/promise](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/es-feature/promise) | retain | [mechanisms/promise](../mechanisms/promise) | Preserve the teaching mechanism; repair correctness and document its limits. | 1 |
| [design-mode](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/design-mode) | retain | [mechanisms/design-patterns](../mechanisms/design-patterns) | Preserve the teaching mechanism; repair correctness and document its limits. | 1 |
| [event](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/event) | retain | [fundamentals/events](../fundamentals/events) | Preserve the teaching mechanism; repair correctness and document its limits. | 1 |
| [toolkit](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/toolkit) | retain | [mechanisms/utilities](../mechanisms/utilities) | Preserve the teaching mechanism; repair correctness and document its limits. | 1 |
| [browser](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/browser) | retain | [fundamentals/browser](../fundamentals/browser) | Preserve the teaching mechanism; repair correctness and document its limits. | 1 |
| [style/layout](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/style/layout) | retain | [fundamentals/css](../fundamentals/css) | Preserve the teaching mechanism; repair correctness and document its limits. | 1 |
| [template/html](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/template/html) | retain | [fundamentals/html](../fundamentals/html) | Preserve the teaching mechanism; repair correctness and document its limits. | 1 |
| [build](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/build) | pending | [build](../build) | Scheduled for a later migration batch. | — |
| [components](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/components) | pending | [components](../components) | Scheduled for a later migration batch. | — |
| [graphql](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/graphql) | pending | [graphql](../graphql) | Scheduled for a later migration batch. | — |
| [network](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/network) | pending | [network](../network) | Scheduled for a later migration batch. | — |
| [performance](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/performance) | pending | [performance](../performance) | Scheduled for a later migration batch. | — |
| [react](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/react) | pending | [react](../react) | Scheduled for a later migration batch. | — |
| [rich-text](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/rich-text) | pending | [rich-text](../rich-text) | Scheduled for a later migration batch. | — |
| [storage](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/storage) | pending | [storage](../storage) | Scheduled for a later migration batch. | — |
| [style/less](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/style/less) | pending | [style/less](../style/less) | Scheduled for a later migration batch. | — |
| [template/handlebars](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/template/handlebars) | pending | [template/handlebars](../template/handlebars) | Scheduled for a later migration batch. | — |
| [test](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/test) | pending | [test](../test) | Scheduled for a later migration batch. | — |
| [typescript](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/typescript) | pending | [typescript](../typescript) | Scheduled for a later migration batch. | — |
| [vision-samples](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/vision-samples) | pending | [vision-samples](../vision-samples) | Scheduled for a later migration batch. | — |
| [wasm](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/wasm) | pending | [wasm](../wasm) | Scheduled for a later migration batch. | — |
| [README.md](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/README.md) | rewrite | [README.md](../README.md) | Replace obsolete repository scaffolding. | 1 |
| [SECURITY.md](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/SECURITY.md) | rewrite | [SECURITY.md](../SECURITY.md) | Replace obsolete repository scaffolding. | 1 |
| [.gitignore](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/.gitignore) | rewrite | [.gitignore](../.gitignore) | Replace obsolete repository scaffolding. | 1 |
| [.tern-project](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/.tern-project) | retire | — | Replace obsolete repository scaffolding. | 1 |
| [event/node-task/task-order.js](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/event/node-task/task-order.js) | retain | [fundamentals/events/node-task/task-order.cjs](../fundamentals/events/node-task/task-order.cjs) | Keep CommonJS queue ordering explicit on an ESM repository. | 1 |
