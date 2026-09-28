# Rust to WebAssembly

English | [简体中文](README.zh-Hans.md)

Trace one function across a language boundary: Rust `add(i32, i32)` → a `.wasm` binary → `WebAssembly.instantiate` → a browser button. The example replaces the CRA shell and keeps the original arithmetic experiment.

Ordinary `npm ci` and `npm run build` only build JavaScript. To include Rust, install [rustup](https://rust-lang.org/tools/install/) and use the pinned toolchain in `rust-toolchain.toml` (1.98.1, wasm32-unknown-unknown):

```sh
npm run build:wasm
npm run dev
# Open http://127.0.0.1:4173/examples/wasm/dist/
npm run test:wasm
```

**Add in Rust** returns 5 for 2 + 3. Read `rust/src/lib.rs`, `build.mjs`, then `main.js`. `build:wasm` runs the real Rust unit tests before compiling and copying the module; browser tests call that actual compiled export in Chromium, Firefox and WebKit. Missing output produces an explicit build instruction.

This numeric ABI needs no generated binding layer, so the original wasm-bindgen dependency is unnecessary here. For strings, rich objects or callbacks, generated bindings become valuable again. The only accepted values are signed 32-bit integers; wrapping overflow is explicit and tested (2147483647 + 1 → -2147483648). This is not a claim that Wasm makes trivial arithmetic faster. The binary and target directory are generated, not committed. Cargo.lock is committed.

CI has a separate required Wasm job, while the JavaScript-only jobs need no Rust installation. Original code MIT. [Rust wasm32 target](https://doc.rust-lang.org/rustc/platform-support/wasm32-unknown-unknown.html), [WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface).
