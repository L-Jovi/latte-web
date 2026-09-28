# 函数组合

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

原 redux-scratch 实际展示的是 compose：从右向左组合函数，最内层接收全部参数；零个函数时返回恒等函数。页面结果是 10 × 10 + 10 − 2 = 108。这里没有实现 store、dispatch 或 middleware；可结合 Redux 文档理解组合在 enhancer 链中的用途。

## 运行与预期

在仓库根目录执行 `npm ci`、`npm run build`，然后执行 `npm run dev`。打开 `http://127.0.0.1:4173/mechanisms/compose/index.html`。

## 从哪里读

[index.js](index.js)。

## 验证

`npm run test:apps` 验证当前组件与渲染器；构建后运行 `npm run test:browser`，在 Chromium、Firefox、WebKit 中验证实际行为。历史文件不执行。上文说明测试范围与刻意简化。

## 来源与许可

原创实现与这些说明使用 MIT，目录内另有许可的除外。[迁移清单](../../docs/migration.zh-Hans.md) 提供固定原始版本，[NOTICE](../../NOTICE.md) 记录第三方署名。
