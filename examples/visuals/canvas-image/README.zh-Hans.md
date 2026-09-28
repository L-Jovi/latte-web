# Canvas 像素与图像操作

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

在根目录运行 `npm ci` 和 `npm run dev`，打开 http://127.0.0.1:4173/examples/visuals/canvas-image/。无需构建或额外服务。阅读顺序：`pixels.js → app.js`。

六个图像练习合并成一个小页面：绘制、缩放、水印、放大镜、滤镜和程序化颜色。保留灰度、阈值、反色、邻域模糊和马赛克的可读循环；从不变输入读取，保留 alpha，边缘块不越界。自制 SVG 替换来源不明照片。切换滤镜，用方向键调整 Scale，开启支持键盘／指针的放大镜；镜片以显示比例的两倍采样原图。只需显示效果时可用 CSS filter；像素循环适合解释计算、导出和自定义变换。本例同步处理小图，不承诺大图性能与色彩管理。

运行 `npx playwright test tests/browser/visuals.spec.js`；像素滤镜与轮播位置另有 Node 回归。Touch 事件序列为合成输入，指针／鼠标和键盘使用浏览器真实输入；物理移动设备手势仍需人工检查。来源：[原 canvas-image](https://github.com/L-Jovi/latte-web/tree/1be029e8f4fdc38a0c62ec2a9569187c1659875f/vision-samples/canvas-image)。许可：[local GPL-2.0 notice](LICENSE)。替换图形均为自制，无捆绑字体或外来照片。
