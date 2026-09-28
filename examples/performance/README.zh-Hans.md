# 观察浏览器性能

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

用 Navigation Timing、PerformanceObserver 与官方 web-vitals 库测量当前访问，将原始 API 记录和从中计算的指标分开。

根目录执行 `npm ci`、`npm run build -w @latte/performance`、`npm run dev`，打开 http://127.0.0.1:4173/examples/performance/dist/。**Run 120 ms of work** 制造一次有界慢交互；**Insert late content** 在 700 毫秒后引入布局变化。数据只留在页面内。

从 `main.js` 阅读：能力检测区分“不支持”与“尚未出现可记录事件”。Navigation Timing 描述文档请求／加载顺序；PerformanceObserver 收集 paint、measure 与支持时的 longtask；web-vitals 处理 LCP（最大内容绘制）、INP（交互响应）和 CLS（非预期布局移动）的生命周期与聚合规则。CLS 无量纲，另两个以毫秒计；数值可能在生命周期边界前继续变化。

单次自动化访问不能代表真实用户分位数，也不能证明优化有效；输出界面本身也可能影响测量，这是观察实验。各浏览器支持的类型不同，不支持就显示 `Unavailable`，不能填成零。旧 `performance.timing` 报告、截图和结论保存在[有日期的历史研究](../../docs/history/performance/README.zh-Hans.md)中。

`npx playwright test tests/browser/visuals.spec.js` 在三个引擎检查导航数据、真实 measure、有界工作和延迟插入，验证埋点有效，不设虚构性能预算。MIT。参考：[Web Vitals 定义](https://web.dev/articles/vitals)、[web-vitals 生命周期／API](https://github.com/GoogleChrome/web-vitals)、[Navigation Timing](https://www.w3.org/TR/navigation-timing-2/)。
