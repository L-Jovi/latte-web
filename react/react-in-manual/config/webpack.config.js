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
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname,'../app.js'),
          path.resolve(__dirname, '../src'),
        ],
        use: [{
          loader: 'babel-loader?cacheDirectory=true',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              [
                '@babel/plugin-transform-runtime',
                {
                  "corejs": false,
                  "helpers": true,
                  "regenerator": true,
                  "useESModules": false
                },
              ]
            ]
          }
        }]
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
