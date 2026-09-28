const config = require('../base.cjs')(__dirname);
const webpack = require('webpack');
config.plugins.push(new webpack.ProvidePlugin({ join: ['lodash', 'join'] }));
module.exports = config;
