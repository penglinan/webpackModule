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
module.exports={
    entry:{
        index:'./src/index1.js',
        index2:'./src/index2.js',
    },
    output:{
        path:path.resolve(__dirname,'dist'),
      /*  filename:'bundle.js'*/
    },
    module:{
        rules:[
       /*     {
                test:/\.css$/,
                // use:['style-loader','css-loader']
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:'css-loader',
                    publicPath:"../"//背景图基础路径
                })//配合extract-text-webpack-plugin使用
            },*/
            {
                test:/\.css$/,
                // use:['style-loader','css-loader','postcss-loader']
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','postcss-loader'],
                    publicPath:"../"//背景图基础路径
                })//配合extract-text-webpack-plugin使用
            },
            {
                test:/\.less$/,
               // use:['style-loader','css-loader','less-loader']
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','less-loader'],
                    publicPath:"../"//背景图基础路径
                })//配合extract-text-webpack-plugin使用
            },
            {
                test:/\.(sass|scss)$/,
                // use:['style-loader','css-loader','sass-loader']
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','sass-loader'],
                    publicPath:"../"//背景图基础路径
                })//配合extract-text-webpack-plugin使用
            },
            {
                test:/\.(png|jpg|gif)$/,
                use:[{
                    loader:'url-loader',
                    options:{limit:50,//50KB以内转成base64,否则转化为路径
                        outputPath:'img'//图片打包出去的目录
                    }
            }]
            }

        ]
    },
    devServer:{
        //设置服务器访问的基本目录
        contentBase:path.resolve(__dirname,'dist'),
        //服务器ip地址
        host:'localhost',
        //设置端口
        port:8090,
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
            chunks:['index'],
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
        })
            ]
};