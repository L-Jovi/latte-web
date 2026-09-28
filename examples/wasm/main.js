let module;
document.querySelector('button').onclick = async () => {
  const output = document.querySelector('output');
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
    output.textContent = String(module.instance.exports.add(...values));
  } catch (error) {
    output.textContent = error.message;
  }
};
