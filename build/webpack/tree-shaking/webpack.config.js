const path = require('path')

module.exports = {
  mode: 'production',

  entry: './src/index.js',

  // optimization: {
  //   usedExports: true,
  // },

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
}
