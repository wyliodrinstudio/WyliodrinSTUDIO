<template>
	<editor v-model="source" @init="initEditor" :lang="sourceLanguage" :options="editorOptions"></editor>
</template>

<script>
import editor from 'vue2-ace-editor';
import path from 'path';
import _ from 'lodash';

export default {
	name: 'AceEditor',
	props: ['project', 'filename'],
	data () {
		return {
			source: '',
			sourceLanguage: 'python',
			editorOptions: {
				fontSize: '12pt',
				readOnly: false,
			}
		};
	},
	methods: {
		initEditor (/*editor*/)
		{
			require('brace/ext/language_tools'); //language extension prerequsite...
			// require('brace/mode/html');
			require('brace/mode/sh');                
			require('brace/mode/python');    //language
			require('brace/mode/javascript');    //language
			require('brace/mode/makefile');    //language
			require('brace/mode/less');
			require('brace/theme/chrome');
			require('brace/theme/monokai');
			require('brace/snippets/python'); //snippet
			require('brace/snippets/javascript'); //snippet
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
					switch (path.extname (this.filename))
					{
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
						case '.js':
						{
							this.sourceLanguage = 'javascript';
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
				console.log (this.source);
				await this.studio.projects.saveFile (this.project, this.filename, this.source);
			}
		}
	}
};
</script>

