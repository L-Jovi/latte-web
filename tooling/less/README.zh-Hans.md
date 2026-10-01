# Less，以及今天原生 CSS 能做到的

[English](README.md) | 简体中文

> 对应英文版：2026-10-01。英文版更新后本页可能滞后。

Less 的变量、混入和条件守卫；以及为什么原生 CSS 变量能在运行时改变，而 Less 变量不能。Less 是一种 CSS 预处理器：你写的是 `.less` 文件，在浏览器看到之前，由编译器把它们转换成普通的 CSS。

## 试一试

```sh
npm ci
npm run build -w @latte/less
npm run dev
# 打开 http://127.0.0.1:4173/tooling/less/modern.html
```

页面上有一张钢蓝色的卡片。点击 **Change theme**，卡片立刻变成铁锈般的棕色，不需要重新构建：页面在运行时改了一个原生 CSS 变量。也可以直接打开[在线演示](https://latte.jovipro.com/tooling/less/modern.html)。

构建会为每个 `.less` 文件在 `dist/` 里写出一个 CSS 文件，放在同名目录下：比如 [mix/mix.less](mix/mix.less) 会变成 `dist/mix/mix.css`。把两个文件并排打开，就能看出编译器做了什么。

## 原理

[build.mjs](build.mjs)（12 行）找出下一层目录里的所有 `.less` 文件，用 Less 的 Node API `less.render` 编译，再把 CSS 写进 `dist/`。每个目录演示一项功能：

- [base/foo.less](base/foo.less)：一个变量 `@base`、`saturate` 和 `lighten` 这类颜色函数，以及混入（mixin），也就是可以重复使用的一组声明。其中两个 `.box-shadow` 混入带有守卫（guard），即用 `when` 写的条件：一个接收颜色，另一个接收数字。传入 `30%` 会选中接收数字的版本，它再用 `rgba(0, 0, 0, 0.3)` 去调用接收颜色的版本。
- [mix/mix.less](mix/mix.less)：带默认参数的混入。`#header` 用默认值 `5px`，`#footer` 传入 `20px`。
- [arguments/args.less](arguments/args.less)：`@arguments` 一次包含混入的全部参数，所以 `.box-saber(2px, 5px)` 会变成 `box-shadow: 2px 5px 1px #000`。
- [inherit/inherit.less](inherit/inherit.less)：嵌套规则和 `&:hover`，编译后变成 `#header p a:hover` 这样的扁平选择器。
- 有三个目录各自带一份简短说明：[switch](switch/README.zh-Hans.md)（根据参数选择混入）、[avoidcompile](avoidcompile/README.zh-Hans.md)（让文本原样通过）和 [val2string](val2string/README.zh-Hans.md)（在字符串里使用变量）。

[base/gen.js](base/gen.js)（2 行）直接调用同一个 API：`node tooling/less/base/gen.js` 会打印一条 `.box` 规则，其中的 `width: 2px` 是由 `(1px + 1px)` 算出来的。

Less 变量只在编译时存在：`dist/mix/mix.css` 里找不到 `@var_radius` 的影子，只剩下它的值。[modern.html](modern.html)（23 行）用原生 CSS 的自定义属性（custom property）`--accent` 设置颜色，它会保留在浏览器拿到的 CSS 里，并照常参与层叠。所以只要一行 JavaScript，`document.documentElement.style.setProperty('--accent', '#98542d')`，就能在页面加载之后给卡片换颜色。

## 过去与现在

CSS 过去没有变量，也不能嵌套，所以大家用 Less、Sass 这样的预处理器来补上。如今，[自定义属性](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties)已经处处可用，[原生嵌套](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Nesting)从 2023 年起就能在所有主流浏览器中使用，`color-mix()` 这类函数也覆盖了预处理器颜色工具的大部分用途。更完整的经过见[生态是怎样变过来的](../../docs/ecosystem.zh-Hans.md)。

## 刻意省略

- `-webkit-`、`-moz-` 前缀和旧版 Internet Explorer 的 `filter` 值只是作为语法示例保留，现在的浏览器并不需要它们。
- 没有页面使用编译出来的 CSS：要对比 `dist/` 和源文件，得自己打开来读。

## 验证与来源

- `npm run check` 会运行这个构建。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开 `modern.html`，只要出现脚本错误或有文件加载失败就会报错；它不会点击按钮，也不检查编译出来的 CSS。
- [迁移清单](../../docs/migration.zh-Hans.md)链接到最初的版本。
- 这个目录保留自己的 GPL-2.0 许可（[LICENSE](LICENSE)，`package.json` 中声明为 `GPL-2.0-only`），仓库的 MIT 许可不会取代它。见 [NOTICE.md](../../NOTICE.md)。
