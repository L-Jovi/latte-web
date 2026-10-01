# 用鼠标事件和 Pointer Events 实现拖拽

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

同一个拖拽写两遍；Pointer Events 同时支持触屏和手写笔。

## 试一试

```sh
npm run dev
# 打开 http://127.0.0.1:4173/examples/visuals/drag/?lang=zh
```

克隆仓库后就能直接运行，不需要 `npm ci`，也不需要构建。分别拖动**鼠标**方块和**指针**方块：它们都会跟着指针移动，并停在浅色区域的边缘。然后用 Tab 键把焦点移到**指针**方块上，按方向键：每按一次移动 10 像素。在手机或平板上，应该只有**指针**方块会跟着手指走，因为用手指拖动不会产生鼠标事件。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/examples/visuals/drag/index.html?lang=zh)。

## 原理

全部代码都在 [app.js](app.js)（59 行）里。两个版本都会记住你是按住方块的哪个位置拖动的，所以方块不会突然跳到让左上角对准指针的位置；两者也调用同一个 `move` 函数，把方块限制在自己的区域里。

- **鼠标事件**：在方块上 `mousedown` 开始拖动。`mousemove` 和 `mouseup` 监听的是整个 `document`，所以即使移动太快、指针甩开了方块，拖动也不会中断。窗口失去焦点时，拖动同样会结束。
- **Pointer Events**：一套事件（`pointerdown`、`pointermove`、`pointerup`）同时覆盖鼠标、触屏和手写笔。`setPointerCapture` 会把这个指针之后的所有事件都交给方块，即使指针已经移出方块也一样，所以不需要监听 `document`。拖动在 `pointerup`、`pointercancel`（浏览器或系统打断了这次手势）或者失去捕获时结束。只有主指针和主按键才会开始拖动。
- 方块上的 CSS `touch-action: none` 告诉浏览器：触摸从方块上开始时，不要滚动页面。

## 过去与现在

原版示例在整个 document 上监听鼠标事件。如今 [Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) 用一套事件同时处理鼠标、触屏和手写笔，指针捕获也取代了挂在整个 document 上的监听。鼠标版之所以保留，是因为它把偏移量的计算展示得很直白。

## 刻意省略

- 松手后没有惯性，不能在元素之间拖放数据，也不能排序。
- 只有**指针**方块可以用键盘移动。
- 同一时间只认一个指针，所以不支持多点触控。

## 验证与来源

- `npm run test:browser` 在 Chromium、Firefox、WebKit 中用真实的鼠标输入拖动两个方块，检查它们都向右移动了同样的 130 像素；然后在 **Pointer** 方块上按一次右方向键，检查它又移动了 10 像素。最后把两个方块都拖过右边缘，检查它们都正好停在各自区域的边缘。触屏和手写笔没有测试，请在真实设备上试一试。`npx playwright test tests/browser/visuals.spec.js` 可以单独运行这些视觉实验的测试。
- 来源：[原版拖拽示例](https://github.com/L-Jovi/latte-web/tree/1be029e8f4fdc38a0c62ec2a9569187c1659875f/vision-samples/drag)。原创代码使用 MIT 许可；见 [NOTICE.md](../../../NOTICE.md)。
