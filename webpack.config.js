const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: ["./src/webapp/"],
    output: {
        path: path.join(__dirname, "dist", "webapp"),
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: [/node_modules/, /spec/],
                use: [
                    {
                        loader: "ts-loader",
                        options: { onlyCompileBundledFiles: true }
                    }
                ]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
                test: /\.svg$/,
                loader: 'svg-react-loader',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/webapp/index.template.html",
        }),
        new webpack.EnvironmentPlugin({
            OA_KEY: '8b9692ae-4a46-4637-85db-e9036f1bc37b',     // This key to be supplied by CI env
            HOST: process.env.HOST || 'localhost',
            PORT: process.env.PORT || '3000',
        }),
        new BundleAnalyzerPlugin(),
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist", "webapp"),
    }
};
