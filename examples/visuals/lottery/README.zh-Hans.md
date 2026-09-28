# 旋转选择器

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

在根目录运行 `npm ci` 和 `npm run dev`，打开 http://127.0.0.1:4173/examples/visuals/lottery/。无需构建或额外服务。阅读顺序：`app.js`。

保留整圈、余角和选中扇区之间的关系。Web Animations 的完成 Promise 控制按钮何时恢复，减少动态效果模式立即结束。点击 Spin 后，指针与 Selected: A/B/C/D 对应同一扇区。四块 CSS 扇区替代外部图片和 jQueryRotate。使用本地 Math.random 和虚构标签，不是安全随机数、真实奖品或服务端权威抽奖系统。

运行 `npx playwright test tests/browser/visuals.spec.js`；像素滤镜与轮播位置另有 Node 回归。Touch 事件序列为合成输入，指针／鼠标和键盘使用浏览器真实输入；物理移动设备手势仍需人工检查。来源：[原 lottery](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/vision-samples/lottery)。许可：[root MIT license](../../../LICENSE)。替换图形均为自制，无捆绑字体或外来照片。
