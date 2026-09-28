const config = require('../base.cjs')(__dirname);
config.mode = 'development';
config.devtool = 'inline-source-map';
module.exports = config;
