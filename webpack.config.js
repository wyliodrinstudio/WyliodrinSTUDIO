const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');
const TranslationPlugin = require('./webpack.translation.js');
const webpack = require('webpack');
const MonacoEditorPlugin = require('monaco-editor-webpack-plugin');
const plugins = require('./webpack.plugins.js');
const license = './LICENSE';

const package_json = require('./package.json');

const fs = require('fs-extra');
const _ = require('lodash');

let electronPlugins = plugins.loadPlugins('electron');
let items = [];

for (let plugin of electronPlugins) {
	items.push({ from: 'plugins/' + plugin.name + '/package*.json', context: 'source' }, { from: 'plugins/' + plugin.name + '/data/**', context: 'source' });
}

class StudioPluginsElectron {
	apply(compiler) {
		compiler.hooks.environment.tap('Studio Plugins Electron', () => {
			if (compiler.options.target === 'electron-renderer') {
				console.log('Loading studio plugins for electron');

				compiler.options.entry = {};

				for (let plugin of electronPlugins) {
					compiler.options.entry[plugin.name] = './source/plugins/' + plugin.name + '/' + plugin.main;
				}
			}
			let build_package_json = _.assign({}, package_json);
			delete build_package_json.build;
			delete build_package_json.scripts;
			delete build_package_json.devDependencies;
			fs.mkdirpSync('./build');
			fs.writeFileSync('./build/package.json', JSON.stringify(build_package_json, null, 4));

			let build_license = _.assign({}, license);
			fs.writeFileSync('./build/LICENSE', build_license);
		});

	}
}

module.exports = env => {
	if (!env) env = {};
	let defines = {
		APP_KEY: JSON.stringify('014dd0822b82fb2b8a8a4b14f1182cab5fcced07')
	};

	let mode = 'none';

	if (env.NODE_ENV === 'production')
	{
		defines = {
			APP_KEY: JSON.stringify ('66482e1728771fe4a4c440e79e7e38dc810cc5e6')
		};
		mode = 'production';
	}
	return {
		entry: {
			workspace: './source/plugins/workspace/index.js',
		},
		output: {
			path: path.resolve(__dirname, './build'),
			// library: '',
			filename: 'plugins/[name]/index.js',
			libraryTarget: 'commonjs2'
		},
		optimization: {
			splitChunks: {
				chunks: 'all',
				name: '../vendor'
			}
		},
		module:
		{
			rules: [
				// ... other rules
				{
					test: /\.vue$/,
					loader: 'vue-loader'
				},
				{
					test: /\.less$/,
					use: [
						{
							loader: 'vue-style-loader',
							options: {
								// convertToAbsoluteUrls: true
							}
						},
						{
							loader: 'css-loader',
							options: { url: false }
						},
						{
							loader: 'less-loader',
							options: {
								relativeUrls: false
							}
						}
					]
				},
				{
					test: /\.css$/,
					use: ['style-loader', 'css-loader']
				},
				{
					test: /\.txt$/i,
					use: 'raw-loader',
				},
				{
					test: /\.ttf$/,
					use: ['file-loader']
				}
				// {
				// 	test: /\.ts$/,
				// 	loader: 'ts-loader',
				// 	options: { appendTsSuffixTo: [/\.vue$/] }
				// },
				// {
				// 	test: /\.(png|jpg|gif)$/,
				// 	use: [
				// 		{
				// 			loader: 'url-loader',
				// 			options: {
				// 				limit: 5000
				// 			}
				// 		}
				// 	]
				// }
			],
		},
		externals: [nodeExternals({
			whitelist: [...Object.keys(package_json.devDependencies), /^highcharts\/.*/, 'async', 'vue-asyncable', /^brace\/.*/, /^node-blockly\/.*/, 'set-immediate-shim', 'lie', 'pako', 'readable-stream', 'monaco-editor', 'nano-assign']
		})],
		mode: mode,
		node: {
			__dirname: false
		},
		plugins: [
			// make sure to include the plugin!
			new VueLoaderPlugin({
				esModule: false
			}),
			new CopyPlugin([
				...items,
				{ from: '*.js', context: 'source' },
				// { from: '../package.json', context: 'source' },
				{ from: 'index.html', context: 'source' },
				{ from: 'img/**', context: 'source' },
				{ from: 'fonts/**', context: 'node_modules/material-design-icons-iconfont/dist/' },
				//{ from: 'iconfont/**', context: 'node_modules/material-design-icons/' },
				{ from: 'fonts/**', context: 'node_modules/@mdi/font/' },
				{ from: 'fonts/**', context: 'node_modules/katex/dist/' },
			], { logLevel: '' }),
			// new DtsBundleWebpack({
			// 	name: 'plugins',
			// 	main: 'source/plugins/**/*.d.ts',
			// 	exclude: function (file, external)
			// 	{
			// 		if (file.indexOf ('plugins.d.ts')>=0) return true;
			// 		else
			// 		if (file.indexOf ('vue-shim.d.ts')>=0) return true;
			// 		else
			// 		if (file.indexOf ('.vue')>=0) return true;
			// 		console.log (file+' external: '+external);
			// 		return false;
			// 	},
			// })
			new TranslationPlugin({}),
			new StudioPluginsElectron(),
			new webpack.DefinePlugin({
				...defines,
				TARGET: 'electron'
			}),
			new MonacoEditorPlugin({
				// https://github.com/Microsoft/monaco-editor-webpack-plugin#options
				// Include a subset of languages support
				// Some language extensions like typescript are so huge that may impact build performance
				// e.g. Build full languages support with webpack 4.0 takes over 80 seconds
				// Languages are loaded on demand at runtime
				// languages: ['css', 'html', 'python', 'cpp', 'sh', 'javascript', 'typescript']
				output: 'plugins/projects.editor.monaco'
			})
		],
		target: 'electron-renderer'
	};
};