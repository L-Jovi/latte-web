# CSS transform 照片墙

[English](README.md) | 简体中文

> 对应英文版：2026-10-01。英文版更新后本页可能滞后。

散落倾斜的卡片，鼠标悬停时摆正并放大。

## 试一试

```sh
npm run dev
# 打开 http://127.0.0.1:4173/examples/visuals/photo-wall/
```

克隆仓库后就能直接运行，不需要 `npm ci`，也不需要构建。六张卡片以不同的角度摆放，每张都是用 CSS 画的一小幅风景。把鼠标移到某张卡片上，或者用 Tab 键移过去：它会摆正、稍稍放大，并浮到相邻卡片的上面。把窗口调窄，照片墙的列数就会变少。也可以直接打开[在线演示](https://latte.jovipro.com/examples/visuals/photo-wall/index.html)。

## 原理

全部代码都在 [index.html](index.html)（56 行）里，没有 JavaScript。

- 每张卡片都是一个 `<button>`，所以能获得键盘焦点。它的 `style` 属性设置了两个自定义属性（CSS 变量）：`--angle` 是倾斜角度，`--hue` 是小山的颜色。
- `.photo` 把每张卡片旋转 `var(--angle)`。在 `:hover` 或 `:focus-visible` 时，transform 变成 `rotate(0deg) scale(1.08)`，`z-index: 2` 让卡片浮到其他卡片上面，`transition: transform 0.3s` 负责动画。
- 旋转和缩放写在同一个 `transform` 值里。原版把 `rotate` 和 `scale` 写成了两条独立的 `transform` 声明，结果第二条覆盖了第一条。
- 网格用的是 `repeat(auto-fit, minmax(180px, 1fr))`：放得下几列就放几列，每列至少 180 像素宽。
- 每幅风景由两层边缘清晰的 `linear-gradient` 叠成，看上去就是浅色天空下的几座小山。
- 如果系统开启了“减少动态效果”，共用的样式表会把过渡缩短到几乎为零。

## 过去与现在

原版为每张照片手工定位：一张照片一个 class，位置写死成像素值。如今由 CSS Grid 排布卡片并适应屏幕宽度，每张卡片一个自定义属性，取代了每张照片一个 class。

## 刻意省略

- 卡片是 CSS 画出来的，不是照片：没有照片服务，不能上传，也不做图像处理。
- 角度写死在 HTML 里，不会随机打乱。
- 点击卡片不会有任何效果。

## 验证与来源

- `npm run test:browser` 先开启“减少动态效果”，再在 Chromium、Firefox、WebKit 中让第一张卡片获得焦点，检查它计算后的 transform 最终是 1.08 倍缩放，并且已经去掉了倾斜。悬停没有测试。`npx playwright test tests/browser/visuals.spec.js` 可以单独运行这些视觉实验的测试。
- 来源：[原版照片墙](https://github.com/L-Jovi/latte-web/tree/1be029e8f4fdc38a0c62ec2a9569187c1659875f/vision-samples/photo-wall)。
- 本目录保留了原版的 GPL-2.0 [LICENSE](LICENSE)；见 [NOTICE.md](../../../NOTICE.md)。六幅风景都是用 CSS 自己画的，取代了原版的照片，没有附带任何照片或字体。
