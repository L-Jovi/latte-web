const config = require('../base.cjs')(__dirname);
config.entry = {
  index: { import: './src/index.js', dependOn: 'shared' },
  another: { import: './src/another-module.js', dependOn: 'shared' },
  shared: 'lodash',
};
config.output.filename = '[name].js';
config.optimization = {
  runtimeChunk: 'single',
  splitChunks: { chunks: 'all' },
};
module.exports = config;
