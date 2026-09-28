const path = require('node:path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
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
    plugins: [new HtmlWebpackPlugin({ title: path.basename(context) })],
    devServer: { host: '127.0.0.1', port: 4180, hot: true },
  };
};
