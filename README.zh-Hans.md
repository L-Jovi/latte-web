# latte-web

[English](README.md) | 简体中文

一组解释 Web 如何工作的学习实验：先看可观察的行为，再读最小实现，最后比较现代工具解决了哪些问题。手写练习有明确边界，并不作为生产库发布。

## 开始阅读与运行

需要 Node 24 LTS 和 npm 11。在仓库根目录执行：

```sh
npm ci
npm run build
npm run dev
# Open http://127.0.0.1:4173
```

应用和工具链的命令写在各项目 README；根入口提供静态实验导航。普通 JavaScript 安装不需要 Rust。

## 学习路线

按基础 → 手写机制 → 工具链 → 应用实践阅读，也可以直接选一个问题。

### 基础

- [JavaScript 基础](fundamentals/javascript/README.zh-Hans.md) — maintained
- [call、apply 与 bind](fundamentals/javascript/context/README.zh-Hans.md) — maintained
- [构造与原型查找](fundamentals/javascript/instance/README.zh-Hans.md) — maintained
- [Class 与函数继承](fundamentals/javascript/classes/README.zh-Hans.md) — maintained
- [Promise 链与 await](fundamentals/javascript/async-await/README.zh-Hans.md) — maintained
- [事件与调度](fundamentals/events/README.zh-Hans.md) — maintained
- [布局与 transform](fundamentals/browser/README.zh-Hans.md) — maintained
- [CSS 布局](fundamentals/css/README.zh-Hans.md) — maintained
- [HTML 语义](fundamentals/html/README.zh-Hans.md) — maintained
- [类型与显式 Redux 风格 reducer](fundamentals/typescript/README.zh-Hans.md) — maintained

### 手写机制

- [Promise：三个层次](mechanisms/promise/README.zh-Hans.md) — maintained
- [Generator 状态机](mechanisms/generator/README.zh-Hans.md) — maintained
- [小型设计模式](mechanisms/design-patterns/README.zh-Hans.md) — maintained
- [继承与反例](mechanisms/design-patterns/inherit/README.zh-Hans.md) — maintained
- [属性代理与事件委托](mechanisms/design-patterns/proxy/README.zh-Hans.md) — maintained
- [发布与订阅](mechanisms/design-patterns/pub-sub/README.zh-Hans.md) — maintained
- [小型 JavaScript 工具](mechanisms/utilities/README.zh-Hans.md) — maintained
- [浅拷贝与对象图复制](mechanisms/utilities/clone/README.zh-Hans.md) — maintained
- [循环与重复引用](mechanisms/utilities/circle-ref/README.zh-Hans.md) — maintained
- [防抖](mechanisms/utilities/debounce/README.zh-Hans.md) — maintained
- [前沿节流](mechanisms/utilities/throttle/README.zh-Hans.md) — maintained
- [计时器漂移](mechanisms/utilities/timer/README.zh-Hans.md) — maintained
- [十进制字符串格式化](mechanisms/utilities/format/README.zh-Hans.md) — maintained
- [链式求和](mechanisms/utilities/add/README.zh-Hans.md) — maintained
- [两种手写打包器](mechanisms/bundlers/README.zh-Hans.md) — maintained

### 工具链

- [Webpack 构建专题](tooling/webpack/README.zh-Hans.md) — maintained
- [入口与输出](tooling/webpack/getting-started/README.zh-Hans.md) — maintained
- [资源与 loader](tooling/webpack/asset-management/README.zh-Hans.md) — maintained
- [多个入口](tooling/webpack/output-management/README.zh-Hans.md) — maintained
- [开发与源码映射](tooling/webpack/development/README.zh-Hans.md) — maintained
- [模块热替换](tooling/webpack/hot-module-replacement/README.zh-Hans.md) — maintained
- [按需加载](tooling/webpack/lazy-loading/README.zh-Hans.md) — maintained
- [共享依赖](tooling/webpack/code-splitting/README.zh-Hans.md) — maintained
- [内容哈希与缓存](tooling/webpack/caching/README.zh-Hans.md) — maintained
- [开发与生产构建](tooling/webpack/production/README.zh-Hans.md) — maintained
- [未使用的导出](tooling/webpack/tree-shaking/README.zh-Hans.md) — maintained
- [模块边界上的旧全局变量](tooling/webpack/shimming/README.zh-Hans.md) — maintained
- [编译生命周期插件](tooling/webpack/plugins/README.zh-Hans.md) — maintained
- [打包后的数字字典](tooling/webpack/library/README.zh-Hans.md) — maintained
- [Grunt 声明式文件任务](tooling/grunt/README.zh-Hans.md) — maintained
- [Less 编译与原生 CSS 变量](tooling/less/README.zh-Hans.md) — maintained
- [模板编译与转义](tooling/handlebars/README.zh-Hans.md) — maintained
- [任务顺序与 TypeScript](tooling/gulp-typescript/README.zh-Hans.md) — maintained
- [Webpack 中的 React 属性类型](tooling/webpack-typescript/README.zh-Hans.md) — maintained

### 应用与浏览器实验

- [Card、Button 与三种打包方式](examples/components/README.zh-Hans.md) — maintained

## 验证与维护状态

```sh
npm run check
npx playwright install chromium firefox webkit
npm run test:browser
```

`maintained` 表示纳入当前检查；`historical` 仅作有出处的历史阅读。每个项目文档说明测试覆盖与刻意简化。没有统一产品版本或发布承诺。

迁移仍分批进行：旧目录中的内容暂不属于已维护运行集合。

[迁移清单](docs/migration.zh-Hans.md) · [贡献](CONTRIBUTING.md) · [行为准则](CODE_OF_CONDUCT.md) · [安全报告](SECURITY.md)

## 许可

原创代码使用 [MIT](LICENSE)。保留的第三方代码、GPL/ISC 子项目及署名以各目录和 [NOTICE](NOTICE.md) 为准；根许可证不覆盖这些许可。历史原文保留原语言。
