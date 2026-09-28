const path = require('node:path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// Each topic's page takes its title and summary from the learning catalog.
const site = require('../../scripts/site.cjs');
const root = path.resolve(__dirname, '../..');
module.exports = function base(context) {
  const html = path
    .relative(root, path.join(context, 'dist/index.html'))
    .split(path.sep)
    .join('/');
  return {
    context,
    mode: 'production',
    entry: './src/index.js',
    output: {
      path: path.join(context, 'dist'),
      filename: 'bundle.js',
      clean: true,
    },
    plugins: [new HtmlWebpackPlugin({ templateContent: site.page(html) })],
    devServer: {
      host: '127.0.0.1',
      port: 4180,
      hot: true,
      // Built pages link the house stylesheet from the repository root.
      static: { directory: path.join(root, 'assets'), publicPath: '/assets' },
    },
  };
};
