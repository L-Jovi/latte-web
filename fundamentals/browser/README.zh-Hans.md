# 移动元素：改布局还是用 transform

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

分别用 top 和 transform 移动同一个方块，看哪种会让浏览器重新计算布局。在屏幕上，两种移动看起来一模一样；区别要在开发者工具里才看得到。

## 试一试

```sh
npm run dev
# 打开 http://127.0.0.1:4173/fundamentals/browser/render.html
```

不需要安装依赖，也不需要构建：克隆仓库后直接运行 `npm run dev` 即可。点击 **Move with top**：方块向下移动 100 px，再点一次就移回原处。**Move with transform** 的效果相同。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/fundamentals/browser/render.html)。

想看出区别，就打开开发者工具：

- 每次点击后在控制台输入 `box.offsetTop`。点了 **Move with top** 之后它是 `100`；点了 **Move with transform** 之后它仍然是 `0`，尽管方块画在同一个位置。
- 在 **Performance** 面板里开始录制，把同一个按钮点几次，然后停止。**Move with top** 的点击会包含一个 _Layout_（布局）步骤；**Move with transform** 的点击应该没有。

## 原理

浏览器把 HTML 和 CSS 变成像素要经过几步：计算样式，布局（确定每个盒子的大小和位置），绘制，再把绘制好的各个图层合成到屏幕上。修改一个属性时，浏览器会从它影响到的第一步开始重新执行。

- `top` 属于布局。修改它会让方块有一个新的布局位置（`offsetTop` 就反映了这一点），所以浏览器必须先重新布局，才能绘制。
- `transform` 在布局之后才生效。方块的布局位置不变，移动的只是画出来的图像，所以可以跳过布局。如果方块有自己的图层，连绘制都可以跳过，移动在合成阶段完成（[MDN](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Animation_performance_and_frame_rate)）。浏览器会不会给它单独的图层，取决于浏览器和页面。

在 [render.html](render.html)（5 行）里，每个按钮都会先重置另一个属性（把 `transform` 设为 `none`，或把 `top` 设为 `0px`），再切换自己负责的那个属性。

## 过去与现在

这个页面的第一版只在加载一秒后用 `top` 移动一次方块，注释里写着这会引起回流（reflow，也就是布局的另一种叫法）。现在的页面把两种方式并排放在一起。MDN 关于动画性能的指南解释了原因：修改 `left` 这类位置属性，需要重新计算样式、布局和绘制；而对拥有独立图层的元素修改 `transform` 和 `opacity`，只需要重新计算样式（[MDN](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Animation_performance_and_frame_rate)）。

## 刻意省略

- 页面不做任何测量，也不给出任何数字。在这么小的页面上，两个按钮都很快；它也不声称 `transform` 永远没有开销。
- 方块是绝对定位的，所以用 `top` 移动它不会挤开其他内容。

## 验证与来源

- `npm run test:browser` 在 Chromium、Firefox、WebKit 中点击两个按钮，检查每个按钮都会把方块向下移动 100 px，并且再点一次 **Move with transform** 会让它回到原处。它不测量布局或绘制。
- [迁移清单](../../docs/migration.zh-Hans.md)链接到原始版本，位于 `browser` 目录。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../NOTICE.md)。
