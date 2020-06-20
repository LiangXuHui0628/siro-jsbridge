const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
const merge = require('webpack-merge');

const baseConfig = require('./webpack.base.config');

module.exports = merge.smart(baseConfig, {
  entry: './src/Main.ts',
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: 'index.js'
  },
  module: {
    rules: [ // 添加解析规则
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
})