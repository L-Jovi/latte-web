# 本地搜索建议

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

在根目录运行 `npm ci` 和 `npm run dev`，打开 http://127.0.0.1:4173/examples/visuals/search/。无需构建或额外服务。阅读顺序：`topics.json → app.js`。

保留建议列表与选择交互，用一次本地 Fetch 替换失效的 Bing／淘宝接口和同步 XHR。输入 graph，按 ArrowDown 再按 Enter，应显示 Selected: GraphQL。Escape 和失焦关闭列表。文本节点避免把建议解释为 HTML；combobox／listbox 属性表达当前选择。固定词表让实验可重复。大型远端服务还需取消、加载状态和防抖，相关机制见网络／工具练习，本例不暗含这些能力。

运行 `npx playwright test tests/browser/visuals.spec.js`；像素滤镜与轮播位置另有 Node 回归。Touch 事件序列为合成输入，指针／鼠标和键盘使用浏览器真实输入；物理移动设备手势仍需人工检查。来源：[原 search-input](https://github.com/L-Jovi/latte-web/tree/ef3fa2adad5155c5fd0e041cf6ac086e86222827/vision-samples/search-input)。许可：[local GPL-2.0 notice](LICENSE)。替换图形均为自制，无捆绑字体或外来照片。
