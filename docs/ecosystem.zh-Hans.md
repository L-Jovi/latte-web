# 生态演进与保留理由

[English](ecosystem.md) | 简体中文

核对日期：2026-09-28。现代方案减少重复工作；手写实现解释被封装的机制。两者各有目的，不以年份判断教学价值。

| 主题       | 经典入口                                        | 当前对照                                           | 取舍                                                                                                                 |
| ---------- | ----------------------------------------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| React 应用 | class/connect/Immutable/Saga                    | Hooks/TypeScript/RTK/RTK Query                     | 保留相同 Todo 操作和路由行为；现代 Redux 减少手动 action／缓存连接，经典版仍便于理解这些边界。                       |
| 构建流程   | Grunt, Gulp, Babel, Webpack                     | Vite 8                                             | 保留任务编排和依赖图教学。小应用用 Vite，Webpack 专题继续展示 loader、分块和插件。                                   |
| 组件       | Repeated CRA/library shells                     | One Card/Button source; three outputs              | 一份 Card／Button 源码比较 Babel 转译与 Webpack／Vite 打包，并真正加载输出；Storybook 展示同一组组件。               |
| 测试       | React 0.14/Enzyme/shallow examples              | Testing Library, Vitest, Playwright                | 旧用例保留当时的测试模型；当前检查关注可观察行为和浏览器状态变化。                                                   |
| 富文本     | Selection/Range and Draft.js                    | Lexical                                            | 原生光标机制仍然有价值。Draft 展示受控不可变状态，Lexical 管理编辑器状态与命令／插件；二者对相同文本格式化并序列化。 |
| 网络       | JSONP and old Fetch claims                      | Fetch, CORS, AbortController                       | 脚本执行与读取响应有不同信任边界。现在可显式取消；教学接口全部本地化。                                               |
| GraphQL    | express-graphql, old Apollo, committed database | graphql-http, Apollo 5/4, graphql-ws, Prisma 7     | 区分 HTTP 基础与带持久化的鉴权应用。seed／迁移可重建数据，订阅在写入完成后发布。                                     |
| 浏览器交互 | Mouse/Touch Events, manual tracks and timers    | Pointer Events, Scroll Snap, native animation      | 保留坐标、阈值和缓动计算；现代 API 减少事件分支与动画生命周期管理。                                                  |
| 性能       | Dated performance.timing research               | Navigation Timing, PerformanceObserver, Web Vitals | 旧证据按日期保留；新埋点处理能力缺失，不把历史结果改写成新基准。                                                     |

根锁文件固定稳定版本，兼容修补与范围写在各子项目 README。没有第三方 fork 或忽略 peer 依赖的安装。

核对来源：[React class support](https://react.dev/reference/react/Component), [Redux migration](https://redux.js.org/usage/migrating-to-modern-redux), [CRA retirement](https://react.dev/blog/2025/02/14/sunsetting-create-react-app), [Vite releases](https://vite.dev/releases), [Apollo subscriptions](https://www.apollographql.com/docs/apollo-server/data/subscriptions), [Web Vitals](https://web.dev/articles/vitals).
