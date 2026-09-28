const path = require('node:path');
module.exports = {
  mode: 'production',
  context: __dirname,
  entry: './src/index.js',
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'numbers.cjs',
    library: { type: 'commonjs2' },
    clean: true,
  },
};
