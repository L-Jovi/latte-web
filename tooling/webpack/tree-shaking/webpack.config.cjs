const config = require('../base.cjs')(__dirname);
config.optimization = { usedExports: true };
module.exports = config;
