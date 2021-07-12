const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FileListPlugin = require('./plugins/file-list-plugin')

module.exports = {
  mode: 'production',

  entry: './src/index.js',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Webpack Plugin Forge'
    }),
    new FileListPlugin(),
  ]
}
