# 布局与 transform

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

比较移动同一个元素的两种方式。

## 运行与观察

在仓库根执行 `npm ci`、`npm run dev`，打开 `http://127.0.0.1:4173/fundamentals/browser/render.html`。

## 阅读机制

从 [render.html](render.html) 开始。

录制浏览器 Performance trace 后分别点击按钮。top 改变布局位置；transform 保持布局流。是否进入合成层由浏览器与页面决定。

## 新旧方案的联系

这里不写死性能倍数，也不宣称某个属性始终没有开销。

## 验证与来源

`npm test` 验证机制合同；浏览器入口由 `npm run test:browser` 验证。代码中的来源链接继续保留，[迁移清单](../../docs/migration.zh-Hans.md) 提供原始版本入口。

## 许可证

原创代码为 MIT；第三方内容见[来源声明](../../NOTICE.md)。
