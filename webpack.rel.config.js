const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, "src/index.js"),
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [{
                loader: "babel-loader"
            }]
        }, {
            test: /\.css$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: '../',
                }
            }, "css-loader"]
        }, {
            test: /\.scss$/,
            use: [{
                loader: MiniCssExtractPlugin.loader,
                options: {
                    publicPath: '../',
                }

            }, "css-loader", "sass-loader"]
        }, {
            test: /\.(woff(2)?|ttf|eot|svg)(\?[a-z0-9]+)?$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: "fonts/[hash:8].[ext]"
                }
            }]
        }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "时间追踪",
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
        })
    ],
    resolve: {
        alias: {
            context: path.resolve(__dirname, "src/context"),
            scss: path.resolve(__dirname, "src/scss"),
            css: path.resolve(__dirname, "src/css"),
            fonts: path.resolve(__dirname, "src/fonts"),
        }
    }
}