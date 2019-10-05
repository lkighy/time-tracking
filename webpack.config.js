const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path');

module.exports = {
    entry: path.resolve(__dirname, "src/main.js"),
    module: {
        rules: [{
            rest: /\.js?x$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        }, {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        }, {
            test: /\.sass$/,
            use: ["style-loader", "css-loader", "sass-loader"]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "时间追踪",
            template: "./src/main.js",
            filename: "./main.js"
        })
    ]
}