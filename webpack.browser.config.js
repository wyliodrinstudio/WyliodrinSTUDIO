const path = require ('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TranslationPlugin = require ('./webpack.translation.js'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MonacoEditorPlugin = require('monaco-editor-webpack-plugin');
const fs = require ('fs-extra');
const webpack = require ('webpack');
const plugins = require ('./webpack.plugins.js');

let webPlugins = plugins.loadPlugins ('browser');

const package_json = require ('./package.json');

let items = [{ from: '.ebextensions/**', context: 'source/web', to: '..' }];

for (let plugin of webPlugins)
{
	items.push ({ from: 'plugins/'+plugin.name+'/package*.json', context: 'source' }, { from: 'plugins/'+plugin.name+'/data/**', context: 'source' });
}

class StudioPluginsWeb {
	apply(compiler) {
		compiler.hooks.environment.tap('Studio Plugins Browser', () => {

			console.log('Loading studio plugins for browser');

			let source = 'async function loadPlugins (progress = () => {}) {\n\tvar plugins = [];\n\tvar plugin;\n\n';

			let index = 0;
			for (let plugin of webPlugins)
			{
				index=index+1;
				source = source + '\tprogress (\''+plugin.name+'\', '+index+', '+webPlugins.length+');\n\tplugin = await import (\'../plugins/'+plugin.name+'/'+plugin.main+'\');\n\tplugins.push ({name:\''+plugin.name+'\', consumes:'+JSON.stringify (plugin.consumes)+', provides:'+JSON.stringify (plugin.provides)+', setup: plugin.setup || plugin.default || plugin});\n';
			}

			source = source + '\treturn plugins;\n}\nmodule.exports.loadPlugins = loadPlugins;\n';
			
			fs.writeFileSync ('./source/web/plugins.js', source);

			compiler.options.entry = {};
			compiler.options.entry.studio = './source/web/setup.js';

			delete package_json.build;
			delete package_json.devDependencies;
			delete package_json.optionalDependencies;
			delete package_json.scripts;
			package_json.scripts = {
				start: 'node server.js'
			};
			package_json.dependencies = {
				express: '*',
				ws: '*'
			};
			fs.mkdirpSync ('./build/ui');
			fs.writeFileSync ('./build/package.json', JSON.stringify (package_json, null, 4));
			
		});
	
	}
}

module.exports = env => {
	if (!env) env = {};
	
	let defines = {
		APP_KEY: JSON.stringify('681861617d59c9287a87eec1b7ad495a2a16b28a')
	};
	
	let mode = 'none';
	
	if (env.NODE_ENV === 'production')
	{
		defines = {
			APP_KEY: JSON.stringify('afbca5438a7d9c08b131ec0d89572df0ae26af84')
		};
		mode = 'production';
	}
	return {
		entry: {
			workspace: './source/plugins/workspace/index.js',
		},
		output: {
			path: path.resolve(__dirname, './build/ui'),
			filename: 'imports/[name]_[hash].js',
		},
		optimization: {
			splitChunks: {
				chunks: 'all',
				name: '../vendor'
			},
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
				// { from: 'index.html', context: 'source/web' },
				{ from: 'server.js', context: 'source/web', to: '../' },
				{ from: 'img/**', context: 'source' },
				{ from: 'fonts/**', context: 'node_modules/material-design-icons-iconfont/dist/' },
				{ from: 'fonts/**', context: 'node_modules/katex/dist/' },
			], {logLevel: ''}),
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
			new HtmlWebpackPlugin({
				title: 'Wyliodrin STUDIO',
				// Load a custom template (lodash by default)
				template: 'source/web/index.html'
			}),
			new TranslationPlugin ({}),
			new StudioPluginsWeb (),
			new webpack.DefinePlugin({
				...defines,
				TARGET: 'web'
			}),
			new MonacoEditorPlugin({
				// https://github.com/Microsoft/monaco-editor-webpack-plugin#options
				// Include a subset of languages support
				// Some language extensions like typescript are so huge that may impact build performance
				// e.g. Build full languages support with webpack 4.0 takes over 80 seconds
				// Languages are loaded on demand at runtime
				// languages: ['css', 'html', 'python', 'cpp', 'sh', 'javascript', 'typescript']
			})
		],
		target: 'web'
	};
};