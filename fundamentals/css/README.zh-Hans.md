# CSS 布局：BFC、Grid 与居中

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

块格式化上下文、Grid 布局，以及几种居中方法。四个小页面各讲一个知识点，用的都是固定尺寸的彩色方块，方便测量。

## 试一试

```sh
npm run dev
# 打开 http://127.0.0.1:4173/fundamentals/css/bfc/bfc.html
```

不需要安装依赖，也不需要构建：克隆仓库后直接运行 `npm run dev` 即可。这些页面不运行任何脚本，控制台里什么也看不到，请改用开发者工具的 Elements（元素）面板检查这些方块。

- [bfc/bfc.html](bfc/bfc.html) 竖着排了几组浅蓝色方块。第一组的两个方块相距 100 px。第二组的每个方块都套在一个设置了 `overflow: hidden` 的盒子里，两者相距 200 px。在开发者工具里取消勾选 `overflow: hidden`，间距就缩回 100 px。再往下，几个浮动的例子展示了同一个属性的作用。
- [vertical-center/index.html](vertical-center/index.html) 用五种方法，把蓝色方块放到浅蓝色盒子的中间。
- [grid/index.html](grid/index.html) 把九个带编号的格子排成三行三列。
- [basic/index.html](basic/index.html) 显示一个灰色盒子，它的宽度来自另一个样式表。

也可以直接打开在线演示：[BFC](https://l-jovi.github.io/latte-web/fundamentals/css/bfc/bfc.html)、[basic](https://l-jovi.github.io/latte-web/fundamentals/css/basic/index.html)、[居中](https://l-jovi.github.io/latte-web/fundamentals/css/vertical-center/index.html)和 [Grid](https://l-jovi.github.io/latte-web/fundamentals/css/grid/index.html)。

## 原理

**块格式化上下文。** 块级盒子在“块格式化上下文”（block formatting context，简称 BFC）里从上到下依次排列。在同一个 BFC 里，相邻盒子的上下外边距会“折叠”：它们互相重叠，所以两个 100 px 的外边距只留下 100 px 的间距，而不是 200 px。一个元素如果创建了自己的 BFC，就会把子元素的外边距留在自己内部，把浮动的子元素包进来，也不会和旁边的浮动元素重叠（[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Display/Block_formatting_context)）。`overflow` 取 `visible` 和 `clip` 以外的任何值时都会创建 BFC，`display: flow-root` 也会。[bfc/bfc.html](bfc/bfc.html) 从上到下分为六部分：

1. 两个设置了 `margin: 100px` 的方块。它们的外边距折叠了，所以相距 100 px。
2. 同样的方块，各自套在一个设置了 `overflow: hidden` 的 `div` 里。每个 `div` 都是独立的 BFC，把外边距留在里面，所以两个方块相距 200 px。
3. 两个设置了 `box-sizing: border-box` 的方块。它们没有内边距和边框，所以看起来和第一组完全一样。
4. 一个带边框、设置了 `overflow: hidden` 的盒子，里面有一个 100 px 的浮动方块。BFC 让盒子撑开，把浮动方块包在里面。没有它，盒子的高度为零，边框只剩一条细线。
5. 一个 200 px 的灰色盒子，设置了 `overflow: hidden`，旁边是一个浮动方块。因为它是 BFC，所以排在浮动方块旁边。去掉 `overflow: hidden`，它就会从浮动方块底下开始排，里面的文字则绕着浮动方块排列。
6. `display: flow-root` 像第 4 部分那样包住浮动元素，但不借助 `overflow`。

**居中。** [vertical-center/index.html](vertical-center/index.html) 把一个 100 × 240 px 的蓝色方块放进 500 × 300 px 的浅蓝色盒子里，一共做了五次：

1. 方块设为 `position: absolute` 和 `top: 50%`，让它的顶边落在正中间；再用 `transform: translateY(-50%)` 把它向上移动自身高度的一半。
2. 父元素设为 `display: flex` 和 `align-items: center`。
3. 父元素设为 `display: grid`，方块设置 `align-self: center` 和 `justify-self: center`。
4. 两个 `inline-block` 元素排在同一行：一个和父元素一样高的空 `::before`，以及方块本身。两者都设置了 `vertical-align: middle`，于是它们的中线对齐。父元素的 `font-size: 0` 让两者之间的空格不占位置。
5. 父元素设为 `display: table-cell`，再加上 `vertical-align: middle` 和 `text-align: center`，像表格里的单元格那样居中。

方法 1 和 2 只做垂直居中，方块仍然靠左；方法 3、4、5 在两个方向上都居中。

**Grid。** 在 [grid/index.html](grid/index.html) 里，`grid-template-columns: repeat(1, 100px 1fr 2fr)` 生成三列：第一列 100 px，剩下的宽度按一份和两份分给后两列。`grid-template-rows: repeat(3, 1fr)` 生成三个等高的行，`grid-gap: 20px 15px` 让行与行之间空出 20 px、列与列之间空出 15 px。`grid-auto-flow: column` 让格子先从上到下填满一列，再换到下一列，所以 1、2、3 号格子在第一列，7、8、9 号格子在最宽的那一列。

**Basic。** 在 [basic/index.html](basic/index.html) 里，`@import` 引入了 [basic/global.css](basic/global.css)，它把 `.container` 设为 500 px 宽。页面自己的规则再加上灰色背景和 300 px 的高度。里面的四个黑色小条是 `inline-block`，所以像文字一样排在同一行；它们之间的小空隙，来自 HTML 标签之间的空格和换行。

## 过去与现在

BFC 页面里较早的几个例子用 `overflow: hidden` 创建 BFC。这样做行得通，但 `overflow` 本来是用来决定放不下的内容该怎么处理的，拿它来创建 BFC，可能带来多余的滚动条，或者把阴影裁掉。页面最后一部分的 `display: flow-root` 只创建 BFC，不做别的事（[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Display/Block_formatting_context)）。

日常的对齐请用 flexbox 或 grid。`table-cell` 和 `inline-block` 的写法仍然值得了解，因为你会在现有代码里遇到它们。

Grid 页面写的是 `grid-gap`，这是早期 Grid 规范里的属性名。如今它叫 `gap`，浏览器仍然接受旧名字（[MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/gap)）。

## 刻意省略

- 每个盒子都用固定的像素尺寸，方便测量每种效果。响应式页面一般不会这样设定尺寸。
- Grid 页面用 `grid-template-areas` 给区域起了名字，但没有任何格子按名字放置，所以这些名字不起作用。
- 在居中方法 5 里，方块会比正中间高出几个像素。它是一个站在一行文字上的 `inline-block`，而这一行在下方给 g、p 这类字母的尾巴留了一点空间。

## 验证与来源

- `npm run test:browser` 在 Chromium、Firefox、WebKit 中打开全部四个页面，检查每个页面都能正常加载、没有报错。没有测试去测量布局本身。
- [迁移清单](../../docs/migration.zh-Hans.md)链接到原始版本，位于 `style/layout` 目录。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../NOTICE.md)。
