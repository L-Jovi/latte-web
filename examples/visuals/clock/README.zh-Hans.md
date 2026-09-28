# 点阵时钟

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

在根目录运行 `npm ci` 和 `npm run dev`，打开 http://127.0.0.1:4173/examples/visuals/clock/。无需构建或额外服务。阅读顺序：`digit.js → app.js`。

保留原来的数字点阵和粒子思路。用新的截止时间替代过期的 2018 年日期，用 requestAnimationFrame 与时间差替代固定帧增量；粒子有寿命和数量上限。启动后观察 10 → 9，重启会替换旧循环。这是有限的视觉模拟，不是物理引擎。

运行 `npx playwright test tests/browser/visuals.spec.js`；像素滤镜与轮播位置另有 Node 回归。Touch 事件序列为合成输入，指针／鼠标和键盘使用浏览器真实输入；物理移动设备手势仍需人工检查。来源：[原 canvas-clock](https://github.com/L-Jovi/latte-web/tree/1be029e8f4fdc38a0c62ec2a9569187c1659875f/vision-samples/canvas-clock)。许可：[local GPL-2.0 notice](LICENSE)。替换图形均为自制，无捆绑字体或外来照片。
