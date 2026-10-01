# 今天怎样测页面速度

[English](README.md) | 简体中文

> 对应英文版：2026-10-01。英文版更新后本页可能滞后。

用 Navigation Timing、PerformanceObserver 和 Core Web Vitals 测量你自己的这次访问。浏览器给出的原始记录，和由它们算出来的指标，分开展示。

## 试一试

```sh
npm ci
npm run build -w @latte/performance
npm run dev
# 打开 http://127.0.0.1:4173/examples/performance/dist/?lang=zh
```

表格显示这次访问的三项 Core Web Vitals，它们衡量访客的感受：LCP（主要内容多快出现）、INP（页面对输入响应得多快）和 CLS（布局跳动了多少）。在支持它们的浏览器里，LCP 在页面加载后很快就会有值；INP 在你操作之前一直显示 `等待符合条件的事件`；浏览器测不了的指标会显示 `这个浏览器不支持`。

表格下方是 Navigation Timing，也就是浏览器自己记录的这次页面加载的各项时间，这里打印出 `type`、`ttfb`、`domContentLoaded` 和 `load`。再下面的列表显示最近的原始记录，比如 `navigation` 和 `paint`。然后：

- 点击**运行 120 毫秒的任务**。页面会卡住 120 毫秒，接着文字显示 `实测耗时：` 和大约 120 毫秒的耗时，列表里出现一条 `measure: controlled-work`，INP 也有了值。
- 点击**插入迟来的内容**。700 毫秒后，顶部出现一块绿色区域，把下面的内容全部往下推，CLS 的数值随之变大。

还没点任何按钮时，CLS 可能就已经有一个很小的值：页面自己的输出在加载后改变了尺寸，把下面的内容挤动了。数据不会离开这个页面。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/examples/performance/dist/index.html?lang=zh)。

## 原理

全部代码都在 [main.js](main.js)（122 行）里。

1. **先做能力检测。** `PerformanceObserver.supportedEntryTypes` 列出了当前浏览器能报告的类型。浏览器支持的指标，那一行一开始显示 `等待符合条件的事件`；不支持的显示 `这个浏览器不支持`。这样“不支持”和“还没发生”永远不会混为一谈，缺失的值也不会被显示成零。
2. **Core Web Vitals。** 官方的 web-vitals 库把原始记录换算成这三项指标，并执行它们的规则：哪些事件算数、什么时候数值才算最终结果。`onLCP` 报告 LCP（Largest Contentful Paint，最大内容绘制），即主要内容何时出现；`onINP` 报告 INP（Interaction to Next Paint），即页面对输入响应得有多快；`onCLS` 报告 CLS（Cumulative Layout Shift，累积布局偏移），即布局意外跳动了多少。设置 `reportAllChanges: true` 后，数值一变表格就更新，所以你在页面上操作时，数字可能会一直变化。LCP 和 INP 以毫秒计，CLS 没有单位。
3. **Navigation Timing。** `performance.getEntriesByType('navigation')[0]` 描述了这个文档是怎样被请求和加载的。页面打印其中四个字段：`type`、`ttfb`（首字节时间，取自 `responseStart`）、`domContentLoaded` 和 `load`，单位都是从导航开始算起的毫秒数。它会等到 `load` 事件刚结束之后才读取，因为只有 load 处理函数返回后，`loadEventEnd` 才是最终值；`main.js` 里的注释写明了这一点。
4. **原始记录。** `PerformanceObserver` 是在浏览器产生性能记录时随即接收它们的对象。几个独立的 `PerformanceObserver` 分别收集 `navigation`、`paint` 和 `measure` 记录，在浏览器支持时还会收集 `longtask`（让页面忙碌 50 毫秒或更久的任务）。页面列出最近的八条，每条写明类型、名称、开始时间和持续时间。paint 记录标记的是一个时间点：开始时间说明浏览器何时完成绘制，持续时间总是 0。在页面加载完成之前创建的观察者，可能会收到两次 navigation 记录（Chromium 152 就是这样），所以页面对每条记录只列一次。
5. **两个按钮。** **运行 120 毫秒的任务**在两次 `performance.mark` 之间用一个循环让主线程忙上 120 毫秒，再用 `performance.measure` 测出这段间隔。**插入迟来的内容**会等 700 毫秒再插入内容。CLS 不计入紧跟在输入之后的布局偏移，所以等上一会儿，这次偏移才会被算进去；这也是为什么文字随后显示 `在最近一次输入的时间窗口之后插入`。

## 过去与现在

2019 年前后，团队从 `performance.timing` 读取时间戳，再自己定义“白屏时间”“首屏时间”。后来 [Navigation Timing Level 2](https://www.w3.org/TR/navigation-timing-2/) 和 `PerformanceObserver` 取代了 `performance.timing`，[Core Web Vitals](https://web.dev/articles/vitals)（2020 年）衡量访客的真实感受。2024-03-12 起，[INP 取代 FID](https://web.dev/blog/inp-cwv-launch) 成为衡量响应速度的指标。[2019 年怎样测页面速度](../../docs/history/performance/README.zh-Hans.md)简要介绍了以前的做法，以及为什么当年的数字不好用。

## 刻意省略

- 它只测量你在一个浏览器里的这一次访问。它无法说明大多数访客的体验，那需要大量真实访问的数据和一个分位数（比如第 75 百分位）；它也无法证明某项优化真的有效。
- 页面自己的输出也会影响它报告的数字，刚加载时的 CLS 值就是例子。这里是观察这些 API 如何工作的地方，不是性能基准测试。
- 各浏览器支持的记录类型不同，所以有些行或记录可能一直是空的，或者显示 `这个浏览器不支持`。

## 验证与来源

- 构建之后，`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开这个页面：检查 Navigation Timing 里有 `ttfb`；点击 **Run 120 ms of work**，期望看到 `Measured work:` 和一条 `measure: controlled-work` 记录；检查三项指标每一行都显示了内容（数值或状态）；点击 **Insert late content**，等待新内容出现。它检查的是测量结果能正常报告，而不是页面够不够快：这里没有设定性能预算。`npx playwright test tests/browser/visuals.spec.js` 会把这个测试和视觉实验的测试一起运行。
- 来源：[Web Vitals](https://web.dev/articles/vitals)（指标定义）、[web-vitals 库](https://github.com/GoogleChrome/web-vitals)（数值何时报告），以及 [Navigation Timing Level 2](https://www.w3.org/TR/navigation-timing-2/)。
- web-vitals 包保留自己的许可。原创代码使用 MIT 许可；见 [NOTICE.md](../../NOTICE.md)。
