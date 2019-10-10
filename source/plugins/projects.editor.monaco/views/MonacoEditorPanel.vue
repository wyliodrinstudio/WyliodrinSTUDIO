<template>
	<MonacoEditor style="height: 100%" v-model="source" :language="sourceLanguage"></MonacoEditor>
</template>

<script>
import MonacoEditor from 'vue-monaco';
import path from 'path';
import _ from 'lodash';

export default {
	name: 'MonacoEditorPanel',
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
		
	},
	components: {
		MonacoEditor
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

