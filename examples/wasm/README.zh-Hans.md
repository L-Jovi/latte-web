# 在浏览器里运行 Rust（WebAssembly）

[English](README.md) | 简体中文

> 对应英文版：2026-10-01。英文版更新后本页可能滞后。

把一个 Rust 函数编译成 .wasm，再通过按钮调用它。WebAssembly（Wasm）是一种紧凑的二进制格式，浏览器可以把它和 JavaScript 放在一起运行；这里跟着一个函数走完全程：Rust 的 `add(i32, i32)` → `.wasm` 文件 → `WebAssembly.instantiate` → 一次点击。

## 试一试

只有这个示例需要 Rust。[在线演示](https://l-jovi.github.io/latte-web/examples/wasm/dist/index.html?lang=zh)不装 Rust 也能用，因为网站构建时已经编译好了模块。想自己构建，请先用 [rustup](https://rust-lang.org/tools/install/) 安装 Rust。本目录的 `rust-toolchain.toml` 要求使用 Rust 1.98.1 和 `wasm32-unknown-unknown` 目标（也就是编译的目标平台：纯 WebAssembly），运行 `rustup toolchain install 1.98.1 --profile minimal --target wasm32-unknown-unknown` 就能把两者都装好。然后：

```sh
npm ci
npm run build:wasm
npm run dev
# 打开 http://127.0.0.1:4173/examples/wasm/dist/?lang=zh
```

点击**用 Rust 相加**：页面显示 `5`，也就是两个输入框里的数（2 和 3）之和，由编译好的 Rust 代码算出。试试 `2147483647` 和 `1`：结果会绕回到 `-2147483648`。输入带小数的数，或者超出有符号 32 位整数范围（`-2147483648` 到 `2147483647`）的数，会显示 `请输入有符号 32 位整数`。如果还没有构建模块，页面会改为显示 `请先用 npm run build:wasm 构建 Rust 模块`。

## 原理

按数据流动的顺序读这三个文件：

1. [rust/src/lib.rs](rust/src/lib.rs)（13 行）定义了 `add(a: i32, b: i32) -> i32`。`extern "C"` 和 `#[unsafe(no_mangle)]` 让它以原本的名字导出，JavaScript 才能找到它。它用的是 `wrapping_add`，所以溢出时总会绕回，这是有意为之，而且在任何构建方式下都一样。两个 Rust 单元测试检查了 `2 + 3`、`-8 + 3`、`0 + 0` 以及溢出。
2. [build.mjs](build.mjs)（29 行）先运行 `cargo test`，再运行 `cargo build --release --target wasm32-unknown-unknown`，然后把结果复制到 `public/add.wasm`，页面构建时会把它带上。`npm run build:wasm` 先运行这个脚本，再构建页面。
3. [main.js](main.js)（47 行）检查两个输入框里都是有符号 32 位整数，第一次点击时取回 `add.wasm`，用 `WebAssembly.instantiate` 把它变成模块，然后像调用普通函数一样调用 `module.instance.exports.add(a, b)`。

这里在 JavaScript 和 Wasm 之间传递的只有普通数字，所以不需要生成任何“胶水”代码。这就是原版依赖的 wasm-bindgen 被去掉的原因。如果要传字符串、对象或回调，就又需要这类生成的绑定了。

## 过去与现在

原版是一个用 TypeScript 写的 Create React App 项目：由 wasm-pack 构建模块，由 wasm-bindgen 生成加载模块的代码。React 团队在 [2025-02-14 宣布停止维护 Create React App](https://react.dev/blog/2025/02/14/sunsetting-create-react-app)。这个版本只是一个用 Vite 构建的普通页面，保留了原来的算术实验。

Rust 与 WebAssembly 工作组曾经维护着主要工具，包括 wasm-bindgen 和 wasm-pack。工作组[在 2025 年归档了它的 GitHub 组织](https://blog.rust-lang.org/inside-rust/2025/07/21/sunsetting-the-rustwasm-github-org)；wasm-bindgen 迁到了新的 wasm-bindgen 组织，并有了新的维护者；截至 2026-09，wasm-pack 也在这个组织里。WebAssembly 本身从 2017 年起就能在所有主流浏览器中运行。

## 刻意省略

- 进出的都只能是有符号 32 位整数，其他输入在调用 Rust 之前就会被拒绝。
- 不声称 Wasm 更快：两个数相加算不上性能测试。
- 两种语言之间不传递字符串、对象或共享内存，所以没有生成的绑定。

## 验证与来源

- `npm run build:wasm` 在编译之前先运行 Rust 单元测试。随后 `npm run test:wasm` 在 Chromium、Firefox、WebKit 中点击按钮，检查 `2 + 3 = 5`、`-8 + 3 = -5` 和 `2147483647 + 1 = -2147483648`，全部由编译好的模块算出。
- `npm run test:browser` 会跳过这个测试，所以其他检查都不需要 Rust。在 CI 中，一个单独的 `wasm` 任务负责安装 Rust 并运行它；只有这个任务也通过，改动才算通过。
- 网站发布之前，构建过程会编译模块，`npm run test:pages` 会在组装好的站点上点击 **Add in Rust**，并期望得到 `5`。
- `public/add.wasm` 和 `rust/target/` 是构建产物，不提交到仓库。`rust/Cargo.lock` 会提交，构建时 Cargo 带 `--locked` 运行。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../NOTICE.md)。[迁移清单](../../docs/migration.zh-Hans.md)里有原版 `wasm` 目录的链接。参考：[Rust 的 `wasm32-unknown-unknown` 目标](https://doc.rust-lang.org/rustc/platform-support/wasm32-unknown-unknown.html)、[WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface)。
