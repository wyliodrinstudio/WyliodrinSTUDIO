<template>
	<editor :value="value" @init="initEditor" :lang="sourceLanguage" :options="editorOptions"></editor>
</template>

<script>
import editor from 'vue2-ace-editor';
export default {
	name: 'VisualAce',
	props: ['value', 'extension'],
	data () {
		return {
			sourceLanguage: 'python',
			editorOptions: {
				fontSize: '12pt',
				readOnly: true
			}
		};
	},
	methods: {
		initEditor (/*editor*/)
		{
			require('brace/ext/language_tools'); //language extension prerequsite...
			require('brace/mode/python');    //language
			require('brace/mode/javascript');    //language
			require('brace/theme/chrome');
		}
	},
	components: {
		editor
	},
	created(){
		
	},
	watch:
	{
		extension ()
		{
			switch (this.extension)
			{
				case 'py':
				{
					this.sourceLanguage = 'python';
					break;
				}
				case 'js':
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
		},
	}
};
</script>

