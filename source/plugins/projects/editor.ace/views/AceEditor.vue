<template>
	<editor v-model="source" @init="initEditor" :lang="sourceLanguage" :options="editorOptions"></editor>
</template>

<script>
import editor from 'vue2-ace-editor';
import path from 'path';

export default {
	name: 'AceEditor',
	props: ['project', 'filename','active'],
	data () {
		return {
			source: '',
			sourceLanguage: 'python',
			editorOptions: {
				fontSize: '12pt',
				readOnly: false,
				theme: 'ace/theme/chrome',
				enableBasicAutocompletion: true,
				enableSnippets: true,
				enableLiveAutocompletion: true
			}
		};
	},
	methods: {
		initEditor (/*editor*/)
		{
			require('brace/ext/language_tools'); //language extension prerequsite...
			require('brace/ext/searchbox');
			require('brace/ext/settings_menu');

			require('brace/worker/javascript');

			require('brace/mode/markdown');
			require('brace/mode/plain_text');
			require('brace/mode/sh');                
			require('brace/mode/python');    //language
			require('brace/mode/javascript');    //language
			require('brace/mode/makefile');    //language
			require('brace/mode/css');
			require('brace/mode/html');    //language
			require('brace/mode/less');
			require('brace/mode/json');
			require('brace/mode/d');
			require('brace/mode/c_cpp');
			require('brace/mode/php');
			require('brace/mode/typescript');


			require('brace/theme/chrome');
			require('brace/theme/monokai');
			
			require('brace/snippets/markdown');
			require('brace/snippets/python'); //snippet
			require('brace/snippets/javascript'); //snippet
			require('brace/snippets/makefile'); //snippet
			require('brace/snippets/html'); //snippet
			require('brace/snippets/json'); //snippet
			require('brace/snippets/sh'); //snippet
			require('brace/snippets/css'); //snippet
			require('brace/snippets/less'); //snippet
			require('brace/snippets/d');
			require('brace/snippets/c_cpp');
			require('brace/snippets/php');
			require('brace/snippets/typescript');
		}
	},
	components: {
		editor
	},
	watch:
	{
		filename:
		{
			immediate: true,
			async handler ()
			{
				if (this.filename)
				{
					if (path.basename (this.filename).toLowerCase().startsWith ('makefile'))
					{
						this.sourceLanguage = 'makefile';
					}
					else
						switch (path.extname (this.filename).toLowerCase())
						{
							case '.md':
							{
								this.sourceLanguage = 'markdown';
								break;
							}
							case '.txt':
							{
								this.sourceLanguage = 'plain_text';
								break;
							}
							case '.py':
							{
								this.sourceLanguage = 'python';
								break;
							}
							case '.sh':
							{
								this.sourceLanguage = 'sh';
								break;
							}
							case '.html':
							{
								this.sourceLanguage = 'html';
								break;
							}
							case '.js':
							{
								this.sourceLanguage = 'javascript';
								break;
							}
							case '.json':
							{
								this.sourceLanguage = 'json';
								break;
							}
							case '.css':
							{
								this.sourceLanguage = 'css';
								break;
							}
							case '.less':
							{
								this.sourceLanguage = 'less';
								break;
							}
							case '.vue':
							{
								this.sourceLanguage = 'javascript';
								break;
							}
							case '.php':
							{
								this.sourceLanguage = 'php';
								break;
							}
							case '.c':
							{
								this.sourceLanguage = 'c_cpp';
								break;
							}
							case '.cpp':
							{
								this.sourceLanguage = 'c_cpp';
								break;
							}
							case '.ts':
							{
								this.sourceLanguage = 'typescript';
								break;
							}
							case '.d':
							{
								this.sourceLanguage = 'd';
								break;
							}
							default:
							{
								this.sourceLanguage = '';
								break;
							}
						}
				}
				let source = await this.studio.projects.loadFile (this.project, this.filename);
				if (source !== null) this.source = source.toString ();
				else this.studio.workspace.showNotification ('Failed to load file '+this.filename);
			}
		},
		// value (newValue, oldValue)
		// {
		// 	if (newValue !== oldValue)
		// 	{
		// 		let value = this.value;
		// 		try
		// 		{
		// 			if (typeof this.value === 'object') value = this.value.toString ();
		// 		}
		// 		catch (e)
		// 		{
		// 			value = '';
		// 		}
		// 		this.source = value;
		// 	}
		// },
		async source (newValue, oldValue)
		{
			if (newValue !== oldValue)
			{
				// this.$emit ('input', this.source);
				await this.studio.projects.saveFile (this.project, this.filename, this.source);
			}
		}
	}
};
</script>

