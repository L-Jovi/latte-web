# 滑动翻页

[English](README.md) | 简体中文

> 对应英文版：2026-10-01。英文版更新后本页可能滞后。

用距离和速度阈值把滑动变成翻页，分别用 touch 事件和 Pointer Events 实现。

## 试一试

```sh
npm run dev
# 打开 http://127.0.0.1:4173/examples/visuals/paging/
```

克隆仓库后就能直接运行，不需要 `npm ci`，也不需要构建。页面上有两条“轨道”，每条都是由三页连成的长条，在一个框里滑动：

- **Touch Events** 这条轨道左右翻页，只响应手指。在电脑上请点 **Next touch page**，或者让轨道获得焦点后按方向键。
- **Pointer Events** 这条轨道上下翻页，也能用鼠标拖：往上拖就翻到下一页。

滑动距离够了，下一页就会滑进来，下方文字变成 `Page 2 of 3`。快速一划需要的距离比慢慢拖要短；距离不够，轨道就会弹回原位。到第三页时，这条轨道的 **Next** 按钮会被禁用。也可以直接打开[在线演示](https://latte.jovipro.com/examples/visuals/paging/index.html)。

## 原理

全部代码都在 [app.js](app.js)（95 行）里。同一个 `pager` 函数驱动两条轨道，区别只在方向和事件。

1. 手势开始时，记下位置和时间，并关掉 CSS 过渡，让页面直接跟着手指走。
2. 手指移动多少，轨道就移动多少。
3. 手势结束时做判断：快速的手势（不到 300 毫秒）移动 50 像素就够了；慢一些的手势要移动轨道长度的六分之一。这几个数字来自原来那个手写的滑块。距离够了就翻一页，不够就滑回去。过渡随后重新打开，所以无论哪种情况都有动画。
4. 页码始终在 1 到 3 之间，到两端时对应的按钮会被禁用。
5. 被取消的手势（`touchcancel`、`pointercancel` 或失去捕获）一律滑回原位。
6. `ResizeObserver` 会在可见区域尺寸变化时重新计算位置，所以调整窗口大小后，不会停在两页中间。

touch 版监听 `touchstart`、`touchmove` 和 `touchend`，只跟踪一根手指。Pointer 版用 `pointerdown`、`pointermove`、`pointerup` 加上 `setPointerCapture`，做法和[用鼠标事件和 Pointer Events 实现拖拽](../drag/README.zh-Hans.md)一样。CSS 的 `touch-action` 声明浏览器还可以自行朝哪个方向滚动：左右翻页的轨道是 `pan-y`（上下），上下翻页的轨道是 `pan-x`（左右）。

## 过去与现在

原版示例有三个：一个滑动切换整屏的手机页面、一个手写的左右滑块，以及一个用 jQuery 做的上下滑块。前两个用的是 touch 事件；上下滑块则靠点击按钮和定时器翻页。它们还一起带上了照片、字体和辅助库。

如今可以用 [CSS Scroll Snap](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap) 让浏览器负责滚动，并停在每一页上，[3D 轮播与 CSS Scroll Snap](../carousel/README.zh-Hans.md) 就演示了这种做法。如果需要精确地决定什么才算一次滑动，自己写手势仍然有用。

## 刻意省略

- 每条轨道固定三页。原版的整站导航、横竖屏锁定，以及它的图片和字体都已去掉。
- 没有惯性，没有自动播放，也不能从最后一页绕回第一页。

## 验证与来源

- `npm run test:browser` 在 Chromium、Firefox、WebKit 中运行。在左右翻页的轨道上，它用脚本发出一组模拟的 touch 事件，向左滑 150 像素，期望看到 `Page 2 of 3`；接着按一次右方向键，期望看到 `Page 3 of 3`，并且 **Next touch page** 被禁用。在上下翻页的轨道上，它用真实的鼠标输入向上拖 120 像素，期望看到 `Page 2 of 3`。由于 touch 事件是模拟的，请在真实的手机或平板上也试一试。`npx playwright test tests/browser/visuals.spec.js` 可以单独运行这些视觉实验的测试。
- 来源：[原版整屏示例](https://github.com/L-Jovi/latte-web/tree/1be029e8f4fdc38a0c62ec2a9569187c1659875f/vision-samples/huamao)，以及两个滑块；其中上下滑块注明参考了 [sterion 的一个 CodePen](https://codepen.io/sterion/pen/YxNjdz)。[迁移清单](../../../docs/migration.zh-Hans.md)里有这三个示例的链接。
- 本目录保留了原版的 GPL-2.0 [LICENSE](LICENSE)；见 [NOTICE.md](../../../NOTICE.md)。页面只是彩色方块，没有附带任何图片或字体。
