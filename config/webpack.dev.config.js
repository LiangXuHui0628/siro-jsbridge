const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
const merge = require('webpack-merge');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const baseConfig = require('./webpack.base.config');

module.exports = merge.smart(baseConfig, {
    target: 'web',
    entry: {
      SRJSBridge: './src/Main.ts'
    },
    module: {
        rules: [
            {
              test: /\.tsx?$/,
              use: "ts-loader",
              exclude: /node_modules/
            }
          ]
    },
    plugins: [
        // new ForkTsCheckerWebpackPlugin({
        //     reportFiles: ['src/SiroJsBridge/**/*']
        // }),
        new webpack.NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            title: "Siro Client",  //配置title属性
            template: 'index.html'
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        })
    ],
    devServer: {
        port: 9000,
        compress: true,
        noInfo: true,
        stats: 'errors-only',
        inline: true,
        hot: true
      }
});