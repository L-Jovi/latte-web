# 可以用键盘操作的搜索建议

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

边输入边筛选建议，用方向键选择；使用无障碍的 combobox 标记。combobox（组合框）是一个带建议列表的输入框；这些标记告诉屏幕阅读器，输入框和列表是怎样配合的。

## 试一试

```sh
npm run dev
# 打开 http://127.0.0.1:4173/examples/visuals/search/
```

克隆仓库后就能直接运行，不需要 `npm ci`，也不需要构建。在 **Topic** 输入框里输入 `graph`：出现一条建议 **GraphQL**。按下方向键，再按 Enter：输入框被填好，下方文字显示 `Selected: GraphQL`。直接点击建议也能选中。按 Escape，或者让焦点离开输入框，列表就会关闭。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/examples/visuals/search/index.html)。

## 原理

先读 [topics.json](topics.json)（11 个主题），再读 [app.js](app.js)（72 行）。

1. 页面加载时，用一次 `fetch` 读取 `topics.json`。如果失败，页面会显示 `Could not load topics` 以及原因。
2. 每按一次键，列表就显示包含所输入文字的主题，不区分大小写。
3. 每条建议都用 `textContent` 添加，所以主题永远按纯文本显示，不会被当成 HTML 解析。
4. 上下方向键在列表里移动高亮，到两端会绕回来。Enter 选中当前高亮的主题。
5. 每条建议都会取消自己的 `pointerdown`，所以点击时焦点仍留在输入框里，这次点击就能选中主题。

ARIA 属性是一组额外的 HTML 属性，用来向辅助技术描述页面。这里的 ARIA 属性遵循 [combobox 模式](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)。输入框带有 `role="combobox"`，并用 `aria-expanded` 表明列表是否展开。列表是一个由 `option` 组成的 `listbox`。高亮的选项带有 `aria-selected="true"`，输入框再通过 `aria-activedescendant` 指向它，这样焦点可以一直留在输入框里，屏幕阅读器也能跟上高亮的位置。

## 过去与现在

原版示例每按一次键，就把文字发给某个公共搜索引擎的建议服务：一个版本用 jQuery，另一个用同步的 `XMLHttpRequest`，在回复到达之前整个页面都会卡住。两个版本都靠拼接 HTML 字符串生成列表，所以建议内容会被当成标记解析。那个服务如今已经失效。这个版本保留了建议列表和键盘选择，改为用一次 `fetch` 读取本地文件。

## 刻意省略

- 主题列表是固定的，所以每次运行的表现都一样。
- 真正的搜索服务还需要取消已经过时的请求、显示加载状态，并等输入停顿后再发请求。这些在别的示例里：[JSONP 与 fetch + CORS 对照](../../network/README.zh-Hans.md)用 `AbortController` 取消请求，[防抖](../../../mechanisms/utilities/debounce/README.zh-Hans.md)负责等待停顿。

## 验证与来源

- `npm run test:browser` 在 Chromium、Firefox、WebKit 中输入 `graph`，期望只出现一个 **GraphQL** 选项；按下方向键和 Enter 后，期望看到 `Selected: GraphQL`；然后输入 `css`，按 Escape，检查列表已隐藏。点击建议没有测试。`npx playwright test tests/browser/visuals.spec.js` 可以单独运行这些视觉实验的测试。
- [原版示例](https://github.com/L-Jovi/latte-web/tree/1be029e8f4fdc38a0c62ec2a9569187c1659875f/vision-samples/search-input)是慕课网（imooc）上的一个练习。
- 本目录保留了原版的 GPL-2.0 [LICENSE](LICENSE)；见 [NOTICE.md](../../../NOTICE.md)。这里没有图片，也没有字体。
