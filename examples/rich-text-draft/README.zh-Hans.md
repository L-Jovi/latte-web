# 用 Draft.js 做富文本（已归档）

[English](README.md) | 简体中文

> 对应英文版：2026-10-01。英文版更新后本页可能滞后。

输入、加粗、保存为 JSON；Draft.js 已于 2023 年被 Meta 归档。[Lexical 版](../rich-text-lexical/README.zh-Hans.md)做的是同样的三步，方便两者对照。

## 试一试

```sh
npm ci
npm run build -w @latte/rich-text-draft
npm run dev
# 打开 http://127.0.0.1:4173/examples/rich-text-draft/dist/?lang=zh
```

输入一句话，选中其中一部分，点击**加粗**：选中的文字变成粗体。点击**保存为 JSON**，保存下来的状态会出现在编辑器下方。粗体文字在里面表现为 `inlineStyleRanges` 中的一项，样式为 `BOLD`。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/examples/rich-text-draft/dist/index.html?lang=zh)。

## 原理

全部代码都在 [src/index.jsx](src/index.jsx)（70 行）里。Draft.js 是一个“受控”编辑器，就像带 `value` 和 `onChange` 的 React `<input>`：

1. 一个 class 组件在自己的 `state` 里保存一个 `EditorState`。它是一个不可变对象，包含文本、选区和撤销历史。
2. `<Editor>` 接收这份状态。每次内容变化，它都会用一个新的 `EditorState` 调用 `onChange`，组件再用 `setState` 把它存起来。
3. **加粗**调用 `RichUtils.toggleInlineStyle(editorState, 'BOLD')`。格式以“哪一段字符带什么样式”的数据形式保存，而不是 HTML 标签。这个按钮会取消自己的 `mousedown`，所以点击它不会把选区从编辑器里抢走。
4. **保存为 JSON** 对当前内容调用 `convertToRaw`，再用 `JSON.stringify` 打印结果。

编辑器状态只属于这一个组件。在原来的 Todo 应用里，它和待办事项一起放在全局的 Redux store 中。

两个编辑器并排对照：

| 任务                 | Draft.js（本目录）                                  | [Lexical](../rich-text-lexical/README.zh-Hans.md)     |
| -------------------- | --------------------------------------------------- | ----------------------------------------------------- |
| 文档保存在哪里       | 在 React state 里，每次变化时编辑器都把新状态交回来 | 在编辑器内部；React 不持有它                          |
| 把选区设为粗体       | `RichUtils.toggleInlineStyle(editorState, 'BOLD')`  | `editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')` |
| 保存                 | `convertToRaw(editorState.getCurrentContent())`     | `editor.getEditorState().toJSON()`                    |
| 粗体在保存的 JSON 里 | `inlineStyleRanges` 中样式为 `BOLD` 的一项          | 文本节点 `format` 数值中代表粗体的那一位（1）         |
| 撤销                 | `EditorState` 自带                                  | 由 `HistoryPlugin` 添加                               |

## 过去与现在

早期的网页编辑器建立在 `contenteditable` 和 `document.execCommand` 之上，后者现已被弃用。Draft.js（Facebook，2016 年）在 React 之上加了一层结构化的编辑器状态。Meta 在 [2023-02-06 归档了 Draft.js](https://github.com/facebookarchive/draft-js)，继任者是 [Lexical](https://lexical.dev/)。截至 2026-09，Lexical、ProseMirror、TipTap 这类编辑器框架会替你处理选区、历史记录和格式。它们都建立在浏览器的 Selection 和 Range API 之上，[可编辑文本里的光标与选区](../../mechanisms/selection/README.zh-Hans.md)直接演示了这两个 API。要做新的编辑器，请从 [Lexical 版](../rich-text-lexical/README.zh-Hans.md)开始。

## 刻意省略

- Draft.js 已经归档。它的 React peer 依赖范围（`>=0.14.0`）接受 React 19，上面这些步骤在这里也有测试，但这并不保证其他功能都能用，也不保证今后还会有人维护。
- 没有 HTML 导入，没有图片或其他媒体，没有协同编辑，也不会保存到服务器。

## 验证与来源

- 构建之后，`npm run test:browser` 在 Chromium、Firefox、WebKit 中输入 `Readable text`、选中它，再点击 **Bold** 和 **Save JSON**。它检查 JSON 里包含这段文字、第一个 block 有一个 `BOLD` 样式区间，并且页面没有报错。
- Draft.js 依赖 fbjs，而 fbjs 的浏览器代码需要 Node.js 的全局名称 `global`。[vite.config.js](vite.config.js) 只在这个目录里把它映射为 `globalThis`，没有修改任何第三方代码。
- Draft.js 要求 Immutable 3.7，这是一个有已知安全问题的旧版本。根目录的 `package.json` 让它改用 Immutable 3.8.4。
- Draft.js（[已在 GitHub 上归档](https://github.com/facebookarchive/draft-js)）保留它自己的许可。原创代码使用 MIT 许可；见 [NOTICE.md](../../NOTICE.md)。
