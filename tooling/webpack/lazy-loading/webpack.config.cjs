const config = require('../base.cjs')(__dirname);
config.output.chunkFilename = '[name].[contenthash].js';
module.exports = config;
