# 用 Lexical 做富文本

[English](README.md) | 简体中文

> 对应英文版：2026-10-01。英文版更新后本页可能滞后。

同样的输入、加粗、保存流程，换成 Draft.js 的继任者。[Draft.js 版本](../rich-text-draft/README.zh-Hans.md)走的是同样三步，可以对照着看。

## 试一试

```sh
npm ci
npm run build -w @latte/rich-text-lexical
npm run dev
# 打开 http://127.0.0.1:4173/examples/rich-text-lexical/dist/
```

输入一句话，选中其中一部分，点击 **Bold**：选中的文字变成粗体。点击 **Save JSON**，保存下来的状态会出现在按钮和编辑器之间。粗体文字在里面表现为一个 `format` 为 `1` 的文本节点。也可以直接打开[在线演示](https://latte.jovipro.com/examples/rich-text-lexical/dist/index.html)。

## 原理

全部代码都在 [src/index.jsx](src/index.jsx)（62 行）里。Lexical 把文档保存在编辑器内部。React 负责画出编辑器周围的页面，但不持有文字内容；这一点和受控的 Draft.js 编辑器不同，后者每次改动都要把新状态交回给 React。

1. `LexicalComposer` 根据 `initialConfig` 创建编辑器：一个 `namespace`；一个 `theme`，给粗体文字加上 CSS 类名 `bold`；还有一个 `onError`，把错误重新抛出，而不是悄悄吞掉。
2. `RichTextPlugin` 渲染可编辑区域（`ContentEditable`），并加入富文本编辑功能，其中包括格式命令。`HistoryPlugin` 加入撤销和重做，所以 Ctrl+Z 或 Cmd+Z 可以用。
3. 工具栏通过 `useLexicalComposerContext` 拿到编辑器。**Bold** 发送一条“命令”：带 `'bold'` 参数的 `FORMAT_TEXT_COMMAND`，由富文本插件把它应用到选区上。这个按钮会取消自己的 `mousedown`，所以点击它不会让编辑器失去选区。
4. **Save JSON** 只在点击时读取状态：`editor.getEditorState().toJSON()`，再用 `JSON.stringify` 打印出来。JSON 不会在每次改动时都复制进 React 状态。

在保存的 JSON 里，每个文本节点把自己的样式存在一个数字 `format` 中，每种样式占一位。粗体是值为 1 的那一位，所以粗体节点带有 `"format": 1`。

两个编辑器对照：

| 工作                   | Lexical（本目录）                                     | [Draft.js](../rich-text-draft/README.zh-Hans.md)   |
| ---------------------- | ----------------------------------------------------- | -------------------------------------------------- |
| 文档放在哪里           | 编辑器内部，React 不持有                              | React 状态里，每次改动都交回来                     |
| 把选区设为粗体         | `editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')` | `RichUtils.toggleInlineStyle(editorState, 'BOLD')` |
| 保存                   | `editor.getEditorState().toJSON()`                    | `convertToRaw(editorState.getCurrentContent())`    |
| 保存后的 JSON 里的粗体 | 文本节点 `format` 数字里表示粗体的那一位（1）         | `inlineStyleRanges` 里一条样式为 `BOLD` 的记录     |
| 撤销                   | 由 `HistoryPlugin` 加入                               | `EditorState` 自带                                 |

## 过去与现在

早期的网页编辑器建立在 `contenteditable` 和 `document.execCommand` 之上，后者现已被弃用。Draft.js（Facebook，2016 年）在 React 之上加了一层结构化的编辑器状态。Meta 在 [2023-02-06 归档了 Draft.js](https://github.com/facebookarchive/draft-js)，继任者是 [Lexical](https://lexical.dev/)。截至 2026-09，Lexical、ProseMirror、TipTap 这类编辑器框架会替你处理选区、历史记录和格式。它们都建立在浏览器的 Selection 和 Range API 之上，[可编辑文本里的光标与选区](../../mechanisms/selection/README.zh-Hans.md)直接演示了这些 API。

Lexical 自己也在变。截至 2026-09，它的文档把 `LexicalComposer` 称为旧写法（legacy），并建议改用 `LexicalExtensionComposer`，用“扩展”（extension）而不是插件来搭建编辑器（[React 插件](https://lexical.dev/docs/react/plugins)、[React 入门](https://lexical.dev/docs/getting-started/react)）。这里安装的 0.51.0 版把 `LexicalComposer` 标为弃用，并说明预计会在未来某个主版本中移除。这个示例仍在使用它。

## 刻意省略

- 保存的 JSON 是 Lexical 自己的格式，Draft.js 不经转换就读不了。
- 不保存文档，也不能把保存的文档重新载入，没有协同编辑。
- 用的是 Lexical 如今称为旧写法的插件组件（`LexicalComposer`、`RichTextPlugin`、`HistoryPlugin`），而不是新的扩展。

## 验证与来源

- 构建之后，`npm run test:browser` 在 Chromium、Firefox、WebKit 中输入 `Readable text`，全选，再点击 **Bold** 和 **Save JSON**。它检查 JSON 里包含这段文字、第一个文本节点的 `format` 设置了粗体位，并且页面没有报错。同一个测试也会在 [Draft.js 版本](../rich-text-draft/README.zh-Hans.md)上运行。
- Lexical 版本是新写的。与它对照的 Draft.js 编辑器来自原来那个 2018 年的 Todo 应用；[迁移清单](../../docs/migration.zh-Hans.md)里有那段代码的链接。
- Lexical 和其他安装的依赖包一样，保留各自的许可。原创代码使用 MIT 许可；见 [NOTICE.md](../../NOTICE.md)。
