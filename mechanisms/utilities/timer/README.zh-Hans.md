# 定时器为什么会漂移，以及如何校正

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

测量定时器回调晚了多少，并据此调整下一次的触发时间。

## 试一试

```sh
npm run dev
# 打开 http://127.0.0.1:4173/mechanisms/utilities/timer/
```

点击 **Start ten ticks**。页面上每 100 毫秒出现一行，一共十行，每行写着这一次晚了多少，例如 `3: 1.20 ms late`。每次运行的数字都不一样，但不会越来越大。**Stop** 会取消下一次触发。不需要安装依赖，也不需要构建：克隆仓库后直接运行 `npm run dev` 即可。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/mechanisms/utilities/timer/index.html)。

## 原理

别的代码还在运行时，定时器回调没法执行，所以它常常会晚一点。如果每一次都从当前时刻起再等整整 `wait` 毫秒去安排下一次，每次的延迟就会累加到下一次上，定时器离预定的时间越来越远，这就是“漂移”。

[timer-delay-fix.js](timer-delay-fix.js)（16 行）避免了这一点。`startDriftTimer(callback, wait)` 记下开始的时间，于是第 _n_ 次本应在 `start + n × wait` 时执行。每次触发都会调用 `callback({ count, drift })`，其中 `drift` 表示这一次晚了多少毫秒。然后它按下一次的理想时间 `start + (n + 1) × wait` 设置定时器，而不是从现在起再等整整 `wait`。晚到的那一次，后面的等待就会相应缩短，所以延迟不会累加。`startDriftTimer` 返回一个 `stop()` 函数，在回调内部调用也有效。时间取自 `performance.now()`，这个时钟只会往前走。

[timer-delay.js](timer-delay.js)（8 行）只测量、不校正：用 `setInterval` 每秒触发一次，打印十次的漂移。在仓库根目录运行 `node mechanisms/utilities/timer/timer-delay.js`；在 Node 里，漂移通常每次都会增加一点。[timer-animation-frame.js](timer-animation-frame.js)（28 行）用 `requestAnimationFrame` 在每次屏幕刷新时更新一个元素，让数字从 0 数到 100 再数回来；`setInterval` 的写法留在了注释里。

## 过去与现在

凡是和画面有关的，都用 `requestAnimationFrame`：它每次屏幕刷新最多执行一次。动画进行到哪一步，要根据实际经过的时间来算。定时器触发的次数不是可靠的时钟。

## 刻意省略

- 校正不能让定时器变得精确，也无法挽回被阻塞的页面。如果页面忙碌的时间超过一个间隔，错过的几次会紧接着连续执行，把进度追回来。
- `wait` 必须是正数，否则 `startDriftTimer` 会抛出 `RangeError`。
- 没有页面加载 `timer-delay.js` 和 `timer-animation-frame.js`，它们是供阅读的。`timer-animation-frame.js` 需要页面上有一个 id 为 `a` 的元素。

## 验证与来源

- `npm test` 启动一个间隔 5 毫秒的漂移定时器，它的回调在第一次触发时就调用 `stop()`；测试检查回调恰好只执行了一次。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开这个页面，只要抛出错误或有文件加载失败就会报错；它不会点击 **Start ten ticks**。
- 最初的版本故意让页面保持忙碌，用了一个永远不停、一直占着处理器的循环。这个循环已经移除。[迁移清单](../../../docs/migration.zh-Hans.md)链接到最初的版本。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../../NOTICE.md)。
