/**
 * Created by nan on 2018/3/30.
 */
const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const CleanwebpackPlugin = require('clean-webpack-plugin');
const webpack=require("webpack");//webpack自带热更新模块
const ExtractTextPlugin=require("extract-text-webpack-plugin");//分离文件
const PurifyCssWebpack = require("purifycss-webpack");//消除css代码冗余
const glob=require('glob');//配合purifycss-webpack一起使用
const Rules=require("./webpack.rules.js");
const Json=require('./webpack.config.json')
module.exports={
    entry:{
        index:'./src/index1.js',
         jquery:'jquery'
    },
    output:{
        path:path.resolve(__dirname,'dist'),
      /*  filename:'bundle.js'*/
    },
    module:Rules,
    devServer:{
        //设置服务器访问的基本目录
        contentBase:path.resolve(__dirname,'dist'),
        //服务器ip地址
        host:'localhost',
        //设置端口
        port:Json.port,
        //自动打开浏览器
        open:true,
        //热更新
        hot:true
    },
    // devtool:'source-map',//调试，会暴露源码
    plugins:[
        new CleanwebpackPlugin(['dist']),
        new webpack.HotModuleReplacementPlugin(),//打开热更新模块
        new HtmlWebpackPlugin({
            filename:'index.html',
            chunks:['index','jquery'],
            minify:{
                collapseWhitespace:true//压缩消除代码空白区域
                ,removeAttributeQuotes:true//删除属性双引号
            },
            hash:true,//消除缓存
                title:"xx",
                template:"./src/index.html"
            }),
       /* new HtmlWebpackPlugin({
            filename:'next.html',
            chunks:['index2'],
            minify:{
                collapseWhitespace:true//压缩消除代码空白区域
                ,removeAttributeQuotes:true//删除属性双引号
            },
            hash:true,//消除缓存
            title:"yy",
            template:"./src/index.html"
        })*/
       new ExtractTextPlugin("css/index.css"),
        new PurifyCssWebpack({
            paths:glob.sync(path.join(__dirname,'src/*.html'))
        }),
        new webpack.ProvidePlugin({
            $:'jquery'
        })
            ],
    optimization:{
        splitChunks:{
            cacheGroups:{
                vendaor:{
                    chunks:'initial',
                     name:'jquery',
                    enforce:true
                }
            }
        }
    }
};