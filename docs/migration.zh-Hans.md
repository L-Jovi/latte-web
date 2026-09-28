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
| [graphql](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/graphql) | pending | [graphql](../graphql) | 按计划在后续批次迁移。 | — |
| [network](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/network) | pending | [network](../network) | 按计划在后续批次迁移。 | — |
| [performance](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/performance) | pending | [performance](../performance) | 按计划在后续批次迁移。 | — |
| [storage](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/storage) | pending | [storage](../storage) | 按计划在后续批次迁移。 | — |
| [vision-samples](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/vision-samples) | pending | [vision-samples](../vision-samples) | 按计划在后续批次迁移。 | — |
| [wasm](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/wasm) | pending | [wasm](../wasm) | 按计划在后续批次迁移。 | — |
| [README.md](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/README.md) | rewrite | [README.md](../README.md) | 替换过时的仓库入口和配置。 | 1 |
| [SECURITY.md](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/SECURITY.md) | rewrite | [SECURITY.md](../SECURITY.md) | 替换过时的仓库入口和配置。 | 1 |
| [.gitignore](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/.gitignore) | rewrite | [.gitignore](../.gitignore) | 替换过时的仓库入口和配置。 | 1 |
| [.tern-project](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/.tern-project) | retire | — | 替换过时的仓库入口和配置。 | 1 |
| [event/node-task/task-order.js](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/event/node-task/task-order.js) | retain | [fundamentals/events/node-task/task-order.cjs](../fundamentals/events/node-task/task-order.cjs) | 明确保留 CommonJS 的任务队列顺序。 | 1 |
| [build](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/build) | merge | [tooling/webpack](../tooling/webpack) | 构建专题拆分到 Webpack、Grunt 与两种手写打包器。 | 2 |
| [build/grunt](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/build/grunt) | retain | [tooling/grunt](../tooling/grunt) | 保留声明式复制与清理任务及 ISC 许可。 | 2 |
| [build/webpack](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/build/webpack) | retain | [tooling/webpack](../tooling/webpack) | 所有不同 Webpack 专题保留，更新资源模块与开发服务器 API。 | 2 |
| [build/webpack/scratches/webpack-scratch](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/build/webpack/scratches/webpack-scratch) | retain | [mechanisms/bundlers/procedural](../mechanisms/bundlers/procedural) | 保留过程式解析、依赖图、输出流程，修复遍历与缓存。 | 2 |
| [build/webpack/scratches/webpack-forge](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/build/webpack/scratches/webpack-forge) | retain | [mechanisms/bundlers/layered](../mechanisms/bundlers/layered) | 保留解析器与编译器分层，修复递归依赖解析。 | 2 |
| [build/webpack/scratches/webpack-plugin-loader-forge](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/build/webpack/scratches/webpack-plugin-loader-forge) | retain | [tooling/webpack/plugins](../tooling/webpack/plugins) | 用 processAssets 生命周期生成文件清单。 | 2 |
| [build/webpack/scratches/analize-webpack](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/build/webpack/scratches/analize-webpack) | merge | [tooling/webpack/plugins](../tooling/webpack/plugins) | 未完成的 hooks 草稿并入插件生命周期说明。 | 2 |
| [style/less](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/style/less) | retain | [tooling/less](../tooling/less) | 保留变量、混入、条件与转义知识及 GPL-2.0。 | 2 |
| [template/handlebars](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/template/handlebars) | retain | [tooling/handlebars](../tooling/handlebars) | 保留模板编译及预编译，明确输入转义边界。 | 2 |
| [typescript](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/typescript) | merge | [fundamentals/typescript](../fundamentals/typescript) | 提取类型化 actions/reducers，退役重复 CRA 底座。 | 2 |
| [typescript/gulp-ts-sample](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/typescript/gulp-ts-sample) | retain | [tooling/gulp-typescript](../tooling/gulp-typescript) | 保留任务编排，用 TypeScript 原生编译器构建。 | 2 |
| [typescript/webpack-react-sample](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/typescript/webpack-react-sample) | retain | [tooling/webpack-typescript](../tooling/webpack-typescript) | 保留 class 组件类型，区分类型检查与转译。 | 2 |
| [components](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/components) | merge | [examples/components](../examples/components) | Hello 外壳合入 Card/Button 小型组件库与三种打包对照。 | 2 |
| [react/cra/react-library](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/react/cra/react-library) | merge | [examples/components](../examples/components) | 提取 Card 与 CSS，退役 CRA 外壳。 | 2 |
| [react/scratches/react-library-scratch](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/react/scratches/react-library-scratch) | merge | [examples/components](../examples/components) | 保留 Button，合并 Storybook 与 Webpack 底座。 | 2 |
| [react/scratches/react-library](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/react/scratches/react-library) | merge | [examples/components](../examples/components) | 移除重复组件库、CRA 及自动生成的 Storybook 示例。 | 2 |
| [react](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/react) | merge | [examples/react-classic](../examples/react-classic) | 保留经典组织方式，增加同场景现代实现，提取手写机制。 | 3 |
| [react/react-practice](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/react/react-practice) | retain | [examples/react-classic](../examples/react-classic) | 在 React 19 上修复 Todo 编辑、异步导入与路由，保留 class/connect、Immutable、Saga。 | 3 |
| [react/react-practice/docs](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/react/react-practice/docs) | historical | [docs/history/react](../docs/history/react) | 保存有日期的架构研究，另行链接当前实现。 | 3 |
| [react/react-practice/docs/create-react-app.md](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/react/react-practice/docs/create-react-app.md) | retire | — | 重复的官方 CRA 长文改为官方迁移说明链接。 | 3 |
| [react/cra/react-practice](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/react/cra/react-practice) | merge | [examples/react-modern](../examples/react-modern) | 将类型化路由概念合入现代 Todo 应用，合并生成的 Storybook 外壳。 | 3 |
| [react/scratches/react-project-scratch](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/react/scratches/react-project-scratch) | merge | [examples/react-classic](../examples/react-classic) | 异步计数与路由外壳合入完整的经典 Todo/Saga 场景。 | 3 |
| [react/scratches/react-scratch](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/react/scratches/react-scratch) | retain | [mechanisms/mini-react](../mechanisms/mini-react) | 保留元素、组件与渲染分层，用实例局部更新替代共享全局状态。 | 3 |
| [react/scratches/router-scratch](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/react/scratches/router-scratch) | retain | [mechanisms/router](../mechanisms/router) | 保留 Context、class 与 History API，修复监听引用与卸载清理。 | 3 |
| [react/scratches/redux-scratch](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/react/scratches/redux-scratch) | retain | [mechanisms/compose](../mechanisms/compose) | 明确实际教学内容是 compose，补齐零函数与参数传递。 | 3 |
| [rich-text](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/rich-text) | retain | [mechanisms/selection](../mechanisms/selection) | 保留 Selection/Range 插入与高亮重建，用文本节点恢复光标。 | 3 |
| [test](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/test) | historical | [docs/history/testing](../docs/history/testing) | 保存有署名的 Enzyme/TestUtils 代表用例，当前行为测试使用 Testing Library 与浏览器。 | 3 |
| [react/react-practice/src/views/RichDiv](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/react/react-practice/src/views/RichDiv) | merge | [examples/rich-text-draft](../examples/rich-text-draft) | 把受控 EditorState 机制提取到独立的 Draft/Lexical 对照。 | 3 |
| [react/react-practice/src/modules/actions/richDiv.js](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/react/react-practice/src/modules/actions/richDiv.js) | merge | [examples/rich-text-draft](../examples/rich-text-draft) | 把受控 EditorState 机制提取到独立的 Draft/Lexical 对照。 | 3 |
| [react/react-practice/src/modules/reducers/richDiv.js](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/react/react-practice/src/modules/reducers/richDiv.js) | merge | [examples/rich-text-draft](../examples/rich-text-draft) | 把受控 EditorState 机制提取到独立的 Draft/Lexical 对照。 | 3 |
