# Rust to WebAssembly in the browser

English | [简体中文](README.zh-Hans.md)

Compile a Rust function to `.wasm` and call it from a button. _WebAssembly_ (Wasm) is a compact binary format that browsers run next to JavaScript; here you follow one function all the way: Rust `add(i32, i32)` → a `.wasm` file → `WebAssembly.instantiate` → a click.

## Try it

This is the only example that needs Rust. The [live demo](https://l-jovi.github.io/latte-web/examples/wasm/dist/index.html) works without it, because the site's build compiles the module. To build it yourself, install Rust with [rustup](https://rust-lang.org/tools/install/). This folder's `rust-toolchain.toml` asks for Rust 1.98.1 with the `wasm32-unknown-unknown` target (the platform to compile for: plain WebAssembly), and `rustup toolchain install 1.98.1 --profile minimal --target wasm32-unknown-unknown` installs both. Then:

```sh
npm ci
npm run build:wasm
npm run dev
# open http://127.0.0.1:4173/examples/wasm/dist/
```

Click **Add in Rust**: the page shows `5`, the sum of the two numbers in the boxes (2 and 3), computed by the compiled Rust code. Try `2147483647` and `1`: the result wraps around to `-2147483648`. Numbers with decimals, or outside the signed 32-bit range from `-2147483648` to `2147483647`, give `Enter signed 32-bit integers`. If the module has not been built, the page says `Build the Rust module with npm run build:wasm` instead.

## How it works

Read the three files in the order the data travels:

1. [rust/src/lib.rs](rust/src/lib.rs) (13 lines) defines `add(a: i32, b: i32) -> i32`. `extern "C"` and `#[unsafe(no_mangle)]` export it under its plain name, so JavaScript can find it. It uses `wrapping_add`, so an overflow always wraps around, on purpose and in every build. Two Rust unit tests check `2 + 3`, `-8 + 3`, `0 + 0` and the overflow.
2. [build.mjs](build.mjs) (29 lines) runs `cargo test`, then `cargo build --release --target wasm32-unknown-unknown`, and copies the result to `public/add.wasm`, where the page build picks it up. `npm run build:wasm` runs this script and then builds the page.
3. [main.js](main.js) (25 lines) checks that both boxes hold signed 32-bit integers, fetches `add.wasm` on the first click and turns it into a module with `WebAssembly.instantiate`. Then it calls `module.instance.exports.add(a, b)` like any other function.

Only plain numbers cross between JavaScript and Wasm here, so no generated "glue" code is needed. That is why the original's wasm-bindgen dependency is gone. Strings, objects or callbacks would need such generated bindings again.

## Then and now

The original was a Create React App project in TypeScript: wasm-pack built the module, and wasm-bindgen generated the code that loaded it. The React team [deprecated Create React App on 2025-02-14](https://react.dev/blog/2025/02/14/sunsetting-create-react-app). This version is one plain page built with Vite, and it keeps the original arithmetic experiment.

The Rust and WebAssembly working group used to maintain the main tools, including wasm-bindgen and wasm-pack. It [archived its GitHub organization in 2025](https://blog.rust-lang.org/inside-rust/2025/07/21/sunsetting-the-rustwasm-github-org); wasm-bindgen moved to a new wasm-bindgen organization with new maintainers, and wasm-pack now lives there too (as of 2026-09). WebAssembly itself has run in all major browsers since 2017.

## Limits

- Only signed 32-bit integers go in and come out; anything else is rejected before Rust is called.
- It makes no claim that Wasm is faster: adding two numbers is not a benchmark.
- No strings, objects or shared memory pass between the two languages, so there are no generated bindings.

## Checks and credits

- `npm run build:wasm` runs the Rust unit tests before it compiles anything. `npm run test:wasm` then clicks the button in Chromium, Firefox and WebKit and checks `2 + 3 = 5`, `-8 + 3 = -5` and `2147483647 + 1 = -2147483648`, all computed by the compiled module.
- `npm run test:browser` skips this test, so the other checks need no Rust. In CI, a separate `wasm` job installs Rust and runs it, and a change only passes when that job passes too.
- Before the site is published, its build compiles the module, and `npm run test:pages` clicks **Add in Rust** on the assembled site and expects `5`.
- `public/add.wasm` and `rust/target/` are build output and are not committed. `rust/Cargo.lock` is committed, and the build runs Cargo with `--locked`.
- Original code is MIT; see [NOTICE.md](../../NOTICE.md). The [migration ledger](../../docs/migration.md) links to the original `wasm` folder. References: [the Rust `wasm32-unknown-unknown` target](https://doc.rust-lang.org/rustc/platform-support/wasm32-unknown-unknown.html) and [the WebAssembly JavaScript API](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface).
