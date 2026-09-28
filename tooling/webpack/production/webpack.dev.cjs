const config = require('./webpack.config.cjs');
module.exports = {
  ...config,
  mode: 'development',
  devtool: 'inline-source-map',
};
