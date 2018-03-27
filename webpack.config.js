var CleanWebpackPlugin = require('clean-webpack-plugin');
var nodeExternals = require('webpack-node-externals');
var path = require('path');

module.exports = [
	{
		context: __dirname,
		entry: {
			server_bundle: './src/ui/ServerEntry.js'
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'server-bundle.js'
		},
		externals: [nodeExternals({modulesFromFile:true})],
		target: 'node',
		node: {
			console: false,
			global: false,
			process: false,
			Buffer: false,
			__filename: true,
			__dirname: true
		},
		plugins: [
			new CleanWebpackPlugin(['dist', 'build'], {
				root: __dirname,
				verbose: false,
				dry: false,
			}),
		],
		module: {
			rules: [{
				test: /\.(js|jsx)$/,
				exclude: ['node_modules', 'dist'],
				use: ['babel-loader']
			}]
		},
		resolve: {
	        extensions: ['.js', '.jsx', '.json'],
	        modules: [
	            'node_modules'
	        ]
	    }
	}
];
