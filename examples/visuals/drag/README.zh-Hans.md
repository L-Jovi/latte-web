# 鼠标与 Pointer Events

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

在根目录运行 `npm ci` 和 `npm run dev`，打开 http://127.0.0.1:4173/examples/visuals/drag/。无需构建或额外服务。阅读顺序：`app.js`。

两个方块共用相同的起点偏移和边界计算。经典版保留 document 的 mousemove/mouseup；现代版用 pointer capture，把移动事件留给按下的元素。拖动任一方块，方向键每次移动 Pointer 方块 10 像素；取消和丢失捕获会释放状态。Pointer Events 统一鼠标、触摸和笔，旧鼠标方式仍适合解释坐标偏移。不实现惯性、拖放数据或排序。

运行 `npx playwright test tests/browser/visuals.spec.js`；像素滤镜与轮播位置另有 Node 回归。Touch 事件序列为合成输入，指针／鼠标和键盘使用浏览器真实输入；物理移动设备手势仍需人工检查。来源：[原 drag](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/vision-samples/drag)。许可：[root MIT license](../../../LICENSE)。替换图形均为自制，无捆绑字体或外来照片。
