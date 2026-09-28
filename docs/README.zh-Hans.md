# 阅读与验证指南

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

先选择问题、观察现象，再阅读负责该机制的源码。这是独立实验集合，不是一个可统一部署的产品。

| 问题                                | 推荐路线                                                                                                                                                                   | 可观察结果                               |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| 框架介入之前，JavaScript 做了什么？ | [基础](../fundamentals/README.zh-Hans.md) → [Promise](../mechanisms/promise/README.zh-Hans.md) → [mini React](../mechanisms/mini-react/README.zh-Hans.md)                  | 看清调用上下文、执行顺序和组件更新。     |
| 构建工具到底产出什么？              | [两种打包器](../mechanisms/bundlers/README.zh-Hans.md) → [Webpack 专题](../tooling/webpack/README.zh-Hans.md) → [组件打包](../examples/components/README.zh-Hans.md)       | 追踪依赖图，真正加载打包后的模块。       |
| 应用组织方式为什么变化？            | [经典 Todo](../examples/react-classic/README.zh-Hans.md) ↔ [现代 Todo](../examples/react-modern/README.zh-Hans.md) → [GraphQL 应用](../examples/graphql/README.zh-Hans.md) | 对照相同行为，再理解网络和数据库边界。   |
| 浏览器交互如何工作？                | [Selection](../mechanisms/selection/README.zh-Hans.md) → [视觉实验](../examples/visuals/README.zh-Hans.md) → [离线缓存](../examples/service-worker/README.zh-Hans.md)      | 恢复光标、改变几何位置、源站停止后重载。 |
| 怎样解释一次性能测量？              | [2019 研究](history/performance/README.zh-Hans.md) → [当前观测](../examples/performance/README.zh-Hans.md)                                                                 | 分清历史结论、原始事件和本次访问指标。   |

下列命令均在仓库根目录执行，使用 Node 24 LTS 和 npm 11。`npm ci` 使用一份锁文件与已审阅的原生安装脚本白名单。SQLite 的原生包在已验证的 macOS arm64／Linux CI 环境安装 Node 24 对应构建；其他平台可能需要该包的编译前置条件。只有 WASM 命令需要 Rust。

| 命令                                       | 验证范围                                                                                                                 |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `npm run dev`                              | 在 127.0.0.1:4173 提供静态学习入口，不启动 API。                                                                         |
| `npm run typecheck`                        | 检查 TypeScript workspace，并生成 Prisma 类型。                                                                          |
| `npm run build`                            | 构建全部 JavaScript workspace，包括组件消费者和 Storybook。                                                              |
| `npm test` / `npm run test:aplus`          | 验证有边界的机制与标准 Promise/A+ 用例。                                                                                 |
| `npm run test:tooling`                     | 执行打包图和真实库消费者。                                                                                               |
| `npm run test:apps`                        | 运行 Testing Library／Vitest 行为与 renderer 检查。                                                                      |
| `npm run test:api`                         | 重建临时 SQLite，执行真实 HTTP／WebSocket 请求。                                                                         |
| `npm run test:browser`                     | 在 Chromium、Firefox、WebKit 验证构建入口、本地服务和临时数据；先运行 `npx playwright install chromium firefox webkit`。 |
| `npm run build:wasm` / `npm run test:wasm` | 运行 Rust 测试、编译模块，再由三个浏览器调用。                                                                           |
| `npm run check:docs`                       | 检查文档／图片本地链接、双语 README、目录入口和基线覆盖。                                                                |
| `npm run check`                            | 串联类型检查、全部 JavaScript 构建与上述非浏览器检查。                                                                   |

浏览器／API 测试不会重置 `db:setup` 创建的应用数据库。测试服务使用 4173、4000、4001、4002 端口，运行前停止另外启动的 demo。输出放在已忽略的 `test-results/`、`playwright-report/` 或 `output/`。

在推广某个例子前，先读[生态取舍](ecosystem.zh-Hans.md)、[迁移清单](migration.zh-Hans.md)和[验证边界](verification.zh-Hans.md)。`docs/catalog.json` 管理当前入口，`docs/migration.json` 用最长路径前缀管理历史映射；修改后运行 `npm run docs:generate`。生成器还输出 `baseline-disposition.json`，为每个原文件记录实际命中的决定。

通过[受保护 main 的 PR](../CONTRIBUTING.md)贡献；没有 npm 发布或网站部署流程。
