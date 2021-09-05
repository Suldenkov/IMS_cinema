const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: './src/assets/js/index.js',
	output:{
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist')
	},
	devServer:{
		port:3000
	},
	resolve: {
		alias: {
		  images: path.resolve(__dirname, 'src/assets/img/'),
		},
	},
	module:{
		rules: [
			{
				test: /\.(scss)$/,
				use:[
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(png|jpg|svg|gif)$/,
				type: 'assets/imgs',
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new MiniCssExtractPlugin({
			filename: 'style.css',
		}),
		// new CopyWebpackPlugin(
		// 	patterns : [
		// 	{from: `./src/assets/imgs`, to: './dist/imgs'},
		// ])
		new CopyWebpackPlugin({
			patterns: [
			  {from: `./src/assets/imgs`, to: './imgs'}
			],
		}),
	]
}