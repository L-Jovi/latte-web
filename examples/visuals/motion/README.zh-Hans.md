# 导航、步骤条与环形进度

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

展开的导航（JS 补间与 CSS 过渡对比）、步骤条，以及用 conic-gradient 画的环形进度。补间（tween）是在代码里一步步算出来的动画，从起始值过渡到结束值。

## 试一试

```sh
npm run dev
# 打开 http://127.0.0.1:4173/examples/visuals/motion/
```

克隆仓库后就能直接运行，不需要 `npm ci`，也不需要构建。页面分成三个小部分：

- 导航：把鼠标移到 **JavaScript tween** 或 **CSS transition** 上，或者用 Tab 键移过去。两者都会从 180 像素展开到 260 像素，离开后再缩回去。第一个由脚本驱动动画，第二个由 CSS 驱动。
- 步骤条：点击 **Next**，高亮会从 **Read** 移到 **Run**，再到 **Compare**；**Back** 则往回走。按钮下方的文字依次显示 `Step 2 of 3` 等。
- 环形进度：拖动 **Progress** 滑块，圆环上着色的部分和中间的百分比都会跟着变。

也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/examples/visuals/motion/index.html)。

## 原理

先读 [index.html](index.html)（91 行）里的结构和 CSS，再读 [app.js](app.js)（47 行）。

- **CSS 过渡**：`transition: width 0.25s`，再在 `:hover` 和 `:focus-visible` 时设置更大的 `width`。浏览器负责播放这段变化，离开时再倒放回去。
- **JavaScript 补间**：在 `mouseenter`、`mouseleave`、`focus` 和 `blur` 时，`tween()` 读取当前宽度，用 250 毫秒把它变到 260 或 180 像素。每次 `requestAnimationFrame` 回调都根据已经过去的时间算出进度 `t`，再用 `1 - (1 - t) ** 3` 做缓动：开头快，结尾慢。新的补间会取消旧的，并从当前宽度开始，所以中途改变方向也很平滑。开启“减少动态效果”时，它会直接跳到终点。
- **步骤条**：三个 `<li>` 排成一行 flex 布局。当前这一步带有 `aria-current="step"`，告诉辅助技术你正处在哪一步，CSS 也根据这个属性设置样式。在第一步时 **Back** 被禁用，在最后一步时 **Next** 被禁用。
- **环形进度**：滑块把数值写到圆环的自定义属性（CSS 变量）`--value` 上。圆环的背景是 `conic-gradient(#087b77 calc(var(--value) * 1%), #ddd 0)`：圆周上这个百分比以内着色，之后是灰色。上面再叠一个白色圆，圆盘就变成了圆环。这个元素带有 `role="progressbar"`，`aria-valuenow` 也会随数值更新。

## 过去与现在

原版导航靠 `setInterval` 定时器展开，每次触发增加几个像素，展开和收起各复制了一份同样的定时器代码。原版还用了带浏览器前缀的旧 CSS，以及从别的项目复制来的加载圆环。

如今，像这样简单的变化交给 CSS 过渡就够了。需要知道已经过去的时间，或者想自己停下、倒转一段动画时，脚本补间仍然值得写。[`conic-gradient()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/gradient/conic-gradient) 不用图片或 SVG 就能画出圆环。

## 刻意省略

- 步骤条和圆环都只是视觉效果，背后没有真实的任务或下载。
- 每个导航只有一个链接，没有子菜单。

## 验证与来源

- `npm run test:browser` 先开启“减少动态效果”，然后在 Chromium、Firefox、WebKit 中：让每个导航链接获得焦点，检查它变成 260 像素宽；点击 **Next**，检查当前步骤是 **Run**；把滑块设为 70，检查圆环报告 `aria-valuenow="70"`。因为开启了“减少动态效果”，动画本身没有测试。`npx playwright test tests/browser/visuals.spec.js` 可以单独运行这些视觉实验的测试。
- 来源：[原版导航示例](https://github.com/L-Jovi/latte-web/tree/1be029e8f4fdc38a0c62ec2a9569187c1659875f/vision-samples/navigation)，以及[迁移清单](../../../docs/migration.zh-Hans.md)里列出的步骤条和加载圆环示例。原版圆环复制自 [frontend9/css-count-down-demo](https://github.com/frontend9/css-count-down-demo)；这里的圆环是重新写的。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../../NOTICE.md)。
