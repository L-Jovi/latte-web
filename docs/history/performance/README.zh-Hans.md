# 2019 年怎样测页面速度

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

当年怎样用 `performance.timing` 测速，以及为什么今天要换一种方式解读。本页简要介绍 2019 年前后的常见做法，不涉及任何公司。2019 年的原报告针对的是某个具体产品，已从本仓库撤下。

## 当时测什么

最常用的起点是 `performance.timing`（Navigation Timing Level 1）。它为页面加载的每一步记下一个时间戳，两个时间戳相减，就是这一步花的时间：

| 步骤       | 计算                                  | 能看出什么                    |
| ---------- | ------------------------------------- | ----------------------------- |
| 重定向     | `redirectEnd - redirectStart`         | 跟随重定向花的时间            |
| DNS 查询   | `domainLookupEnd - domainLookupStart` | 把域名解析成地址的时间        |
| 建立连接   | `connectEnd - connectStart`           | 建立连接的时间（含 TLS）      |
| 等待服务器 | `responseStart - requestStart`        | 首字节时间（TTFB）            |
| 下载 HTML  | `responseEnd - responseStart`         | 接收文档的时间                |
| 解析 HTML  | `domInteractive - responseEnd`        | 把 HTML 解析成 DOM 的时间     |
| 完全加载   | `loadEventEnd - navigationStart`      | 到 `load` 事件执行完为止的时间 |

团队通常把三类数据放在一起看：

- **实验室工具**：在受控条件下加载页面，例如 WebPageTest、Lighthouse、PageSpeed Insights、GTmetrix。
- **真实用户监控**：把真实访客浏览器里的同一组时间戳发回收集服务。
- **自定义打点**：给产品关心的时刻计时，比如“列表出现了”。

## 为什么这些数字不好用

- “完全加载”的时间戳说明不了页面什么时候**看起来**好了，什么时候**用起来**不卡。
- 单页应用切换视图时不会重新加载页面，`performance.timing` 看不到这些切换。
- “白屏时间”“首屏时间”是各团队自己定的规则，定义各不相同，数字之间没法比较。
- 平均值会掩盖慢的访问。用百分位数（比如第 75 百分位），才能看出大多数访客的真实体验。

## 后来变了什么

- **Navigation Timing Level 2** 取代了 `performance.timing`：改读 `performance.getEntriesByType('navigation')[0]`，时间精度更高，并且从本次导航开始计时。`performance.timing` 已被弃用。
- **`PerformanceObserver`** 在性能条目产生时就推送给页面，不必再轮询。
- **Core Web Vitals**（Google，2020 年）衡量访客的真实感受：LCP（主要内容何时出现）、CLS（布局跳动有多大）、INP（页面响应输入有多快）。2024-03-12 起，INP 取代了 FID。

[性能观测实验](../../../examples/performance/README.zh-Hans.md)用可运行的代码演示这些 API，也演示了浏览器不支持其中某个 API 时该怎么处理。

## 来源

- [MDN：`performance.timing`（已弃用）](https://developer.mozilla.org/en-US/docs/Web/API/Performance/timing)
- [MDN：Navigation timing](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/Navigation_timing)
- [web.dev：Web Vitals](https://web.dev/articles/vitals)
- [web.dev：INP 正式成为 Core Web Vital](https://web.dev/blog/inp-cwv-launch)

本页写于 2026-09-28，用来替代已撤下的报告，没有转载原报告中的任何数据。
