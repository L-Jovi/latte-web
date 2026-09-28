const config = require('../base.cjs')(__dirname);
const FileListPlugin = require('./plugins/file-list-plugin.cjs');
config.plugins.push(new FileListPlugin());
module.exports = config;
