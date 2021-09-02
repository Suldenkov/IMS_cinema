const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

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
	module:{
		rules: [
			{
				test: /\.(scss)$/,
				use:[
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
		new MiniCssExtractPlugin({
			filename: 'style.css',
		}),
	]
}