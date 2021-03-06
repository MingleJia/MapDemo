const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const base = require("./webpack.config.base");
const modifyVars = require("./webpack.config.theme.js");

module.exports = merge(base, {
	mode: "development",
	entry: {
		main: ['@babel/polyfill', path.resolve(__dirname, '../src/index.js')]
	},
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: "js/[name].js",
		chunkFilename: "js/[name].js",
		publicPath: "/"
	},
	devtool: "eval-source-map",
	devServer: {
		contentBase: "./dist",
		hot: true,
		host: '192.168.24.145', // '192.168.70.80'本机ip,
		proxy:{
			'/api':{
				// target:'http://local.leke-eboard.cc',
				target:'http://eboard.leke.cn',
				changeOrigin:true,
				secure:false
			}
		}
    },
	plugins: [ 
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			"process.env": {
				NODE_ENV: JSON.stringify("development")
			}
		})
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: "style-loader",
					},
					{
						loader: "css-loader",
					},
                    {
                        loader: "postcss-loader",
                        options: {
                            config: {
                                path: path.resolve(__dirname,"./postcss.config.js")
                            }
                        }
                    }
				]
			},
			{
				test: /\.scss|sass$/,
				use: [
					{
						loader: "style-loader" // 将 JS 字符串生成为 style 节点
					},
					{
						loader: "css-loader", //
						options: {
							modules: true, //class局部作用域
							localIdentName: "[local]--[hash:base64]"
						}
					},
					{
						loader: "postcss-loader",
						options: {
							config: {
								path: path.resolve(__dirname,"./postcss.config.js")
							}
						}
					}, 
					{
						loader: "sass-loader" // 将 Sass 编译成 CSS
					}
				]
			},
			{
				test: /\.less$/,
				use: [{
					loader: "style-loader" // creates style nodes from JS strings
				}, {
					loader: "css-loader",   // translates CSS into CommonJS
				}, {
					loader: "postcss-loader",
					options: {
						config: {
							path: path.resolve(__dirname,"./postcss.config.js")
						}
					}
				}, {
					loader: "less-loader", // compiles Less to CSS
					options: {
						modifyVars: modifyVars,
						javascriptEnabled: true
					}
				}]
			}
		]
	}
});
