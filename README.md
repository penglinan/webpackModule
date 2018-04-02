# webpack4.x

    npm i webpack -g
    npm i webpack -save-dev//开发环境
    npm i webpack -D//缩写
    npm i webpack -save//生产环境
    npm i webpack -S//缩写
    卸载用un代替i
用指令打包

	webpack src/index.js --output dist/bundle.js

webpack.config.js

    module.exports={
	    entry:'./src/index.js', //入口文件
       // entry:['./src/index.js','./src/index.js'],多文件的话，用数组
	    output:{
	    //node.js中__dirname变量获取当前模块文件所在目录的完整绝对路径
	      /*  path:__dirname, //输出位置*/
	    filename:'bundle.js' //输入文件
	    },
    };

另外一种写法

	const path=require('path');//node系统自带的

    module.exports={
	    entry:'./src/index.js', //入口文件
	    output:{
	    //node.js中__dirname变量获取当前模块文件所在目录的完整绝对路径
	       // path:__dirname+'/dist', //输出位置
	    path:path.resolve(__dirname,'dist'),
	    filename:'bundle.js' //输入文件
	    },
    };

webpack.config.js配置名字可以修改

    webpack --config webpack.config.js//运行webpack的时候要这样运行

npm run xx:
    
    "scripts":{
          "build":"webpack --config mmr.config.js"
      }//配置命令，使用npm run bulid 执行build命令

mode:

     webpack --mode development
     webpack --mode production//文件被压缩

多出口多入口：

    entry:{
		index:'./src/index.js',
		index2:'./src/index2.js'
		},
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'[name].bundel.js'
		}

### 模板html-webpack-plugin

		new htmlWebpackPlugin({
				minify:{
				   collapseWhitespace:true//压缩消除代码空白区域
                   ，removeAttributeQuotes:true//删除属性双引号
				},
               hash:true,//消除缓存
		       title:"xx",//是在模板里面使用<%= htmlWebpackPlugin.options.title %>
		       template:"./src/index.html"
		})

想要生成多个页面的话，需要在htmlwebpackplugin里面添加filename属性，给文件取名字

           new htmlWebpackPlugin({
			   filename:'index.html',
               hash:true,//消除缓存
		       title:"xx",//是在模板里面使用<%= htmlWebpackPlugin.options.title %>
		       template:"./src/index.html"
		})

想要生成多个页面的对应多个JS的话，需要加入一个chunks属性

         new htmlWebpackPlugin({
			   filename:'index.html',
               chunks:['index'],//index是entry里面定义的js名字
               hash:true,//消除缓存
		       title:"xx",//是在模板里面使用<%= htmlWebpackPlugin.options.title %>
		       template:"./src/index.html"
		})

### clean-webpack-plugin：删除某些东西（清除）

    npm i clean-webpack-plugin -D

    const CleanwebpackPlugin = require('clean-webpack-plugin');
    new CleanwebpackPlugin(['dist'])//使用

### devServer
 
    npm i webpack-dev-server -D

     devServer:{
	    //设置服务器访问的基本目录
	    contentBase:path.resolve(__dirname,'dist'),
	    //服务器ip地址
	    host:'localhost',
	    //设置端口
	    port:8090,
        //自动打开页面
        open:true,
        //热更新
        hot:true
    },

    "scripts": {
    "test": "webpack --mode development",
    "dev":"webpack-dev-server --mode development"
    },

热更新（只更新修改的地方）

    const webpack=require("webpack");//webpack自带热更新模块
    new webpack.HotModuleReplacementPlugin(),//打开热更新模块

## 压缩css
npm i style-loader css-loader -D

    module:{
        rules:[
		    {
		      test:/\.css$/,
		      use:['style-loader','css-loader']
		    }
        ]
    }

## 压缩js

    打包的时候使用webpack --production

## 压缩图片
    npm i file-loader url-loader -D
    url-loader依赖file-loader
    module:{
       rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                test:/\.(png|jpg|gif)$/,
                use:[{
                    loader:'url-loader',
                    options:{limit:50}//50KB以内转成base64,否则转化为路径
            }]
            }
        ]
    }


文件分离，不要全部压缩到一个文件里面

    npm i extract-text-webpack-plugin -D
    npm i extract-text-webpack-plugin@next -D

	const ExtractTextPlugin=require("extract-text-webpack-plugin");//分离文件
	new ExtractTextPlugin("css/index.css")
	 module:{
        rules:[
            {
                test:/\.css$/,
                // use:['style-loader','css-loader']
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:'css-loader',
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

### 分离less

		npm i less less-loader -D
         {
                test:/\.less$/,
               // use:['style-loader','css-loader','less-loader']
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','less-loader'],
                    publicPath:"../"//背景图基础路径
                })//配合extract-text-webpack-plugin使用
            },

### 分离sass


  	   npm i node-sass sass-loader -D

      {
                test:/\.(sass|scss)$/,
                // use:['style-loader','css-loader','sass-loader']
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','sass-loader'],
                    publicPath:"../"//背景图基础路径
                })//配合extract-text-webpack-plugin使用
            },

### postCss  专门处理css的平台，上面有很多css插件可以实现很多效果

1.npm i postcss-loader autoprefixer -D
2.新建postcss的配置文件

		module.exports={
		    plugins:[
		        require('autoprefixer')
		    ]
		}

3.配置module的rules

          {
                test:/\.css$/,
                // use:['style-loader','css-loader','postcss-loader']
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:['css-loader','postcss-loader'],
                    publicPath:"../"//背景图基础路径
                })//配合extract-text-webpack-plugin使用
            },

消除冗余的css代码
Purifycss
1.下载

	npm i purifycss-webpack purify-css -D
2.引入插件

	const PurifyCssWebpack = require("purifycss-webpack");
3.需要引入一个包glob

    npm i glob -D
4.在plugins里面配置

	 new PurifyCssWebpack({
	            paths:glob.sync(path.join(__dirname,'src/*.html'))
	        })

### 项目调试：

webpack4.x开启调试：
--mode development

### babel

- babel用来编译js
- 让你轻松使用ESnext转化
- jsx

babel-core babel-loader babel-preset-env

1下载 npm i babel-core babel-loader babel-preset-env -D
2.配置

    {
    test:/\.(js/jsx)$/,
    use:[
		  {
			loader:'babel-loader',
			options:{preset:'env'}
			 }
		],
    exclude:/node_modules/
    }