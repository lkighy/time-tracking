const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const extractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

module.exports = {
    entry: {
        app: path.resolve(__dirname, "src/main.js"),
        vendors: []
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[hash:8].js'
    },
    module: {
        rules: [{
            rest: /\.js?x$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }, {
            test: /\.(png|jpg|gif)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 1024 * 8,
                        name: "images/[hash].[ext]"
                    }
                }
            ]
        }, {
            test: /\.css$/,
            use: extractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader",
                publicPath: "../" // 指定抽取的时候自动为路径添加 ../前缀
            })
        }, {
            test: /\.sass$/,
            use: extractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader", "sass-loader"],
                publicPath: "../"
            })
        },{
            test: /\.(eot|svg|ttf|woff)$/,
            use: [{
                loader: "file-loader",
                options: {
                    name: "fonts/[name].[ext]"
                }
            }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "时间追踪",
            template: "./src/index.html",
            filename: "./index.html",
            minify: {
                collapseWhitespace: true, // 合并多余的空格
                removeComments: true, // 移除注释
                removeAttributeQuotes: true, // 移除属性上的双引号
            }
        }),
        new CleanWebpackPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendors",
            filename: "vendors.js"
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false // 移除警告
            }
        }),
        new extractTextPlugin("css/styles.css"),
    ]
}