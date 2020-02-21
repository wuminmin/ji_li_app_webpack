const path = require('path');
const publicPath = '/';
const buildPath = 'dist';
// 配置 index.html?rule=GZZHSHAPP
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
    // 入口文件
    entry: {
        index: path.resolve(__dirname, './index.jsx')
    },
    // 发布文件
    output: {
        path: path.resolve(__dirname, '.'),
        filename: '[name].js',
    },
    mode: 'development',
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
                                ["import", {
                                    "libraryName": "antd-mobile",
                                    "style": "css" // `style: true` 会加载 less 文件
                                }],
                                'syntax-dynamic-import'
                            ]
                        }
                    }
                ]
                // loader: 'babel-loader',
                // query: {
                //     presets: ['react', 'es2015']
                // }
            },
            {
                test: /\.css$/,
                // use:[
                //     'style-loader',
                //     'css-loader'
                // ]
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it use publicPath in webpackOptions.output
                            publicPath: './'
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
            // //加载图片和字体文件（文件较大时）
            // {
            //     test: /\.(gif|jpg|png)\??.*$/,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {
            //               name:'images/[hash:8].[name].[ext]'
            //             }
            //           }
            //     ]
            // },
            //字体图标
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 100000,
                            name: '[path].[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.join(__dirname, "./test"),//本地服务器所加载的页面所在的目录
        port: 8181,
        inline: true
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css"
        })
    ]
}