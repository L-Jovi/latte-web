# 浅拷贝与对象图复制

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

比较复制属性与重建对象图，并保留引用关系。

## 运行与观察

在仓库根执行 `npm ci`、`npm run dev`，打开 `http://127.0.0.1:4173/mechanisms/utilities/clone/index.html`。

## 阅读机制

从 [clone.js](clone.js), [clone-deep.js](clone-deep.js) 开始。

深拷贝支持普通对象、数组、Map、Set、Date、RegExp，保留循环与共享引用；复制属性描述符而不执行 getter。函数和不支持的宿主或类实例保留原引用。

## 新旧方案的联系

可与 structuredClone 对照，但其支持类型和描述符行为并不相同。

## 验证与来源

`npm test` 验证机制合同；浏览器入口由 `npm run test:browser` 验证。代码中的来源链接继续保留，[迁移清单](../../../docs/migration.zh-Hans.md) 提供原始版本入口。

## 许可证

原创代码为 MIT；第三方内容见[来源声明](../../../NOTICE.md)。
