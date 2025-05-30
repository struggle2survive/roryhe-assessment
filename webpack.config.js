const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { url } = require('inspector');


module.exports = function (isDev) {
    return {
        entry: path.resolve(__dirname, "./src/index.tsx"),
        output: {
            path: path.resolve(__dirname, "./src/dist"),
            filename: '[name].[hash:8].js',
            clean: true,
            publicPath: "/"
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js'],
            alias: {
                "@styles": path.resolve(__dirname, "src/styles"),
                "@components": path.resolve(__dirname, "src/components"),
                "@utils": path.resolve(__dirname, "src/utils"),
                "@redux": path.resolve(__dirname, "src/redux"),
                "@views": path.resolve(__dirname, "src/views")
            }
        },
        module: {
            rules: [
                {
                    test: /\.(tsx|ts|jsx|js)$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader"
                    }
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                        "css-loader", "sass-loader", "postcss-loader"
                    ]
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, './src/index.html')
            }),
            new MiniCssExtractPlugin({
                filename: isDev ? "[name].css" : "[name].[contenthash:4].css"
            })
        ]
    }
}