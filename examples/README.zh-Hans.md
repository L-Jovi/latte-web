# 应用与实验

[English](README.md) | 简体中文

> 对应英文版：两种语言由同一份目录数据同时生成，内容始终同步。

完整的应用示例（新旧写法并排对照），以及视觉实验。

| 主题 | 你会看到什么 | 试一试 |
| --- | --- | --- |
| [一个组件库，三种构建方式](components/README.zh-Hans.md) | 同一组 Card 和 Button，分别用 Vite、webpack 和 Babel 构建，并实际加载每种产物。 | [在线演示](https://l-jovi.github.io/latte-web/examples/components/dist/demo/index.html) |
| [2018 年风格的 Todo：class、Redux、Saga、Immutable](react-classic/README.zh-Hans.md) | 原来的架构，修好后运行在 React 19 上。 | [在线演示](https://l-jovi.github.io/latte-web/examples/react-classic/dist/index.html) |
| [今天风格的 Todo：Hooks、TypeScript、Redux Toolkit](react-modern/README.zh-Hans.md) | 功能和 2018 版完全相同，方便两边对照阅读。 | [在线演示](https://l-jovi.github.io/latte-web/examples/react-modern/dist/index.html) |
| [用 Draft.js 做富文本（已归档）](rich-text-draft/README.zh-Hans.md) | 输入、加粗、保存为 JSON；Draft.js 已于 2023 年被 Meta 归档。 | [在线演示](https://l-jovi.github.io/latte-web/examples/rich-text-draft/dist/index.html) |
| [用 Lexical 做富文本](rich-text-lexical/README.zh-Hans.md) | 同样的输入、加粗、保存流程，换成 Draft.js 的继任者。 | [在线演示](https://l-jovi.github.io/latte-web/examples/rich-text-lexical/dist/index.html) |
| [JSONP 与 fetch + CORS 对照](network/README.zh-Hans.md) | 用两种方式读取同一份跨域数据，并用 AbortController 取消请求。 | 本地运行 |
| [用 Service Worker 实现离线访问](service-worker/README.zh-Hans.md) | 不依赖框架，完成注册、缓存、离线访问和清理。 | [在线演示](https://l-jovi.github.io/latte-web/examples/service-worker/index.html) |
| [从零搭一个 GraphQL HTTP 服务](graphql-http/README.zh-Hans.md) | Schema、resolver 和 JSON 响应：最小的一次完整 GraphQL 请求。 | 本地运行 |
| [全栈 GraphQL：Apollo、订阅与 SQLite](graphql/README.zh-Hans.md) | 一个小型链接分享站：注册登录、投票、分页和实时更新。 | 本地运行 |
| [GraphQL 服务端与数据库](graphql/server/README.zh-Hans.md) | Apollo Server + Prisma + SQLite，用迁移脚本和虚构数据重建。 | — |
| [Apollo Client 前端](graphql/client/README.zh-Hans.md) | 在 Vite 应用里发起查询、变更和实时订阅。 | — |
| [在浏览器里运行 Rust（WebAssembly）](wasm/README.zh-Hans.md) | 把一个 Rust 函数编译成 .wasm，再通过按钮调用它。 | [在线演示](https://l-jovi.github.io/latte-web/examples/wasm/dist/index.html) |
| [Canvas 点阵倒计时](visuals/clock/README.zh-Hans.md) | 用点阵画出数字；数字变化时，点会化作粒子落下。 | [在线演示](https://l-jovi.github.io/latte-web/examples/visuals/clock/index.html) |
| [用 Canvas 像素做图像处理](visuals/canvas-image/README.zh-Hans.md) | 通过读写像素，实现缩放、水印、放大镜和滤镜。 | [在线演示](https://l-jovi.github.io/latte-web/examples/visuals/canvas-image/index.html) |
| [用鼠标事件和 Pointer Events 实现拖拽](visuals/drag/README.zh-Hans.md) | 同一个拖拽写两遍；Pointer Events 同时支持触屏和手写笔。 | [在线演示](https://l-jovi.github.io/latte-web/examples/visuals/drag/index.html) |
| [滑动翻页](visuals/paging/README.zh-Hans.md) | 用距离和速度阈值把滑动变成翻页，分别用 touch 事件和 Pointer Events 实现。 | [在线演示](https://l-jovi.github.io/latte-web/examples/visuals/paging/index.html) |
| [3D 轮播与 CSS Scroll Snap](visuals/carousel/README.zh-Hans.md) | 用几何计算排布层叠的轮播图，再让 CSS Scroll Snap 原生完成类似的事。 | [在线演示](https://l-jovi.github.io/latte-web/examples/visuals/carousel/index.html) |
| [CSS transform 照片墙](visuals/photo-wall/README.zh-Hans.md) | 散落倾斜的卡片，鼠标悬停时摆正并放大。 | [在线演示](https://l-jovi.github.io/latte-web/examples/visuals/photo-wall/index.html) |
| [可以用键盘操作的搜索建议](visuals/search/README.zh-Hans.md) | 边输入边筛选建议，用方向键选择；使用无障碍的 combobox 标记。 | [在线演示](https://l-jovi.github.io/latte-web/examples/visuals/search/index.html) |
| [导航、步骤条与环形进度](visuals/motion/README.zh-Hans.md) | 展开的导航（JS 补间与 CSS 过渡对比）、步骤条，以及用 conic-gradient 画的环形进度。 | [在线演示](https://l-jovi.github.io/latte-web/examples/visuals/motion/index.html) |
| [抽奖转盘](visuals/lottery/README.zh-Hans.md) | 转盘停下的扇区和显示的结果始终一致，用 Web Animations API 实现。 | [在线演示](https://l-jovi.github.io/latte-web/examples/visuals/lottery/index.html) |
| [视觉实验](visuals/README.zh-Hans.md) | 直接在浏览器里运行的 Canvas、CSS 和指针交互实验。 | — |
| [今天怎样测页面速度](performance/README.zh-Hans.md) | 用 Navigation Timing、PerformanceObserver 和 Core Web Vitals 测量你自己的这次访问。 | [在线演示](https://l-jovi.github.io/latte-web/examples/performance/dist/index.html) |

[返回学习路线](../README.zh-Hans.md#学习路线)
