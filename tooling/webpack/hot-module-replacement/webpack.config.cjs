const config = require('../base.cjs')(__dirname);
config.mode = 'development';
config.module = {
  rules: [{ test: /\.css$/, use: ['style-loader', 'css-loader'] }],
};
module.exports = config;
