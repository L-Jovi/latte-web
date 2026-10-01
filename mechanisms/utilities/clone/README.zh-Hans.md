# 浅拷贝与深拷贝

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

复制对象图时保留共享引用和循环引用，再和 `structuredClone` 对比。“对象图”指的是一个对象，连同它指向的所有东西。

## 试一试

```sh
npm run dev
# 打开 http://127.0.0.1:4173/mechanisms/utilities/clone/
```

打开浏览器控制台。页面构造了一个对象 `source`，里面有嵌套的数组、一个 DOM 元素、一个函数、一个 Symbol 键，还有一个指回 `source` 自己的属性 `circleRef`，然后打印 `cloneDeep(source)`。现在输入 `structuredClone(source)`：它会抛出 `DataCloneError`，因为这个内置函数无法复制 DOM 元素和函数。不需要安装依赖，也不需要构建：克隆仓库后直接运行 `npm run dev` 即可。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/mechanisms/utilities/clone/index.html)。

## 原理

浅拷贝只复制最外面一层：嵌套的对象由原对象和副本共用。深拷贝连嵌套的对象也一起复制。难点在于，对象图里可能有两处指向同一个对象，也可能有属性指回自己。

[clone.js](clone.js)（11 行）是浅拷贝：把自身的每个可枚举属性复制到一个新对象上。页面没有加载这个文件。

[clone-deep.js](clone-deep.js)（32 行）是深拷贝。它用一个 `WeakMap` 记录每个原对象对应的副本，复制任何东西之前都先查一下：已经复制过的对象，直接拿回同一个副本。仅凭这一条规则，共享引用和循环引用就都保住了：原来指向同一个对象的两个属性，现在指向同一个副本；原来指回原对象的属性，现在指回副本。

它会复制普通对象、数组、`Map`、`Set`、`Date` 和 `RegExp`。其他东西，比如 DOM 元素、类的实例和函数，都保持原样：副本和原对象指向同一个东西。属性连同它的描述符（是否可写、可枚举、可配置）一起复制，Symbol 键也不例外；getter 会原样复制成 getter，而不会被调用。稀疏数组里的空位也会保留。

## 过去与现在

以前做深拷贝，要么用 `JSON.parse(JSON.stringify(x))`，要么用某个库。JSON 的办法会把日期变成字符串，把 `Map` 和 `Set` 变成空对象，把共享的对象复制成两份，遇到循环引用还会直接抛错。如今 [`structuredClone`](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone) 已经内置：所有主流浏览器从 2022 年起都支持它，Node.js 从 17 版起支持。它能保留循环引用，但复制方式和 `cloneDeep` 不同（[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)）：遇到函数和 DOM 节点会抛出 `DataCloneError`；getter、setter 和属性描述符不会被复制；原型链不会被复制；`RegExp` 的 `lastIndex` 也会丢失。

## 刻意省略

- 普通对象、数组、`Map`、`Set`、`Date`、`RegExp` 以外的东西都是共用，而不是复制，包括类型化数组、`Error` 对象和你自己定义的类的实例。
- 冻结的对象复制出来就不再冻结：每个属性都保留了原来的描述符，但副本上又可以添加新属性了。
- `clone.js` 总是返回一个普通对象，所以数组复制出来会变成键为 `0`、`1`、`2` 等等的对象；它还会跳过 Symbol 键。

## 验证与来源

- `npm test` 用一个对象检查 `cloneDeep`：这个对象指向自己；用两个名字和一个 Symbol 键引用同一个子对象；有一个 `Map`，以这个子对象为键，值是一个包含它的 `Set`；还有一个稀疏数组。测试检查副本是一个新对象，副本里的循环指向副本自己，所有指向子对象的引用都指向同一个复制出来的子对象，稀疏数组保留了长度和空位，以及 `cloneDeep(null)` 返回 `null`。`clone.js` 没有单元测试。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开这个页面，只要抛出错误或有文件加载失败就会报错。
- [迁移清单](../../../docs/migration.zh-Hans.md)链接到最初的版本。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../../NOTICE.md)。
