const path = require('path');
const publicPath = '/';
const buildPath = 'dist';
// 配置 index.html?rule=GZZHSHAPP
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');

module.exports = {
  devtool: '',
  // 入口文件
  entry: {
    index: path.resolve(__dirname, './index.jsx')
  },
  // 发布文件
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[chunkhash].js',
    publicPath: './'
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      automaticNameDelimiter: '.',
      cacheGroups: {
        'vendors': {
          test: /[\\/]node_modules[\\/]/,
          priority: 100,
          name: 'vendors'
        }
      }
    }
  },
  mode: 'production',
  // 编译
  module: {
    // 加载机
    rules: [
      // jsx
      {
        test: /\.js[x]$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['react', 'es2015', 'stage-0'],
              plugins: [
                ["import", [{
                  "libraryName": "antd-mobile",
                  "style": 'css' // `style: true` 会加载 less 文件
                }, {
                  "libraryName": "antd",
                  "libraryDirectory": "es",
                  "style": "css" // `style: true` 会加载 less 文件
                }]],
                'syntax-dynamic-import'
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../'
            }
          },
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.join(__dirname, './postcss.config.js')
              }
            }
          }
        ]
      },
      // less
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: '../'
            }
          },
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.join(__dirname, './postcss.config.js')
              }
            }
          },
          "less-loader"
        ]
      },
      //字体图标
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              name: 'images/[hash:8].[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [ 
    new HtmlWebpackPlugin({
      title: '语法说明',
      template: path.join(__dirname, 'index.html'), // 源模板文件
      filename: 'index.html', // 输出文件【注意：这里的根路径是module.exports.output.path】
      showErrors: true,
      inject: 'body',
      chunks: ['vendors', 'index'],
      chunksSortMode: 'manual'
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash].css"
    }),
    new CleanWebpackPlugin(['dist/js', 'dist/css', 'dist/images','dist/dist.zip']),
    new ZipPlugin({
      path:path.join(__dirname,'dist'),
      filename: 'dist/dist.zip'
    })
  ]
}