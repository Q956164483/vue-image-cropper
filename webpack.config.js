var webpack = require('webpack')
var path = require('path')
var autoprefixer = require('autoprefixer')
var htmlWebpackPlugin = require('html-webpack-plugin')
var Et = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        app: __dirname + "/src/app.js"
    },
    output: {
        path: __dirname + "/build",
        // path: __dirname + "/../client/build",
        filename: '[name].js',
        // publicPath: '/build/'
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    'scss': 'vue-style-loader!css-loader!postcss-loader!sass-loader',
                    // 'scss': Et.extract({
                    //     fallback: 'vue-style-loader',
                    //     use: ['css-loader', 'postcss-loader', 'sass-loader']
                    // }),

                }
            }
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader!postcss-loader'
            // use: Et.extract({
            //     fallback: 'style-loader',
            //     use: ['css-loader', 'postcss-loader']
            // })
        }, {
            test: /\.scss$/,
            loader: 'style-loader!css-loader!postcss-loader!sass-loader'
            // use: Et.extract({
            //     fallback: 'style-loader',
            //     use: ['css-loader', 'postcss-loader', 'sass-loader']
            // })

        }, {
            test: /\.(png|jpg|svg|gif|eot|woff|ttf)$/,
            loader: 'url-loader?limit=8192'
        }, {
            test: /\.js$/,
            loader: 'babel-loader?presets[]=es2015,presets[]=stage-0',
            exclude: /node_modules/
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new htmlWebpackPlugin({ // webpack 指定目录(package内设置)生成静态HTML文件
            title: "hello world",
            filename: "index.html",
            template: "index.html",
            hash: true, // true | false。如果是true，会给所有包含的script和css添加一个唯一的webpack编译hash值。这对于缓存清除非常有用。
            inject: true, // | 'head' | 'body' | false  ,注入所有的资源到特定的 template 或者 templateContent 中，如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
            chunks: ["app"], // 使用chunks 需要指定entry 入口文件中的哪一个模块
            minify: {
                // removeAttributeQuotes: true // 移除属性的引号
            }
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function() {
                    return [autoprefixer({ bowsers: ['last 5 versions'] })]
                }
            }
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     output: {
        //         comments: false, // remove all comments
        //     },
        //     compress: {
        //         warnings: false
        //     }
        // }),
        // new Et('style.css'),
        // new Et('[name].css'),
        // new webpack.DefinePlugin({
        //     "process.env": {
        //         NODE_ENV: JSON.stringify("production")
        //     }
        // }),
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    devServer: {
        // host: '192.168.1.102',
        host: '10.75.64.6',
        // host: 'localhost',
        port: 1258,
        inline: true,
        hot: true,
        historyApiFallback: true,
        // contentBase: "/build",
        // compress: true
    },
    // devtool: '#source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
