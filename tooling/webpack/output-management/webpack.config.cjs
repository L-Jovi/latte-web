const config = require('../base.cjs')(__dirname);
config.entry = { app: './src/index.js', print: './src/print.js' };
config.output.filename = '[name].js';
module.exports = config;
