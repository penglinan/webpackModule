/**
 * Created by nan on 2018/4/3.
 */
const ExtractTextPlugin=require("extract-text-webpack-plugin");//分离文件
const rules={
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
};
module.exports=rules;