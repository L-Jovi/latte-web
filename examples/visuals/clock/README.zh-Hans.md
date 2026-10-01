# Canvas 点阵倒计时

[English](README.md) | 简体中文

> 对应英文版：2026-10-01。英文版更新后本页可能滞后。

用点阵画出数字；数字变化时，点会化作粒子落下。

## 试一试

```sh
npm run dev
# 打开 http://127.0.0.1:4173/examples/visuals/clock/
```

克隆仓库后就能直接运行，不需要 `npm ci`，也不需要构建。画布上用蓝色圆点显示 `00:00:10`。点击 **Start 10-second countdown**：画布下方的文字变成 `10 seconds remaining`，之后每秒减一。每当某一位数字变化，旧数字的圆点就会变成彩色粒子，先跳起，再落下，在底部弹跳。任何时候再点一次按钮，都会从头开始。也可以直接打开[在线演示](https://latte.jovipro.com/examples/visuals/clock/index.html)。

## 原理

先读 [digit.js](digit.js)（134 行），再读 [app.js](app.js)（80 行）。

1. `digit.js` 把每个数字存成由 0 和 1 组成的网格，10 行 7 列（冒号宽 4 列）。`app.js` 在每个 1 的位置画一个圆。
2. 剩余时间根据截止时间计算。点击时把 `end` 设为 10 秒之后，每一帧都算一次 `Math.ceil((end - now) / 1000)`，所以即使丢了几帧，倒计时也不会走偏。
3. 文字变化时，变了的那几位数字上的每个点都会变成一个粒子，带着随机的水平速度和向上的初速度。每一帧先加上重力，再按“速度 × 距上一帧的时间”移动粒子；碰到底部时，以原来 65% 的速度反弹。
4. `requestAnimationFrame` 在每次屏幕刷新时调用一次 `tick`，并传给它一个时间戳。每帧的时间步长最多按 0.05 秒计算，所以长时间的停顿（比如标签页切到了后台）也不会让粒子一下子飞出画布。
5. 粒子存在 4 秒后，或者从左右两侧离开画布时就会被移除，最多只保留 400 个，所以反复重新开始也不会越积越多。
6. 按钮会先取消正在运行的循环，再开始新的，所以不会有两个循环同时运行。倒计时归零、最后一个粒子消失后，循环会自己停下。

## 过去与现在

原版倒计时的目标是 2018 年的一个固定日期，日期一过，就只能显示一排零。它靠 `setInterval` 定时器绘制，每次触发都让每个粒子移动同样的固定距离，所以动画的快慢取决于定时器触发得是否准时。

如今脚本动画使用 [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)：浏览器在每次重绘之前调用它，传入的时间戳让代码可以按真实经过的时间计算运动。[定时器为什么会漂移，以及如何校正](../../../mechanisms/utilities/timer/README.zh-Hans.md)演示了定时器回调会晚到多少。

## 刻意省略

- 这是视觉效果，不是物理引擎：只有一个重力值和一个反弹系数，粒子之间也不会碰撞。
- 只能倒数 10 秒，不能设置别的时间。

## 验证与来源

- `npm run test:browser` 在 Chromium、Firefox、WebKit 中打开页面，检查画布不是空白的，然后点击按钮，依次等待 `10 seconds remaining` 和 `9 seconds remaining`。粒子没有测试。`npx playwright test tests/browser/visuals.spec.js` 可以单独运行这些视觉实验的测试。
- [原版 Canvas 时钟](https://github.com/L-Jovi/latte-web/tree/1be029e8f4fdc38a0c62ec2a9569187c1659875f/vision-samples/canvas-clock)是跟着慕课网（imooc）的一门课程写的，这里保留了它的数字点阵和粒子思路。
- 本目录保留了原版的 GPL-2.0 [LICENSE](LICENSE)；见 [NOTICE.md](../../../NOTICE.md)。所有图形都由代码绘制，没有附带任何字体或图片。
