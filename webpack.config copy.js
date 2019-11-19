const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, "src/index.js"),
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: [{
                loader: "babel-loader"
            }]
        }, {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        }, {
            test: /\.scss$/,
            use: ["style-loader", "css-loader", "sass-loader"]
        }, {
            test: /\.(woff(2)?|ttf|eot|svg)(\?[a-z0-9]+)?$/,
            use: [{
                loader: 'file-loader'
            }]
        }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "时间追踪",
            template: "./src/index.html",
            filename: "./index.html"
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