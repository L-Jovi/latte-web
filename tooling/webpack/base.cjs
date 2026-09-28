const path = require('node:path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Page titles come from the learning catalog, so tabs and the index use the same names.
const catalog = require('../../docs/catalog.json');
const root = path.resolve(__dirname, '../..');
const titleFor = (context) => {
  const entry = catalog.find((e) => path.resolve(root, e.path) === context);
  return entry ? `${entry.title} · Latte Web` : path.basename(context);
};
module.exports = function base(context) {
  return {
    context,
    mode: 'production',
    entry: './src/index.js',
    output: {
      path: path.join(context, 'dist'),
      filename: 'bundle.js',
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: titleFor(context),
      }),
    ],
    devServer: { host: '127.0.0.1', port: 4180, hot: true },
  };
};
