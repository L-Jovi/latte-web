const config = require('../base.cjs')(__dirname);
config.output.filename = '[name].[contenthash].js';
config.optimization = {
  moduleIds: 'deterministic',
  runtimeChunk: 'single',
  splitChunks: { chunks: 'all' },
};
module.exports = config;
