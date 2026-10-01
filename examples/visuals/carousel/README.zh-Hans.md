# 3D 轮播与 CSS Scroll Snap

[English](README.md) | 简体中文

> 对应英文版：2026-10-01。英文版更新后本页可能滞后。

用几何计算排布层叠的轮播图，再让 CSS Scroll Snap 原生完成类似的事。

## 试一试

```sh
npm run dev
# 打开 http://127.0.0.1:4173/examples/visuals/carousel/
```

克隆仓库后就能直接运行，不需要 `npm ci`，也不需要构建。页面上有两个轮播，各有五张卡片：

- **Handwritten slot geometry**（手写位置计算）：最前面的卡片是原始大小，其余卡片排在两侧，越往外越小、越淡、越靠后，看起来就有了纵深。点击 **Next layered card**，或者让轮播获得焦点后按右方向键：所有卡片都挪动一个位置，下方文字显示 `Card 2`。它会循环，Card 5 之后又回到 Card 1。
- **Native Scroll Snap**（原生滚动吸附）：一条由浏览器负责滚动的长条。用手指滑、横向滚动、按方向键或点击 **Next snap card**，它总会停在一整张卡片上，文字也随之更新。滚到两端就停下，对应的按钮会被禁用。

也可以直接打开[在线演示](https://latte.jovipro.com/examples/visuals/carousel/index.html)。

## 原理

先读 [geometry.js](geometry.js)（13 行），再读 [app.js](app.js)（61 行）。

`slots(count, current)` 只凭一个数字，也就是最前面那张卡片的序号 `current`，算出每张卡片的位置。它先求出每张卡片与最前面卡片的距离，并让这个距离绕回来，最多只差半圈（五张卡片时是 −2 到 2）。然后：

- 水平位置每差一步移动 90 像素：`x = distance * 90`；
- 尺寸每差一步缩小 22%：`scale = 0.78 ** |distance|`；
- 不透明度是 `1 / (|distance| + 1)`；
- 最前面卡片的 `z-index` 最大，所以近处的卡片会盖住后面的。

`app.js` 把这些值写成 `transform`、`opacity` 和 `z-index`，再由 CSS 过渡负责动画。每次点击都根据 `current` 重新计算全部五张卡片，从不从页面上读回位置，所以点得再快，卡片的顺序也不会乱，动画进行中也不需要加锁。最前面的卡片还会得到 `aria-current="true"`，告诉屏幕阅读器等辅助技术当前是哪一张。

Scroll Snap 那条几乎不需要代码：长条上的 `scroll-snap-type: x mandatory` 加上每张卡片的 `scroll-snap-align: start`，就能让浏览器停在卡片上。按钮和方向键调用 `scrollTo`，`scroll` 监听器读取 `scrollLeft`，算出当前显示的是哪一张。如果系统开启了“减少动态效果”，按钮会直接跳到目标卡片，不再平滑滚动；共用的样式表也会让层叠卡片几乎瞬间就位。

## 过去与现在

原版示例来自慕课网（imooc）的一门视频课程，有两份代码：课程里的版本和作者自己写的版本，都基于 jQuery，还配了装饰用的照片。它移动卡片时，会读取相邻卡片当前的样式，再朝那些值做动画；动画进行期间的点击则一律忽略。

如今，如果只是一排普通的轮播图，[CSS Scroll Snap](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap) 可以让浏览器负责滑动、滚动，并停在每一张上。对于不是一条直线滚动的布局，比如这种层叠效果，手写几何计算仍然有用。

## 刻意省略

- 没有自动播放。五张卡片始终都在页面里，所以不适合很长的列表。
- 卡片里只有文字，原版的照片已经去掉。
- 层叠轮播不响应滑动手势，请用它的按钮或方向键。

## 验证与来源

- `npm run test:browser` 在 Chromium、Firefox、WebKit 中点击 **Next layered card**，检查文字和带 `aria-current` 标记的卡片都是 `Card 2`；然后依次点击 **Next snap card** 和 **Previous snap card**，期望先后看到 `Card 2` 和 `Card 1`。`npx playwright test tests/browser/visuals.spec.js` 可以单独运行这些视觉实验的测试。
- `npm test` 在 Node 中检查 `slots`：对五个位置中的每一个，最前面的卡片都居中且是原始大小，恰好只有一张卡片在最上层，也没有两张卡片占同一个位置。
- [原版轮播](https://github.com/L-Jovi/latte-web/tree/1be029e8f4fdc38a0c62ec2a9569187c1659875f/vision-samples/slider/whirligig)是跟着慕课网（imooc）的一门视频课程写的。
- 本目录保留了原版的 GPL-2.0 [LICENSE](LICENSE)；见 [NOTICE.md](../../../NOTICE.md)。卡片都是纯 CSS，没有附带任何照片或字体。
