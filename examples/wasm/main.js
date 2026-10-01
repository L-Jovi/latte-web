let module;
const output = document.querySelector('output');
// The page shows one language at a time (assets/language.js). Its own two
// messages also come in Chinese, where the command stays code; a number, or an
// error from the browser, is shown as it is. The last text is kept, so that a
// language switch can write it again.
const chinese = new Map([
  ['Enter signed 32-bit integers', '请输入有符号 32 位整数'],
  [
    'Build the Rust module with npm run build:wasm',
    '请先用 <code>npm run build:wasm</code> 构建 Rust 模块',
  ],
]);
let said = null;
function say(text) {
  said = text;
  if (document.documentElement.dataset.language === 'zh' && chinese.has(text))
    output.innerHTML = chinese.get(text);
  else output.textContent = text;
}
document.addEventListener('languagechange', () => {
  if (said !== null) say(said);
});
// The site bar before the heading has a button of its own: the language switch.
document.querySelector('h1 ~ button').onclick = async () => {
  try {
    const values = ['a', 'b'].map((id) =>
      Number(document.getElementById(id).value),
    );
    if (
      values.some(
        (value) =>
          !Number.isInteger(value) || value < -2147483648 || value > 2147483647,
      )
    )
      throw new Error('Enter signed 32-bit integers');
    if (!module) {
      const response = await fetch(import.meta.env.BASE_URL + 'add.wasm');
      if (!response.ok)
        throw new Error('Build the Rust module with npm run build:wasm');
      module = await WebAssembly.instantiate(await response.arrayBuffer());
    }
    say(String(module.instance.exports.add(...values)));
  } catch (error) {
    say(error.message);
  }
};
