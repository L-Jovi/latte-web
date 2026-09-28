# 手势翻页

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

在根目录运行 `npm ci` 和 `npm run dev`，打开 http://127.0.0.1:4173/examples/visuals/paging/。无需构建或额外服务。阅读顺序：`app.js`。

将 Huamao 竖向翻页和手写横向滑屏提取成各三页的有限轨道。横向保留 Touch Events 与距离／时间阈值；竖向改用 Pointer Events／捕获。二者都限制索引、响应尺寸变化、支持方向键和按钮、处理取消。滑动或点击 Next 后显示 Page 2 of 3，到第三页禁用 Next。旁边轮播的 CSS Scroll Snap 把自然滚动交给浏览器；本例展示手动手势决策。不保留整站导航、横竖屏锁定和营销素材。

运行 `npx playwright test tests/browser/visuals.spec.js`；像素滤镜与轮播位置另有 Node 回归。Touch 事件序列为合成输入，指针／鼠标和键盘使用浏览器真实输入；物理移动设备手势仍需人工检查。来源：[原 huamao](https://github.com/L-Jovi/latte-web/tree/1be029e8f4fdc38a0c62ec2a9569187c1659875f/vision-samples/huamao)。许可：[local GPL-2.0 notice](LICENSE)。替换图形均为自制，无捆绑字体或外来照片。
