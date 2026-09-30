# 视觉实验

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

直接在浏览器里运行的 Canvas、CSS 和指针交互实验。它们都不需要构建。

## 试一试

```sh
npm run dev
# 打开 http://127.0.0.1:4173/examples/visuals/clock/
```

每个实验都是普通的 HTML 页面，所以克隆仓库后就能直接运行，也不需要 `npm ci`。把 `clock` 换成下表里任意一个目录名即可。所有实验也都可以在[在线站点](https://l-jovi.github.io/latte-web/)上打开。

## 原理

每个目录都有自己的 README，写明可以试些什么、先读哪个文件。

| 目录           | 实验                                                           | 你会看到                                                                           |
| -------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `clock`        | [Canvas 点阵倒计时](clock/README.zh-Hans.md)                   | 用点阵画出数字；数字变化时，点会化作粒子落下。                                     |
| `canvas-image` | [用 Canvas 像素做图像处理](canvas-image/README.zh-Hans.md)     | 通过读写像素，实现缩放、水印、放大镜和滤镜。                                       |
| `drag`         | [用鼠标事件和 Pointer Events 实现拖拽](drag/README.zh-Hans.md) | 同一个拖拽写两遍；Pointer Events 同时支持触屏和手写笔。                            |
| `paging`       | [滑动翻页](paging/README.zh-Hans.md)                           | 用距离和速度阈值把滑动变成翻页，分别用 touch 事件和 Pointer Events 实现。          |
| `carousel`     | [3D 轮播与 CSS Scroll Snap](carousel/README.zh-Hans.md)        | 用几何计算排布层叠的轮播图，再让 CSS Scroll Snap 原生完成类似的事。                |
| `photo-wall`   | [CSS transform 照片墙](photo-wall/README.zh-Hans.md)           | 散落倾斜的卡片，鼠标悬停时摆正并放大。                                             |
| `search`       | [可以用键盘操作的搜索建议](search/README.zh-Hans.md)           | 边输入边筛选建议，用方向键选择；使用无障碍的 combobox 标记。                       |
| `motion`       | [导航、步骤条与环形进度](motion/README.zh-Hans.md)             | 展开的导航（JS 补间与 CSS 过渡对比）、步骤条，以及用 conic-gradient 画的环形进度。 |
| `lottery`      | [抽奖转盘](lottery/README.zh-Hans.md)                          | 转盘停下的扇区和显示的结果始终一致，用 Web Animations API 实现。                   |

除了全站共用的样式表，这些页面还共用 [style.css](style.css)。如果系统开启了“减少动态效果”，它会把所有 CSS 动画和过渡缩短到几乎为零。

[今天怎样测页面速度](../performance/README.zh-Hans.md)就在隔壁目录，但它需要单独用 Vite 构建。

## 过去与现在

这些页面最初是仓库里的 `vision-samples` 目录。原版依赖 jQuery 之类的库，借用了别人的照片和字体，其中一个示例还调用了一项如今已经失效的网络服务。新版本保留了绘制、手势和动画的代码，其余部分改用浏览器自带的功能。

贯穿其中的有三个变化：

- 鼠标事件和 touch 事件让位给了 [Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)：一套事件同时处理鼠标、触屏和手写笔，另外还有指针捕获，让一次拖动始终跟着开始时的那个元素（[拖拽](drag/README.zh-Hans.md)、[翻页](paging/README.zh-Hans.md)）。
- 手写的滑动轨道让位给了 [CSS Scroll Snap](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap)，滚动交给浏览器来做（[轮播](carousel/README.zh-Hans.md)）。
- 定时器每触发一次就走固定一步的做法，让位给了按实际经过的时间计算运动（[点阵倒计时](clock/README.zh-Hans.md)、[导航与进度](motion/README.zh-Hans.md)）。

旧写法只要还有教学价值，就和新写法放在一起：拖拽的鼠标版、翻页的 touch 版，以及手写的层叠轮播。

## 刻意省略

- 这里没有任何页面和服务器通信。搜索建议来自本地的 JSON 文件，抽奖转盘的结果在浏览器里决定。
- 图形都是自己画的 SVG、CSS 和 Canvas，没有借用的照片，也没有附带字体。
- 测试用脚本事件模拟触屏，所以真实手机或平板上的手势不会被自动检查。

## 验证与来源

- `npm run test:browser` 在 Chromium、Firefox、WebKit 中打开每个页面，并试一遍它的主要交互。鼠标和键盘操作使用浏览器的真实输入，唯一一次触屏滑动是模拟的。`npm test` 在 Node 中检查图像滤镜和轮播位置的计算。每份 README 都写明了自己的测试具体检查什么。
- 运行浏览器测试需要和 CI 一样的准备：`npm ci`、Playwright 浏览器（`npx playwright install`）以及 `npm run build`。之后运行 `npx playwright test tests/browser/visuals.spec.js`，就只跑这些页面和测页面速度示例的测试。
- [迁移清单](../../docs/migration.zh-Hans.md)在 `vision-samples` 下列出了原版示例的链接。旧的 Canvas 和课程示例注明来自慕课网（imooc），图像练习引用了 liuyubobobo.com。
- 有六个目录保留了原版示例自带的 GPL-2.0 许可：`clock`、`canvas-image`、`paging`、`carousel`、`photo-wall` 和 `search`。其余是原创代码，使用 MIT 许可。见 [NOTICE.md](../../NOTICE.md)。
