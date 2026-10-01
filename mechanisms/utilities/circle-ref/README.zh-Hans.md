# 检测循环引用

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

区分真正的循环引用，和只是被引用了两次的对象。

## 试一试

```sh
npm run dev
# 打开 http://127.0.0.1:4173/mechanisms/utilities/circle-ref/?lang=zh
```

打开浏览器控制台。页面构造了一个对象，它的 `circleRef` 属性指回对象自己，两种检查都打印 `true`。不需要安装依赖，也不需要构建：克隆仓库后直接运行 `npm run dev` 即可。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/mechanisms/utilities/circle-ref/index.html?lang=zh)。

## 原理

循环引用（也叫“环”）是指顺着一串属性走下去，能从一个对象回到它自己，例如 `obj.circleRef = obj`。一个对象被引用两次并不构成循环：在 `{ one: child, two: child }` 里，不管怎么顺着属性走，都回不到起点。

[check-by-iterator.js](check-by-iterator.js)（16 行）遍历整个对象，但只记住当前路径上的对象，也就是从最外层的对象一直到正在查看的那个对象。如果遇到一个已经在路径上的对象，说明有路可以绕回去，这就是循环。处理完一个对象后，它会把这个对象从路径上拿掉。所以在 `two` 下面第二次遇到 `child`，并不算循环。

遍历时会查看 `Map` 的键和值、`Set` 的值，以及其他对象自身的每个属性，包括以 Symbol 为键的属性。它会跳过 getter，所以检查对象时绝不会调用 getter。

[check-by-json-parser.js](check-by-json-parser.js)（5 行）调用 `JSON.stringify`，一旦抛错就报告存在循环。这只是一个快速的试探：值里有 `BigInt`，或者某个 `toJSON` 方法抛错时，`JSON.stringify` 同样会抛错，所以报错并不能证明存在循环。

## 过去与现在

常见的第一种写法是用一个列表记住所有见过的对象。这样只要两个属性指向同一个对象，就会被误报为循环；`check-by-iterator.js` 的第一个版本就是这么写的。截至 2026-09，JavaScript 仍然没有内置的循环检测，所以要自己找出循环，就得像这里一样，一边遍历一边记录当前路径。

## 刻意省略

- 函数不会被遍历，所以经过函数属性形成的循环找不到；只能通过 getter 才能到达的循环也找不到。

## 验证与来源

- `npm test` 用三种情况检查 `isCycleByIterator`：两个属性指向同一个子对象，不算循环；给子对象加上一个指回父对象的属性后，算循环；`null` 不算循环。`isCycleByJSON` 没有单元测试。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开这个页面，只要抛出错误或有文件加载失败就会报错；它不检查输出。
- [迁移清单](../../../docs/migration.zh-Hans.md)链接到最初的版本。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../../NOTICE.md)。
