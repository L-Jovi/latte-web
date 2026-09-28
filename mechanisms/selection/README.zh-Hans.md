# Selection、Range 与光标恢复

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

第一页在焦点离开编辑区前保存 Range，随后替换选区或在光标处插入文本，失效选区回退到末尾。第二页构造文本与 mark 节点高亮 #标签#，使用 UTF-16 偏移恢复 anchor/focus，输入法组合期间暂缓重建。这些是单段纯文本机制，不是完整编辑器：块结构、撤销、富文本粘贴和协同编辑需要内容模型。自动测试覆盖插入与字面标记文本，真实输入法组合仍需手工验证。进一步比较受控的 Draft EditorState 与 Lexical 编辑器/插件模型。

## 运行与预期

在仓库根目录执行 `npm ci`、`npm run build`，然后执行 `npm run dev`。打开 `http://127.0.0.1:4173/mechanisms/selection/index.html`。

## 从哪里读

[cursor.js](cursor.js), [highlight.js](highlight.js), [ec-richtext.html](ec-richtext.html)。

## 验证

`npm run test:apps` 验证当前组件与渲染器；构建后运行 `npm run test:browser`，在 Chromium、Firefox、WebKit 中验证实际行为。历史文件不执行。上文说明测试范围与刻意简化。

## 来源与许可

原创实现与这些说明使用 MIT，目录内另有许可的除外。[迁移清单](../../docs/migration.zh-Hans.md) 提供固定原始版本，[NOTICE](../../NOTICE.md) 记录第三方署名。
