# Rust 到 WebAssembly

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

沿着一个函数跨越语言边界：Rust `add(i32, i32)` → `.wasm` → `WebAssembly.instantiate` → 浏览器按钮。替换 CRA 外壳，保留原来的算术实验。

普通 `npm ci` 和 `npm run build` 仅处理 JavaScript。需要 Rust 时先安装 [rustup](https://rust-lang.org/tools/install/)，使用 `rust-toolchain.toml` 固定的 1.98.1 与 wasm32-unknown-unknown 目标：

```sh
npm run build:wasm
npm run dev
# 打开 http://127.0.0.1:4173/examples/wasm/dist/
npm run test:wasm
```

2 + 3 点击 **Add in Rust** 应显示 5。阅读顺序：`rust/src/lib.rs` → `build.mjs` → `main.js`。`build:wasm` 先运行真实 Rust 单测，再编译和复制模块；三个浏览器测试直接调用这份导出。缺少二进制时会提示构建命令。

这个整数 ABI 不需要生成绑定层，因此去掉原来的 wasm-bindgen 依赖；传递字符串、复杂对象或回调时，生成绑定仍有价值。只接受有符号 32 位整数；溢出明确采用环绕语义并被测试，例如 2147483647 + 1 → -2147483648。这里不声称 Wasm 能加速简单加法。二进制与 target 是生成物，不入库；Cargo.lock 入库。

CI 单独设置必需 Wasm job，普通 JavaScript job 不安装 Rust。原创代码 MIT。参考：[Rust wasm32 目标](https://doc.rust-lang.org/rustc/platform-support/wasm32-unknown-unknown.html)、[WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface)。
