const config = require('../base.cjs')(__dirname);
config.module = {
  rules: [
    { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    { test: /\.svg$/, type: 'asset/resource' },
    { test: /\.xml$/, type: 'asset/source' },
  ],
};
module.exports = config;
