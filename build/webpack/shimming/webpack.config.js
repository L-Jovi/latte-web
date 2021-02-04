const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',

  entry: {
    polyfills: './src/polyfills',
    index: './src/index.js',
  },

  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  module: {
    rules: [
      {
        test: require.resolve('./src/index.js'),
        use: 'imports-loader?wrapper=window',
      },
      // change global to module
      // {
      //   test: require.resolve('./src/globals.js'),
      //   use:
      //   'exports-loader?type=commonjs&exports[]=file&exports[]=multiple|helpers.parse|parse',
      // },
    ],
  },

  plugins: [
    new webpack.ProvidePlugin({
      join: ['lodash', 'join'],
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      templateContent: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Shimming</title>
            <script>
              const modernBrowser = 'fetch' in window && 'assign' in Object;

              if (!modernBrowser) {
                const scriptElement = document.createElement('script');

                scriptElement.async = false;
                scriptElement.src = '/polyfills.bundle.js';
                document.head.appendChild(scriptElement);
              }
            </script>
          </head>

          <body>
            <script src="index.bundle.js"></script>
          </body>
        </html>
      `
    }),
  ],
}
