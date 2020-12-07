const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development' ? true : false

module.exports = {
  mode: isDev ? 'development' : 'production',

  devtool: 'source-map',

  entry: {
    index: [path.resolve(__dirname, '../app.js')],
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash:8].js',
    chunkFilename:'[name].[chunkhash:8].js',
  },

  resolve: {
    modules: [
      'node_modules',
    ],
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@src': path.join(__dirname, '../src'),
    }
  },

  devServer: {
    hot: true,
    contentBase: path.join(__dirname, '../dist'),
    compress: true, // enable gzip
    port: 8080,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        include: [
          path.resolve(__dirname,'../app.js'),
          path.resolve(__dirname, '../src'),
        ],
        use: [{
          loader: 'babel-loader?cacheDirectory=true',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              [
                '@babel/plugin-transform-runtime',
                {
                  "corejs": false,
                  "helpers": true,
                  "regenerator": true,
                  "useESModules": false
                },
              ]
            ]
          }
        }]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIndentName: '[local][name]-[hash:base64:4]'
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins:[require('autoprefixer')]
            }
          }
        ]
      },
      {
        test: '/\.(le|c)ss$/',
        use: [
          // can't use MiniCssExtractPlugin in dev env
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIndentName: '[local][name]-[hash:base64:4]'
              }
            }
          },
          {
            loader: 'less-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'img/[name].[hash:8].[ext]'
              }
            }
          }
        }
      },
      {
        test: /\.(mp4|mp3|webm|ogg|wav)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'media/[name].[hash:8].[ext]'
              }
            }
          }
        }
      },
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? "'development'" : "'production'"
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebPackPlugin({
      title: 'React in Manual',
      template: path.resolve(__dirname,'../index.html'),
      filename: path.resolve(__dirname, '../dist/index.html'),
    }),
    new MiniCssExtractPlugin({
      filename:'[name].[contenthash:8].css',
      chunkFilename:'[id].[contenthash:8].css'
    }),
    new CleanWebpackPlugin(),
  ]
};
