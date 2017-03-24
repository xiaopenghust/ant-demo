/**
 * Created by 584003 on 2017/3/24.
 */
'use strict';

const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'dist');
const APP_DIR = path.resolve(__dirname, 'src/components');
const DATA_DIR = path.resolve(__dirname, 'data');

const config = {
    entry: APP_DIR + '/App.jsx',
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?/,
                include: APP_DIR,
                loader: 'babel-loader',
                options: {
                    presets: ["es2015", "react"]
                }
            },
            {
                test: /\.css$/,
                loader:'style-loader!css-loader?importLoaders=1!postcss-loader'
            },
            {
                test:/\.scss$/,
                loader:'style-loader!css-loader?importLoaders=1!postcss-loader!sass-loader'
            },
            {
                test: /\.html/,
                loader:'html-loader'
            },
            {
                test: /\.(json)([\?]?.*)$/,
                include: DATA_DIR,
                loader: "file-loader",
                options:{
                    name:"data/[name].[ext]"
                }
            },
            {
                test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
                loader: "file-loader",
                options:{
                    name:"asserts/fonts/[name].[ext]"
                }
            },
            {
                test: /\.(gif|png|jpe?g)$/i,
                include: DATA_DIR,
                loader: "file-loader",
                options:{
                    name:"data/images/[name]-[hash:5].[ext]"
                }
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: function () {
                    return [require('precss'), require('autoprefixer')({
                        broswers:['last 5 versions']
                    })];
                },
                devServer: {
                    contentBase: "./public", //本地服务器所加载的页面所在的目录
                    colors: true, //终端中输出结果为彩色
                    historyApiFallback: true, //不跳转
                    inline: true, //实时刷新
                    hot:true,
                    proxy:{
                        '/api/*':{
                            target:'http://localhost:8081',
                            secure:false
                        }
                    }
                }
            }
        }),
        new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}}),
        new webpack.optimize.UglifyJsPlugin({minimize: true}),
        new htmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            title:'this is a title',    //一个title 属性
            inject:'body'
        })
    ]
};
console.log('process.env.NODE_ENV---->', process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
    config.devtool = 'cheap-source-map'
}else{
    config.devtool = 'eval-source-map'
}

module.exports = config;
