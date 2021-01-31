const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',

  entry: './src/index.js',

  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'button-scratch',
    libraryTarget: 'commonjs'
  },

  externals: [nodeExternals()],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, './src')
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin()
  ],
}
