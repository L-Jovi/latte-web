const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app.js', // 入口文件

  output: {
    path: path.resolve(__dirname, 'dist'), // 定义输出目录
    filename: 'webpack.bundle.js'  // 定义输出文件名称
  },

  devServer: {
    hot: true, // 热替换
    contentBase: path.join(__dirname, 'dist'), // server文件的根目录
    compress: true, // 开启gzip
    port: 8080, // 端口
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      template: './index.html',
      filename: path.resolve(__dirname, 'dist/index.html')
    })
  ]
};
