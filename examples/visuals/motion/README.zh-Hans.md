# 导航、步骤条与圆形进度

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

在根目录运行 `npm ci` 和 `npm run dev`，打开 http://127.0.0.1:4173/examples/visuals/motion/。无需构建或额外服务。阅读顺序：`index.html → app.js`。

同一个导航展开效果对照 requestAnimationFrame 缓动计算与 CSS 宽度过渡。悬停或聚焦链接，宽度从 180 变为 260 像素。Next 将步骤条从 Read 推进到 Run；滑块更新 conic-gradient 圆环和可访问数值。以三个可读机制替换重复定时器、旧前缀和复制的装饰圆形。简单过渡交给 CSS，JS 缓动展示时间差和中断。它们不代表真实业务流程或网络进度。

运行 `npx playwright test tests/browser/visuals.spec.js`；像素滤镜与轮播位置另有 Node 回归。Touch 事件序列为合成输入，指针／鼠标和键盘使用浏览器真实输入；物理移动设备手势仍需人工检查。来源：[原 navigation](https://github.com/L-Jovi/latte-web/tree/1be029e8f4fdc38a0c62ec2a9569187c1659875f/vision-samples/navigation)。许可：[root MIT license](../../../LICENSE)。替换图形均为自制，无捆绑字体或外来照片。
