/**
 * This file contains the webpack configuration.
 */

// Include dependencies
const path = require( 'path' );
const ExtractTextPlugin = require( 'extract-text-webpack-plugin' );

// Helper vars
const assets = path.resolve( __dirname, 'assets' );

// Export config.
module.exports = {
	context: assets,
	entry: {
		blocks: [
			'./js/src/blocks.js',
			'./css/src/blocks.scss'
		]
	},
	output: {
		path: assets,
		filename: 'js/dist/[name].bundle.js'
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: [/node_modules/]
			},
			{
				test: /\.(jpe?g|gif|png|svg)$/,
				use: 'file-loader?emitFile=false&name=[path][name].[ext]'
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract( {
					fallback: 'style-loader',
					use: [{
						loader: 'css-loader',
						options: {
							minimize: true
						}
					}, 'postcss-loader', 'sass-loader'],
					publicPath: '../../'
				} )
			}
		]
	},
	plugins: [
		new ExtractTextPlugin( {
			filename: 'css/dist/[name].css',
			allChunks: true
		} )
	]
};
