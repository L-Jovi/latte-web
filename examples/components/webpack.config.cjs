const path = require('node:path');
module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist/webpack'),
    filename: 'index.cjs',
    library: { type: 'commonjs2' },
    clean: true,
  },
  externals: {
    react: 'commonjs react',
    'react/jsx-runtime': 'commonjs react/jsx-runtime',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-react', { runtime: 'automatic' }]],
          },
        },
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
};
