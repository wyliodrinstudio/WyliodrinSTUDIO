'use strict';

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
	items.push ({ from: 'plugins/'+plugin.folder+'/'+plugin.name+'/package*.json', context: 'source' }, { from: 'plugins/'+plugin.folder+'/'+plugin.name+'/data/**', context: 'source', noErrorOnMissing: true });
}

class StudioPluginsWeb {
	apply(compiler) {
		compiler.hooks.environment.tap('Studio Plugins Browser', () => {

			console.log('Loading studio plugins for browser');

			let source = 'async function loadPlugins (progress = () => {}) {\n\tvar plugins = [];\n\tvar index = 0;\n\n';

			let index = 0;
			for (let plugin of webPlugins)
			{
				source = source + '\tlet plugin'+index+' = import (\'../plugins/'+plugin.folder+'/'+plugin.name+'/'+plugin.main+'\').then ((plugin) => { plugins.push ({folder: \''+plugin.folder+'\', name:\''+plugin.name+'\', consumes:'+JSON.stringify (plugin.consumes)+', provides:'+JSON.stringify (plugin.provides)+', setup: plugin.setup || plugin.default || plugin}); index=index+1; progress (\''+plugin.folder+'/'+plugin.name+'\', index, '+webPlugins.length+'); });\n';
				index=index+1;
			}

			source = source + '\tawait Promise.all ([';

			for (let index = 0; index < webPlugins.length; index++)
			{
				source = source + 'plugin'+index+', ';
			}

			source = source + '])\n';

			source = source + '\tprogress (\'Your workspace is almost ready ...\');\n';

			source = source + '\treturn plugins;\n}\nmodule.exports.loadPlugins = loadPlugins;\n';
			
			fs.writeFileSync ('./source/web/plugins.js', source);

			compiler.options.entry = {};
			compiler.options.entry.studio = './source/web/setup.js';

			delete package_json.build;
			delete package_json.devDependencies;
			delete package_json.optionalDependencies;
			delete package_json.scripts;
			package_json.name = 'wstudio-web';
			package_json.description = 'Wyliodrin STUDIO web browser version';
			package_json.scripts = {
				start: 'node server.js'
			};
			package_json.bin = {
				'wstudio-web': 'server.js'
			};
			package_json.dependencies = {
				express: '*',
				ws: '*'
			};
			fs.mkdirpSync ('./build/ui');
			fs.writeFileSync ('./build/package.json', JSON.stringify (package_json, null, 4));
			
		});

		compiler.hooks.done.tap('Setting permissions', () => {
			fs.chmodSync ('./build/server.js', 0o755);
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

	let format_rule = [];

	let fix = true;

	if (process.env.FIX === 'false') {
		fix = false;
	}

	if (env.FORMAT == 'yes')
	{
		format_rule = [{
			enforce: 'pre',
        	test: /\.(js|vue)$/,
			exclude: [/node_modules/, /web\/plugins.js/],
			loader: 'eslint-loader',
			options: {
			  fix: fix
			},
		}];
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
				...format_rule,
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
								lessOptions: {
									relativeUrls: false
								}
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
		mode: mode,
		node: {
			__dirname: false
		},
		plugins: [
			// make sure to include the plugin!
			new VueLoaderPlugin({
				esModule: false
			}),
			new CopyPlugin({
				patterns: [
					...items,
					{ from: '*.html', context: 'source/web' },
					{ from: 'server.js', context: 'source/web', to: '../' },
					{ from: 'img/**', context: 'source' },
					{ from: 'fonts/**', context: 'node_modules/material-design-icons-iconfont/dist/' },
					{ from: 'fonts/**', context: 'node_modules/katex/dist/' },
					{ from: 'README.md', context: 'source/web', to: '../' },
				]}),
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
			new TranslationPlugin ({
				target: 'browser'
			}),
			new StudioPluginsWeb (),
			new webpack.DefinePlugin({
				...defines,
				TARGET: 'browser'
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
		target: 'web'
	};
};