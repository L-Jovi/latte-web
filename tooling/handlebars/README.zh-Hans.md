# 模板编译与 HTML 转义

[English](README.md) | 简体中文

> 对应英文版：2026-10-01。英文版更新后本页可能滞后。

编译 Handlebars 模板，看为什么 `{{value}}` 会转义而 `{{{value}}}` 不会。转义（escaping）把 `<` 这样的字符换成 `&lt;` 这样的编码，这样用户提交的文字就只会显示为文字，而不会变成 HTML。

## 试一试

```sh
npm ci
npm run build -w @latte/handlebars
npm run dev
# 打开 http://127.0.0.1:4173/tooling/handlebars/dist/
```

在标题 **What `{{info}}` printed** 下面，页面显示文字 `<img src=x onerror=alert(1)>`。它只是文字：既没有生成图片，也没有弹出提示框。也可以直接打开[在线演示](https://latte.jovipro.com/tooling/handlebars/dist/index.html)。

## 原理

[index.handlebars](index.handlebars)（3 行）是一个只有一个占位符 `{{info}}` 的模板。[build.mjs](build.mjs)（20 行）往里面填入 `<img src=x onerror=alert(1)>`。如果浏览器把这个字符串当成 HTML，它就会执行代码：图片 `x` 加载失败，`onerror` 处理函数随即调用 `alert(1)`。

构建以两种方式使用这个模板：

1. `Handlebars.compile` 把模板变成一个函数，构建立刻调用它，写出 `dist/index.html`。在这个文件里，`<` 变成了 `&lt;`，`>` 变成了 `&gt;`，`=` 变成了 `&#x3D;`。
2. `Handlebars.precompile` 把同一个模板转换成 JavaScript 源码，保存为 `dist/template.cjs`。这个文件运行时只依赖 `handlebars/runtime`，也就是 Handlebars 中负责运行模板的那部分：压缩后约 29 KB，而带编译器的完整库是 89 KB。

双花括号 `{{info}}` 会转义值；三花括号 `{{{info}}}` 则有意把它当作 HTML 插入。想看区别，可以把模板改成 `{{{info}}}` 再构建一次：页面里就会出现一个真正的、加载失败的 `<img>`，并弹出提示框。

## 过去与现在

最初的版本用 webpack 3 和 `handlebars-loader` 编译模板，再在浏览器里渲染。现在的版本在一个很短的 Node 脚本里编译，讲清转义这件事，这样就够了。

在 React 里，与三花括号对应的是 `dangerouslySetInnerHTML`，也就是插入原始 HTML 的方式。它的[文档](https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html)警告说，除非这段标记来自完全可信的来源，否则这样做很容易引入 XSS（跨站脚本）漏洞。

## 刻意省略

- 转义让文字可以安全地作为 HTML 显示，但它不能通用地清理 URL 或 JavaScript：[Handlebars 指南](https://handlebarsjs.com/guide/#html-escaping)提醒，它不会转义 JavaScript 字符串，比如内联事件处理函数里的内容。
- 模板本身就是代码。永远不要编译用户写的模板；转义只保护你传进去的值。
- `dist/template.cjs` 只有一个在 Node 里运行的测试会加载，没有页面用到它。

## 验证与来源

- `npm run test:browser` 在 Chromium、Firefox、WebKit 中打开页面，检查页面里没有 `<img>`，并且测试字符串以文字形式显示。另有一个测试只要出现脚本错误或有文件加载失败就会报错。
- `npm run test:tooling` 用另一个输入 `<img onerror="bad()">` 运行 `dist/template.cjs`，检查输出里有 `&lt;img`、没有 `<img`，和编译出来的页面一样。`npm run check` 会先构建，再运行这个测试。
- [迁移清单](../../docs/migration.zh-Hans.md)链接到最初的版本。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../NOTICE.md)。
