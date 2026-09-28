# Lexical 状态与插件

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

执行与 Draft 相同的输入 → 选择 → Bold → Save JSON 场景。LexicalComposer 建立编辑器，RichTextPlugin 呈现可编辑内容，HistoryPlugin 管理撤销，工具栏发送格式命令。需要保存时从编辑器读取 JSON，不把 JSON 持续回填成 React 受控状态。保存格式属于 Lexical，不能直接作为 Draft 数据读取，转换需要迁移。这个小示例没有文档存储或协同功能。[官方 React 指南](https://lexical.dev/docs/getting-started/react)。

## 运行与预期

在仓库根目录执行 `npm ci`、`npm run build -w @latte/rich-text-lexical`，然后执行 `npm run dev`。打开 `http://127.0.0.1:4173/examples/rich-text-lexical/dist/index.html`。

## 从哪里读

[src/index.jsx](src/index.jsx)。

## 验证

`npm run test:apps` 验证当前组件与渲染器；构建后运行 `npm run test:browser`，在 Chromium、Firefox、WebKit 中验证实际行为。历史文件不执行。上文说明测试范围与刻意简化。

## 来源与许可

原创实现与这些说明使用 MIT，目录内另有许可的除外。[迁移清单](../../docs/migration.zh-Hans.md) 提供固定原始版本，[NOTICE](../../NOTICE.md) 记录第三方署名。
