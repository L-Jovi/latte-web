# 验证范围与限制

[English](verification.md) | 简体中文

维护基线：Node 24、npm 11，验证环境为 macOS arm64 与 GitHub Actions 的 Ubuntu 24.04。入口清单来自 `catalog.json`，历史映射来自 `migration.json`／`baseline-disposition.json`，不是人工挑出的成功样本。

| 检查                                      | 实际边界                                                                                                                                       |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run check`                           | 类型、全部 workspace 构建、机制、Promise/A+、工具消费者、组件行为、真实 API／数据库／订阅、本地文档链接。                                      |
| `npm run test:browser`                    | 每个登记的可运行页面，以及经典／现代 Todo、更新、路由历史、富文本、网络、离线、GraphQL 和视觉交互。每个用例在 Chromium、Firefox、WebKit 执行。 |
| `npm run build:wasm`、`npm run test:wasm` | Rust 导出函数的测试、真实 wasm 编译和三个引擎的浏览器调用。普通 JavaScript 安装不依赖 Rust。                                                   |
| GitHub `verify`                           | 聚合 `checks`、`browser`、`wasm` 三个 job；任一个失败、取消或跳过都会阻止合入。                                                                |

保留的限制：

- mini React 采用同步的局部整树替换，嵌套状态和焦点可能重建；不是 React 的完整 reconciliation。最小 Promise 只解释状态机，A+ 版本单独接受标准测试。
- Draft.js 是已停止维护的历史路线，本例只承诺已验证的编辑、加粗和序列化。真实输入法组合输入和物理移动设备手势仍需人工验证；自动化 Touch 事件为合成输入，鼠标／指针与键盘使用浏览器真实输入。
- WebKit 1.63 的 [离线模拟问题](https://github.com/microsoft/playwright/issues/42775) 已经复现。三个引擎均通过停止真实源站后的缓存重载；无 worker 的负对照必须失败。Chromium／Firefox 另用离线开关检查指示状态。
- Web Vitals 依赖浏览器支持与访问生命周期；缺少指标显示不可用或等待，不填零。测试证明采集链有效，不证明性能提升、用户分位数或历史实验复现。
- GraphQL 是本机单进程教学服务，使用虚构账户、有限分页和内存消息，不提供生产部署、密码恢复、限流或持久订阅保障。
- Prisma 的配置／未使用 MySQL 间接依赖有范围明确的修补版本，见 [服务端说明](../examples/graphql/server/README.zh-Hans.md)。安装遵守根 `allowScripts`；不会忽略 peer 兼容检查。
- Storybook 在本地受限文件系统下可能尝试创建用户级设置文件并报告 EPERM；构建与故事渲染仍有独立检查。仓库关闭遥测，不修改用户级配置来消除这条提示。
- 文档检查覆盖仓库内链接、图片、入口和 README 语言对应；外部历史网站的可用性没有保证。

退役源码可以从清单中的固定提交恢复。删除旧数据库和生成物只改变当前树，不重写历史。仓库没有统一版本号，也没有 npm 发布或网站部署步骤。
