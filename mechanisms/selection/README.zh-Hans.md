# 可编辑文本里的光标与选区

[English](README.md) | 简体中文

> 对应英文版：2026-10-01。英文版更新后本页可能滞后。

在失去焦点前保存光标，在光标处插入文字，重新渲染后再恢复光标。两个小页面直接使用浏览器的 Selection 和 Range API，不借助任何编辑器库。

## 试一试

```sh
npm run dev
# 打开 http://127.0.0.1:4173/mechanisms/selection/
```

在 **Hello world** 里点一下，比如点在 `Hello` 后面，然后点击 **Insert at saved cursor**。文本框里的 ✨ 会出现在刚才光标所在的位置，光标则停在它后面，可以接着打字。如果先选中一段文字，这段文字会被替换。如果从来没有把光标放进编辑区，文字会加在末尾。

接着打开 `http://127.0.0.1:4173/mechanisms/selection/ec-richtext.html`，输入 `A #tag# B`。一边输入，`#tag#` 就会被高亮，光标也始终停在原来的位置。

不需要安装依赖，也不需要构建：克隆仓库后直接运行 `npm run dev` 即可。也可以直接打开[光标页面](https://latte.jovipro.com/mechanisms/selection/index.html)和[高亮页面](https://latte.jovipro.com/mechanisms/selection/ec-richtext.html)的在线演示。

## 原理

选区（selection）就是用户选中的文字；什么都没选中时，它收缩成一个点，也就是闪烁的光标。浏览器用 Range 来描述它：一个起点和一个终点，每个点都用“某个节点 + 节点内的偏移量”来表示。

[cursor.js](cursor.js)（38 行）：点击按钮会让焦点离开编辑区，光标也就跟着丢了。所以每当你在编辑区里点击、打字或做了修改，脚本都会用 `cloneRange()` 把当前的 Range 复制一份存起来。点击按钮时，它先把焦点放回编辑区，删掉保存的 Range 覆盖的内容，在那里插入一个新的文本节点，再把光标移到它后面。如果没有保存过 Range，或者保存的 Range 已经不在编辑区里，就改用编辑区的末尾。

[highlight.js](highlight.js)（50 行）由 [ec-richtext.html](ec-richtext.html) 使用：每次输入之后，它用文本节点重建编辑区的内容，并把每个 `#tag#`（两个 `#` 之间有 1 到 6 个字符）包进一个 `<mark>` 元素。替换节点会破坏选区，因为选区指向的节点已经不存在了。所以在重建之前，脚本先把选区的两端，也就是 anchor（选择开始的地方）和 focus（选择结束的地方），换算成从文本开头算起的字符数；重建之后，再逐个走过新的文本节点，找回同样的位置。字符数按 UTF-16 码元计算，和 Range 的偏移量、JavaScript 字符串的长度用的是同一种单位。

新内容完全由文本节点构成，从不经过 HTML 字符串，所以输入 `<img>` 显示的就是这五个字符，而不会生成一张图片。输入法还在组字时（比如用拼音输入中文），脚本会先等着，直到组字结束才重建。

## 过去与现在

以前，编辑器直接建立在 `contenteditable` 和 [`document.execCommand`](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand) 之上，而后者现在已被废弃。Facebook 推出的 Draft.js 在 React 之上加了一层结构化的编辑器状态；Meta 已在 [2023-02-06 将它归档](https://github.com/facebookarchive/draft-js)，它的继任者是 [Lexical](https://lexical.dev/)。如今 Lexical、ProseMirror、TipTap 等编辑器框架会替你处理选区、历史记录和格式，但它们底层依靠的仍然是这里演示的 Selection 和 Range API。

有两个例子用框架完成了同样的任务。[Draft.js](../../examples/rich-text-draft/README.zh-Hans.md) 使用“受控”的 `EditorState`：由你的组件保存它，每次变化后再传回去。[Lexical](../../examples/rich-text-lexical/README.zh-Hans.md) 则把状态放在一个编辑器对象里，通过插件添加功能。

## 刻意省略

- 只支持单个段落的纯文本。块级结构、撤销、粘贴富文本 HTML 和多人协同编辑，都需要一个有自己内容模型的编辑器。
- 输入法输入没有自动化测试，请用你自己的输入法试一试。

## 验证与来源

- `npm run test:browser` 在 Chromium、Firefox、WebKit 中运行两项检查。在光标页面上，它把光标放在 `Hello` 后面，插入 ✨，预期得到 `Hello✨ world`；接着输入 `!`，得到 `Hello✨! world`，说明光标确实落在了插入的文字后面。在高亮页面上，它输入 `A #tag# B`，预期 `#tag#` 位于 `<mark>` 中。接着把光标放在 `A ` 后面，输入 `xy`：每输入一个字母编辑器都会重建一次，得到 `A xy#tag# B`，说明两次输入之间光标被正确恢复了。最后输入 `<img>`，预期页面上出现这段文字，而没有图片元素。
- [迁移清单](../../docs/migration.zh-Hans.md)链接到最初的版本，也就是 `rich-text` 目录。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../NOTICE.md)。
