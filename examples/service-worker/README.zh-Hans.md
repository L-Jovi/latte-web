# 可重复的离线缓存

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

不依赖应用框架，观察注册、安装、激活、请求拦截和主动清理。

根目录运行 `npm run dev`，打开 http://127.0.0.1:4173/examples/service-worker/。点击 **Enable offline cache**，等到 `Offline cache ready` 后，在 DevTools 开启离线并重载。标题和 `Offline` 仍能显示。恢复在线，点击 **Clear this experiment**，再重载以释放当前控制器。

从 `app.js` 阅读正确的 `navigator.serviceWorker.register`、作用域与控制器切换；从 `service-worker.js` 阅读 `event.respondWith` 和缓存生命周期。安装预存三个静态 URL，网络优先读取成功响应，网络失败时回退缓存；激活时只清理本实验旧版本。

只处理本实验已知 GET 资源，不缓存身份凭据和 API，不实现通用离线路由、冲突合并或后台同步。localhost 可用安全上下文例外；远端通常需要 HTTPS。修改缓存名可观察升级。清理只作用于自己的注册和缓存前缀。

`npx playwright test tests/browser/network.spec.js` 在三个浏览器中停止真实源站、验证缓存重载，并用没有 worker 的新上下文验证请求确实失败，最后恢复服务并清理。Chromium／Firefox 还开启离线模拟；WebKit 1.63 存在[已确认的离线模拟问题](https://github.com/microsoft/playwright/issues/42775)，因此用停服验证缓存，此时 `navigator.onLine` 仍为 true。原创代码 MIT。参考：[Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)。
