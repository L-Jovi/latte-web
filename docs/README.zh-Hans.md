# 阅读指南

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

选一个问题，运行能回答它的示例，再去读代码。每个示例都是独立的：这是一个合集，不是一个完整的应用。

## 从一个问题开始

| 问题                                      | 推荐路线                                                                                                                                                                                 | 你会看到什么                                                                 |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| 在任何框架介入之前，JavaScript 做了什么？ | [基础](../fundamentals/README.zh-Hans.md) → [从零实现 Promise](../mechanisms/promise/README.zh-Hans.md) → [React 风格的渲染器](../mechanisms/mini-react/README.zh-Hans.md)               | this 是怎样确定的，异步代码按什么顺序执行，以及组件是怎样更新的。            |
| 构建工具到底产出了什么？                  | [手写打包器](../mechanisms/bundlers/README.zh-Hans.md) → [webpack 逐项拆解](../tooling/webpack/README.zh-Hans.md) → [一个组件库，三种构建方式](../examples/components/README.zh-Hans.md) | 依赖图怎样变成文件，这些文件又怎样被真实的使用方加载。                       |
| 写应用的方式为什么变了？                  | [2018 版 Todo](../examples/react-classic/README.zh-Hans.md) ↔ [今天的 Todo](../examples/react-modern/README.zh-Hans.md) → [全栈 GraphQL](../examples/graphql/README.zh-Hans.md)          | 同样的 Todo 功能用两种方式来写，然后再接入网络 API 和数据库。                |
| 浏览器交互是怎样工作的？                  | [可编辑文本里的光标与选区](../mechanisms/selection/README.zh-Hans.md) → [视觉实验](../examples/visuals/README.zh-Hans.md) → [离线访问](../examples/service-worker/README.zh-Hans.md)     | 重新渲染后恢复的光标，可以拖动的图形，以及关掉服务器后依然能重新加载的页面。 |
| 页面速度的数字该怎么读？                  | [2019 年怎样测页面速度](history/performance/README.zh-Hans.md) → [今天怎样测页面速度](../examples/performance/README.zh-Hans.md)                                                         | 为什么当年的“加载时间”容易误导人，以及现在的指标衡量的是什么。               |

## 命令

在仓库根目录运行，需要 Node 24 LTS 和 npm 11。`npm ci` 从同一份锁文件安装全部依赖，并且只运行 `package.json` 中 `allowScripts` 列出的安装脚本。SQLite 驱动是原生包：在 macOS（Apple 芯片）和 Linux 上会安装预编译好的二进制文件，其他平台可能需要 C/C++ 编译器。只有 WebAssembly 相关命令需要 Rust。

| 命令                                       | 作用                                                                                                                             |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`                              | 在 http://127.0.0.1:4173 提供学习索引页。纯 HTML 页面不装依赖也能看。它不会启动 API 服务。                                       |
| `npm run typecheck`                        | 检查 TypeScript workspace 的类型，并生成 Prisma client。                                                                         |
| `npm run build`                            | 构建所有 workspace，包括组件库的各种产物和 Storybook。                                                                           |
| `npm test` / `npm run test:aplus`          | 测试手写机制，并运行 Promises/A+ 测试集。                                                                                        |
| `npm run test:tooling`                     | 运行打包器的产物，并用一个独立的使用方加载打包好的库。                                                                           |
| `npm run test:apps`                        | 运行应用和渲染器的 Testing Library、Vitest 测试。                                                                                |
| `npm run test:api`                         | 创建临时 SQLite 数据库，通过真实的 HTTP 和 WebSocket 连接测试 API。                                                              |
| `npm run test:browser`                     | 在 Chromium、Firefox、WebKit 中打开每个示例，使用临时数据库和本地服务。先运行 `npx playwright install chromium firefox webkit`。 |
| `npm run build:wasm` / `npm run test:wasm` | 运行 Rust 测试，编译模块，并在三种浏览器中调用它。                                                                               |
| `npm run check:docs`                       | 检查生成的页面是否最新、所有文档和图片链接是否有效、每个中文页面是否注明了对应的英文版，以及每个原始文件是否都有去向。           |
| `npm run check`                            | 运行类型检查、全部构建，以及上面除浏览器和 WebAssembly 测试以外的所有检查。                                                      |

浏览器测试和 API 测试不会碰 `db:setup` 创建的数据库。它们会占用 4173、4000、4001 和 4002 端口，所以请先停掉你自己启动的 demo。测试输出写在 `test-results/`、`playwright-report/` 或 `output/` 里，这些目录都被 Git 忽略。

## 从示例得出结论之前

先读[生态是怎样变过来的](ecosystem.zh-Hans.md)了解背景，读[迁移清单](migration.zh-Hans.md)了解旧文件去了哪里，再读[检查覆盖了什么](verification.zh-Hans.md)了解每个示例的边界。

## 修改索引

`docs/catalog.json` 列出了每个示例的标题、一句话摘要和演示页面。`docs/migration.json` 记录了每个原始文件的新位置。修改其中任何一个之后，运行 `npm run docs:generate`：它会重写根 README 里的学习路线部分、各分区索引、`index.html` 和迁移清单。如果生成的文件不是最新的，`npm run check:docs` 会报错。

贡献通过 PR 合入受保护的 `main` 分支，详见 [CONTRIBUTING.md](../CONTRIBUTING.md)。在线演示从 `main` 部署到 GitHub Pages；不会向 npm 发布任何包。
