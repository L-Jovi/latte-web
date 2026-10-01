# 节流

[English](README.md) | 简体中文

> 对应英文版：2026-10-01。英文版更新后本页可能滞后。

每个时间间隔最多执行一次，第一次调用立即执行。

## 试一试

```sh
npm run dev
# 打开 http://127.0.0.1:4173/mechanisms/utilities/throttle/
```

尽可能快地连续点击按钮。不管点多少次，计数每 500 毫秒最多增加一次。也可以直接打开[在线演示](https://latte.jovipro.com/mechanisms/utilities/throttle/index.html)。

## 原理

[simple.js](simple.js)（11 行）记住被包装的函数上一次是什么时候执行的。每次调用时它都看一眼时钟：如果距离上次已经过去了至少 `wait` 毫秒，就执行函数并记下时间；否则直接忽略这次调用。

有两个细节很重要：

- 时间取自 `performance.now()`，它只会往前走。`Date.now()` 在电脑时钟被调整时可能会跳变。
- 被放行的那次调用会保留原来的 `this` 和参数，所以它可以用来包装对象方法和事件处理函数。

节流和[防抖](../debounce/README.zh-Hans.md)很容易混淆。节流在一连串事件**进行中**定期执行，适合滚动、拖拽；防抖要等这串事件**停下来**才执行，适合搜索框。

## 过去与现在

JavaScript 至今没有内置的节流函数。lodash 等库提供的 `throttle` 可以选择在第一次调用、最后一次调用或两者都执行。如果是更新画面，`requestAnimationFrame` 往往更合适：它每次屏幕刷新最多执行一次。

## 刻意省略

- 每个间隔里只有第一次调用会执行，一连串调用中的最后一次会被丢掉。所以如果拖拽恰好停在两个间隔之间，最终位置就会丢失。
- 没有 `cancel`，也没有“末尾补一次调用”的选项。

## 验证与来源

- `npm test` 检查三件事：第一次调用会执行，间隔快结束前的调用会被忽略，正好在间隔结束那一刻的调用会执行。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开这个页面。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../../NOTICE.md)。
