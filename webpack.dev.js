const { merge } = require('webpack-merge')
const path = require('path');

const getBaseConfig = require('./webpack.config')

module.exports = merge(getBaseConfig(true), {
    mode: "development",
    devtool: "eval-cheap-module-source-map",
    devServer: {
        port: 3000,
        compress: false,
        hot: true,
        historyApiFallback: true
    }
})