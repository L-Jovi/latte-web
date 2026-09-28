# 分层轮播与 Scroll Snap

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

在根目录运行 `npm ci` 和 `npm run dev`，打开 http://127.0.0.1:4173/examples/visuals/carousel/。无需构建或额外服务。阅读顺序：`geometry.js → app.js`。

把旋转木马保留为位置计算：距当前卡片的距离决定位置、缩放、透明度和层级。全部从状态计算，避免边读取样式边修改造成污染，也不再依赖容易失效的动画锁。分层版与 Scroll Snap 版点击 Next 均选中 Card 2；分层版循环，原生滚动版在边界停止。浏览器负责自然滚动和减少动态效果偏好；手写几何仍适合非线性布局。重复课程副本、jQuery 包和装饰照片退役。不实现自动播放或无限列表虚拟化。

运行 `npx playwright test tests/browser/visuals.spec.js`；像素滤镜与轮播位置另有 Node 回归。Touch 事件序列为合成输入，指针／鼠标和键盘使用浏览器真实输入；物理移动设备手势仍需人工检查。来源：[原 slider/whirligig](https://github.com/L-Jovi/latte-web/tree/1be029e8f4fdc38a0c62ec2a9569187c1659875f/vision-samples/slider/whirligig)。许可：[local GPL-2.0 notice](LICENSE)。替换图形均为自制，无捆绑字体或外来照片。
