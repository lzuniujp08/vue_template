const {
    resolve
} = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

//判断当前运行环境是开发模式还是生产模式
const nodeEnv = process.env.NODE_ENV || 'development';
const isPro = nodeEnv === 'development';
console.log("当前运行环境：", isPro ? 'production' : 'development');

module.exports = {
    entry: {
        app: [
            //'webpack-dev-server/client?http://localhost:3000',
            './main.js'
        ],
        // 将 第三方依赖 单独打包
        vendor: [
            'jquery'
        ]
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: resolve(__dirname, 'dist'),
        publicPath: 'http://localhost:3000/'
    },
    resolve: {
        extensions: [
            '.js', '.jsx'
        ]
    },
    context: resolve(__dirname, 'src'),
    devServer: {
        hot: true,
        contentBase: resolve(__dirname, 'dist'),
        publicPath: '/',
        port: '3000'
    },

    module: {
        //module.noParse 配置哪些文件可以脱离webpack的解析
        noParse: /node_modules\/(jquey\.js)/,
        rules: [
            //html
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader'
                }]
            },
            
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    
                }
            },
            {
                test: /\.(css)$/,
                use: [
                    "style-loader", "css-loader"
                ],
            },
            {
                test: /\.(scss)$/,
                use: [
                    "style-loader", "css-loader", "sass-loader"
                ],
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [{
                        loader: "url-loader",
                        query: {
                            name: 'images/[name].[ext]?v=[hash:5]',
                            limit: 20000
                        }
                    }, {
                        loader: 'image-webpack-loader',
                        options: {
                            query: {
                                mozjpeg: {
                                    progressive: true,
                                    quality: 65
                                },
                                pngquant: {
                                    quality: "10-20",
                                    speed: 4
                                },
                                svgo: {
                                    plugins: [{
                                        removeViewBox: false
                                    }, {
                                        removeEmptyAttrs: false
                                    }]
                                },
                                gifsicle: {
                                    optimizationLevel: 7,
                                    interlaced: false
                                },
                                optipng: {
                                    optimizationLevel: 7,
                                    interlaced: false
                                }
                            }
                        }
                    }

                ]
            }, {
                test: /\.(woff|woff2|eot|ttf|svg)$/,
                use: [{
                    loader: 'url-loader?limit=8192'
                }]

            }, {
                test: /\.(mp3|mp4|ogg)$/,
                use: [{
                    loader: "file-loader?name=media/[name].[ext]"
                }]
            }, {
                test: /\.json$/,
                use: [{
                    loader: "json-loader"
                }]
            }
        ]
    },
    plugins: [
        //html模板
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: 'body',
            // excludeChunks: ['app']
        }),
        new webpack.HotModuleReplacementPlugin(),
        // 提供公共代码
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'js/[name].js'
        }),
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    }
};