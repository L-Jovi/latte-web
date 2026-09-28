# 照片墙变换

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

在根目录运行 `npm ci` 和 `npm run dev`，打开 http://127.0.0.1:4173/examples/visuals/photo-wall/。无需构建或额外服务。阅读顺序：`index.html`。

用六张自制 CSS 风景保留旋转、缩放、层级和过渡。Tab 聚焦或悬停会扶正并放大卡片。将旋转与缩放写进同一个 transform，修复旧声明互相覆盖的问题。Grid 负责响应式排布，每张卡片的自定义属性保留不同角度。不包含照片服务、上传或图像处理；减少动态效果偏好会缩短过渡。

运行 `npx playwright test tests/browser/visuals.spec.js`；像素滤镜与轮播位置另有 Node 回归。Touch 事件序列为合成输入，指针／鼠标和键盘使用浏览器真实输入；物理移动设备手势仍需人工检查。来源：[原 photo-wall](https://github.com/L-Jovi/latte-web/tree/1be029e8f4fdc38a0c62ec2a9569187c1659875f/vision-samples/photo-wall)。许可：[local GPL-2.0 notice](LICENSE)。替换图形均为自制，无捆绑字体或外来照片。
