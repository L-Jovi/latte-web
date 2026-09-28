# 循环与重复引用

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

跟踪当前遍历路径，判断是否出现回到祖先的引用。

## 运行与观察

在仓库根执行 `npm ci`、`npm run dev`，打开 `http://127.0.0.1:4173/mechanisms/utilities/circle-ref/index.html`。

## 阅读机制

从 [check-by-iterator.js](check-by-iterator.js), [check-by-json-parser.js](check-by-json-parser.js) 开始。

遍历读取数据描述符及 Map、Set 条目，跳过访问器以免执行任意 getter。BigInt 和抛错的 toJSON 也会让 JSON 失败，因此后者仅是序列化探针。

## 新旧方案的联系

仅使用全局 visited 集合会把兄弟节点共享对象误判成循环。

## 验证与来源

`npm test` 验证机制合同；浏览器入口由 `npm run test:browser` 验证。代码中的来源链接继续保留，[迁移清单](../../../docs/migration.zh-Hans.md) 提供原始版本入口。

## 许可证

原创代码为 MIT；第三方内容见[来源声明](../../../NOTICE.md)。
