# Draft.js 受控编辑

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

输入文字、选择文字，点击 Bold 与 Save JSON。class 持有 EditorState，并把每次 onChange 结果传回 Editor；格式操作修改内容元数据，保存使用 convertToRaw。保留原来的受控编辑机制，同时让编辑器局部拥有状态，不把其内部对象放入 Todo 全局 store。Draft.js 已归档；它的宽泛 React peer 范围允许 React 19，这里只验证具体场景，不代表完整兼容或维护承诺。根 overrides 采用上游 Immutable 3.8.4，修复旧传递依赖的漏洞。没有实现 HTML 导入、媒体、协同或服务端存储。新编辑器可比较 [Lexical](../rich-text-lexical/README.zh-Hans.md)。[上游仓库](https://github.com/facebookarchive/draft-js)。

## 运行与预期

在仓库根目录执行 `npm ci`、`npm run build -w @latte/rich-text-draft`，然后执行 `npm run dev`。打开 `http://127.0.0.1:4173/examples/rich-text-draft/dist/index.html`。

## 从哪里读

[src/index.jsx](src/index.jsx)。

## 验证

`npm run test:apps` 验证当前组件与渲染器；构建后运行 `npm run test:browser`，在 Chromium、Firefox、WebKit 中验证实际行为。历史文件不执行。上文说明测试范围与刻意简化。

## 来源与许可

原创实现与这些说明使用 MIT，目录内另有许可的除外。[迁移清单](../../docs/migration.zh-Hans.md) 提供固定原始版本，[NOTICE](../../NOTICE.md) 记录第三方署名。

这个工作区的 Vite 配置把旧 fbjs 所需的 `global` 名称映射到 `globalThis`。这是 Draft 专用的构建兼容配置，不修改第三方源码。
