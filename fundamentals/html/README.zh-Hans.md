# 语义化 HTML

[English](README.md) | 简体中文

> 对应英文版：2026-09-30。英文版更新后本页可能滞后。

用有含义的标签搭页面，而不是一堆没有含义的盒子。每个标签都说明了页面这一部分是做什么的，比如导航、文章或旁注，而不是把所有内容都塞进 `<div>`。

## 试一试

```sh
npm run dev
# 打开 http://127.0.0.1:4173/fundamentals/html/semantic.html
```

不需要安装依赖，也不需要构建：克隆仓库后直接运行 `npm run dev` 即可。页面没有自己的样式，只用了全站共用的样式表来设定字体、颜色和间距：一个大标题、两个链接、一篇文章，以及一段关于这本笔记的简短说明。两个链接分别跳到文章和那段说明，地址随之以 `#entry` 或 `#author` 结尾。打开开发者工具的 Elements（元素）面板，就能看到背后的结构。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/fundamentals/html/semantic.html)。

## 原理

[semantic.html](semantic.html)（8 行）是一本虚构的野外笔记。每个元素都说明了自己的用途：

- `<header>` 放页面标题（一个 `<h1>`）和一行介绍。
- `<nav>` 放在页面内跳转的链接。它的 `aria-label="Notebook"` 给这组导航起了一个名字，供屏幕阅读器使用。
- `<main>` 放页面的主要内容。
- `<article>` 是一段可以独立成立的内容，比如一篇博客文章。它里面用 `<section>` 归拢一个主题，用 `<footer>` 给出发布日期。
- `<time datetime="2026-09-28">` 给人看的是“28 September 2026”，同时用固定的格式把同一个日期提供给程序。
- `<aside>` 放相关内容，这里是那段关于笔记的说明。
- 最后一个 `<footer>` 作为整个页面的结尾。

标题每次只往下降一级：页面用 `<h1>`，文章和说明用 `<h2>`，文章里的小节用 `<h3>`。使用屏幕阅读器的人常常从一个标题跳到下一个标题来了解页面；如果跳过了某一级，他们会纳闷缺掉的那个标题去了哪里（[MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements)）。

## 过去与现在

这个页面的原始版本写于 2021 年，里面有四个 `<h1>`：页头一个，两篇文章的开头各一个，还有一个在 `aside` 里。旧版 HTML 标准允许在每个嵌套的区块里重新使用 `<h1>`。如今这种写法已经不符合标准，MDN 建议每个页面只用一个 `<h1>`，标题级别按顺序排列（[MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/Heading_Elements)）。现在的页面只有一个 `<h1>`。

同样的道理不只适用于标题：原生元素本身就带着含义和行为。`<button>` 可以用键盘操作，也会告诉屏幕阅读器“这是一个按钮”。一个被样式打扮成按钮的 `<div>` 两样都做不到，除非你自己把这些全部补上。

## 刻意省略

- 这个页面只展示结构，不是一次完整的无障碍评估。
- 页面没有自己的样式，也没有表单和图片，所以不涉及颜色对比度、表单标签和替代文本这类问题。

## 验证与来源

- `npm run test:browser` 在 Chromium、Firefox、WebKit 中打开这个页面，检查它能正常加载、没有报错。没有测试检查页面结构或标题。
- 笔记里的文字是虚构的。[迁移清单](../../docs/migration.zh-Hans.md)链接到原始版本，位于 `template/html` 目录。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../NOTICE.md)。
