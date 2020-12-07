const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    index: [path.resolve(__dirname, '../app.js')],
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash:8].js',
    chunkFilename:'[name].[chunkhash:8].js',
  },

  devServer: {
    hot: true,
    contentBase: path.join(__dirname, '../dist'),
    compress: true, // enable gzip
    port: 8080,
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
      filename: path.resolve(__dirname, '../dist/index.html')
    })
  ]
};
