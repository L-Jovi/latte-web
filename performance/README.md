# 性能监控

## 参考资料

[打造监控平台](http://fex.baidu.com/blog/2014/05/build-performance-monitor-in-7-days/)

[performance 使用](http://www.alloyteam.com/2015/09/explore-performance/)

[实现前端监控工具](https://juejin.im/post/5b7a50c0e51d4538af60d995)

## 指标定义和影响

- [W3C 对 navigation-timing 的指标定义](https://www.w3.org/TR/navigation-timing/#performancenavigation)

- [html5rocks 对 timing 的详细实用描述](https://www.html5rocks.com/en/tutorials/webperformance/basics/?redirect_from_locale=zh)

- [网页打开性能与 SEO 的直接影响 - 调研文](https://www.webpronews.com/how-page-load-speed-impacts-seo-and-user-experience/)

## 用户体验量化点

即为用户痛点

- 白屏时间
  主要因素：首字节时间和头部资源加载时间

- 首屏时间
  建议减少非首屏使用的 css 及 JS，尽快让首屏呈现
  
  > 首屏位置调用 API 开始统计 -> 绑定首屏内所有图片的 load 事件 -> 页面加载完后判断图片是否在首屏内，找出加载最慢的一张 -> 首屏时间

## 实现方案和意图

监控工具优先考虑持续监控的开源项目自建选择，以便于完全可控的监控企业内部目标

__线上工具的缺陷__

- 无法确切得知用户数
- 无法大量采样数据标本
- 无法监控复杂应用与细分功能

## 工具

- [线上网页性能分析工具 - gtmetrix](https://gtmetrix.com/)

- [Google 的 Page Speed 性能分析工具](https://developers.google.com/speed/pagespeed/insights/)

- [性能分析工具  WebPagetest](https://github.com/WPO-Foundation/webpagetest)
  开源项目，支持企业自定义搭建

  [WebPagetest 线上版本](https://www.webpagetest.org/)

  [WebPagetest 针对 EC 官网进行的桌面测试结果](https://www.webpagetest.org/result/190227_ZV_3a579e5e1145d18880d4cda9bcc4f4f8/)

- [新浪研发的 berserkJS Github 地址](https://github.com/tapir-dream/berserkJS)
  支持命令行 js 脚本调用

- [Lighthouse Github 地址](https://github.com/GoogleChrome/lighthouse)

```
// 计算加载时间
function getPerformanceTiming () {  
    var performance = window.performance;
 
    if (!performance) {
        // 当前浏览器不支持
        console.log('你的浏览器不支持 performance 接口');
        return;
    }
 
    var t = performance.timing;
    var times = {};
 
    //【重要】页面加载完成的时间
    //【原因】这几乎代表了用户等待页面可用的时间
    times.loadPage = t.loadEventEnd - t.navigationStart;
 
    //【重要】解析 DOM 树结构的时间
    //【原因】反省下你的 DOM 树嵌套是不是太多了！
    times.domReady = t.domComplete - t.responseEnd;
 
    //【重要】重定向的时间
    //【原因】拒绝重定向！比如，http://example.com/ 就不该写成 http://example.com
    times.redirect = t.redirectEnd - t.redirectStart;
 
    //【重要】DNS 查询时间
    //【原因】DNS 预加载做了么？页面内是不是使用了太多不同的域名导致域名查询的时间太长？
    // 可使用 HTML5 Prefetch 预查询 DNS ，见：[HTML5 prefetch](http://segmentfault.com/a/1190000000633364)            
    times.lookupDomain = t.domainLookupEnd - t.domainLookupStart;
 
    //【重要】读取页面第一个字节的时间
    //【原因】这可以理解为用户拿到你的资源占用的时间，加异地机房了么，加CDN 处理了么？加带宽了么？加 CPU 运算速度了么？
    // TTFB 即 Time To First Byte 的意思
    // 维基百科：https://en.wikipedia.org/wiki/Time_To_First_Byte
    times.ttfb = t.responseStart - t.navigationStart;
 
    //【重要】内容加载完成的时间
    //【原因】页面内容经过 gzip 压缩了么，静态资源 css/js 等压缩了么？
    times.request = t.responseEnd - t.requestStart;
 
    //【重要】执行 onload 回调函数的时间
    //【原因】是否太多不必要的操作都放到 onload 回调函数里执行了，考虑过延迟加载、按需加载的策略么？
    times.loadEvent = t.loadEventEnd - t.loadEventStart;
 
    // DNS 缓存时间
    times.appcache = t.domainLookupStart - t.fetchStart;
 
    // 卸载页面的时间
    times.unloadEvent = t.unloadEventEnd - t.unloadEventStart;
 
    // TCP 建立连接完成握手的时间
    times.connect = t.connectEnd - t.connectStart;
 
    return times;
}
```