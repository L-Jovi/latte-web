# TestUtils 与 Enzyme 历史用例

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

保留用例来自阮一峰采用 MIT 的 react-testing-demo；原文也注明参考 Jack Franklin 的 Testing React Applications。它们展示 shallow rendering、TestUtils 与 Enzyme 如何断言相同 Todo 行为：标题、初始完成状态、新增、切换和删除。这些文件是历史摘录，import 指向固定基线中可恢复的旧应用，不安装历史依赖。当前对应实现是 [Testing Library 测试](../../../tests/apps/react.test.jsx)及[浏览器测试](../../../tests/browser/react.spec.js)。重复教程长文与 React 0.14 外壳退役。[上游](https://github.com/ruanyf/react-testing-demo)。

## 运行与预期

在仓库根目录执行 `npm ci`、`npm run build`，然后执行 `npm run dev`。这是阅读材料，不需要安装历史依赖。

## 从哪里读

[cases/enzyme1.test.js](cases/enzyme1.test.js), [cases/dom1.test.js](cases/dom1.test.js), [LICENSE](LICENSE)。

## 验证

`npm run test:apps` 验证当前组件与渲染器；构建后运行 `npm run test:browser`，在 Chromium、Firefox、WebKit 中验证实际行为。历史文件不执行。上文说明测试范围与刻意简化。

## 来源与许可

原创实现与这些说明使用 MIT，目录内另有许可的除外。[迁移清单](../../../docs/migration.zh-Hans.md) 提供固定原始版本，[NOTICE](../../../NOTICE.md) 记录第三方署名。
