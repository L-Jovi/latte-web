# 抽奖转盘

[English](README.md) | 简体中文

> 对应英文版：2026-10-01。英文版更新后本页可能滞后。

转盘停下的扇区和显示的结果始终一致，用 Web Animations API 实现。

## 试一试

```sh
npm run dev
# 打开 http://127.0.0.1:4173/examples/visuals/lottery/?lang=zh
```

点击**旋转**。转盘转满三圈后停下，某个扇区正对着固定的指针，下方文字显示的也是同一个字母。不需要构建。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/examples/visuals/lottery/index.html?lang=zh)。

## 原理

全部代码都在 [app.js](app.js)（44 行）里：

1. 随机选一个扇区，然后算出让它的中心正对指针所需的角度。
2. 在当前角度上再加三整圈（1080°），保证转盘总是向前转。
3. 用 `element.animate()` 播放动画。在动画的 `finished` Promise 完成之前，按钮一直处于禁用状态，所以再点一次也打断不了正在进行的旋转。
4. 如果系统设置了“减少动态效果”，旋转几乎会瞬间完成。

转盘本身只是一个 `conic-gradient`，不需要加载任何图片。

## 过去与现在

原版用 jQuery 和 jQueryRotate 插件旋转一张图片。如今 CSS 过渡和 Web Animations API 在所有主流浏览器中都能用，不需要任何库就能做到同样的效果，还会给你一个 Promise，准确告诉你动画什么时候结束。

## 刻意省略

- 结果来自浏览器里的 `Math.random()`，标签也是虚构的。真正的抽奖必须在服务器上决定，用户才改不了结果。
- 没有音效，没有缓动曲线编辑器，也不能选择扇区数量。

## 验证与来源

- `npm run test:browser` 在 Chromium、Firefox、WebKit 中转动转盘，并检查会显示一个字母、按钮会重新可用。角度计算本身没有测试覆盖；[app.js](app.js) 里算式上方的注释解释了其中的数学。
- 彩色扇区用 CSS 绘制，取代了原版借用的图片。原创代码使用 MIT 许可；见 [NOTICE.md](../../../NOTICE.md)。
