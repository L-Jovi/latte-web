# class extends 背后做了什么

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

对比 class extends 和老式函数继承，包括静态成员为什么也会被继承。`extends` 连起了两条原型链，老写法只连起了一条。

## 试一试

```sh
npm run dev
# 打开 http://127.0.0.1:4173/fundamentals/javascript/classes/
```

不需要安装依赖，也不需要构建：克隆仓库后直接运行 `npm run dev` 即可。打开浏览器控制台，会看到 `true`、`true`、`false`，分别对应 [extends.js](extends.js) 里的三次比较，下面逐一解释。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/fundamentals/javascript/classes/index.html)。

## 原理

每个对象都有原型：找不到某个属性时，就去原型上找。构造函数本身也是对象，所以它也有自己的原型。[extends.js](extends.js)（18 行）对比了两种写法：

1. `class C__Sub extends C__Super` 建立了两条链接：`C__Sub` 的实例会去 `C__Super.prototype` 上找，`C__Sub` 本身会去 `C__Super` 上找。第一行 `C__Sub.__proto__ === C__Super` 的结果是 `true`。
2. 老写法 `Sub.prototype = new Super()` 只建立了第一条链接。`Sub` 本身仍然和其他函数一样，去 `Function.prototype` 上找：第二行结果是 `true`，第三行 `Sub.__proto__ === Super` 是 `false`。

静态成员之所以能被继承，靠的就是第二条链接。静态成员是类本身的属性，而不是实例的属性，比如 `C__Super.create()` 这样的辅助方法。`C__Sub.create` 能顺着这条链接找到它；而在老写法里，`Sub.create` 会是 `undefined`。这个文件本身没有定义静态成员，这几次比较展示的是让静态继承成立的那条链接。

## 过去与现在

在 ES2015 加入 [`class`](https://262.ecma-international.org/6.0/#sec-class-definitions) 之前，继承都要手写，就像 extends.js 的后半部分那样。如今 `extends` 会替你把两条链接都建好（[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends)）。这个文件通过 `__proto__` 读取原型，这是一个已被弃用的旧访问器；新代码里请用 `Object.getPrototypeOf(C__Sub)` 来读（[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/proto)）。

## 刻意省略

- 这个例子只讲到原型链接为止，没有涉及 `super` 调用、字段和私有成员。
- 老写法里的 `new Super()` 执行父构造函数，只是为了造出一个原型对象。这里 `Super` 是空函数，所以没有副作用。

## 验证与来源

- 没有单元测试覆盖这个文件。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开这个页面，检查页面能正常加载、没有报错。
- [迁移清单](../../../docs/migration.zh-Hans.md)链接到原始版本，它原来位于 `es-feature/class`。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../../NOTICE.md)。
