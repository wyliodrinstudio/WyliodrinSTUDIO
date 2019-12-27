<template>
	<div>
		<div v-if="syntax === 'markdown'">
			<v-toolbar class="markdown-btns">
				<v-btn text @click="importImage(element)">
					<v-img src="plugins/projects/notebook/data/img/icons/image-icon.png"></v-img>
				</v-btn>
				<v-btn text @click="addImageLink(element)">
					<v-img src="plugins/projects/notebook/data/img/icons/imagelink-icon.png"></v-img>
				</v-btn>
				<v-btn text @click="importFile(element)">
					<v-img src="plugins/projects/notebook/data/img/icons/file-icon.png"></v-img>
				</v-btn>
				<v-btn text @click="addLink(element)">
					<v-img src="plugins/projects/notebook/data/img/icons/link-icon.png"></v-img>
				</v-btn>
				<v-btn text @click="numberedList(element)">
					<v-img src="plugins/projects/notebook/data/img/icons/nlist-icon.png"></v-img>
				</v-btn>
				<v-btn text  @click="bulletedList(element)">
					<v-img src="plugins/projects/notebook/data/img/icons/list-icon.png"></v-img>
				</v-btn>
				<v-btn text @click="boldText(element)">
					<v-img src="plugins/projects/notebook/data/img/icons/bold-icon.png"></v-img>
				</v-btn>
				<v-btn text @click="italicText(element)">
					<v-img src="plugins/projects/notebook/data/img/icons/italic-icon.png"></v-img>
				</v-btn>
				<v-btn text @click="heading1(element)">
					<v-img src="plugins/projects/notebook/data/img/icons/h1-icon.png"></v-img>
				</v-btn>
				<v-btn text @click="heading2(element)">
					<v-img src="plugins/projects/notebook/data/img/icons/h2-icon.png"></v-img>
				</v-btn>
				<v-btn text @click="heading3(element)">
					<v-img src="plugins/projects/notebook/data/img/icons/h3-icon.png"></v-img>
				</v-btn>
				<v-btn text @click="addSource(element)">
					<v-img src="plugins/projects/notebook/data/img/icons/source-icon.png"></v-img>
				</v-btn>
			</v-toolbar>
		</div>
		<editor v-model="element.data" @init="initEditor" :lang="syntax" :options="editorOptions"></editor>
	</div>
</template>


<script>
import editor from 'vue2-ace-editor';

// import { remote } from 'electron';
// const dialog = remote.dialog;
import path from 'path';
export default {
	name: 'AceNotebook',
	props: ['value', 'syntax','element', 'readOnly'],
	data () {
		return {
			editor: null,
			source: '',
			editorOptions: {
				fontSize: '10pt',
				readOnly: this.tester,
				minLines: 3,
				maxLines: 20
			},
			tester: false
		};
	},
	computed: {
		
	},
	methods: {
		initEditor (editor)
		{
			this.editor = editor;
			require('brace/ext/language_tools'); 
			require('brace/mode/python');
			require('brace/mode/markdown');  
			require('brace/theme/chrome');
			require('brace/snippets/python'); 
		},
		boldText(element)
		{
			this.editor.insert('**text**');
		},
		italicText(element)
		{
			this.editor.insert('*italics*');
		},
		bulletedList(element)
		{
			this.editor.insert ('\n* Item\n* Item \n* Item');
		},
		numberedList(element)
		{
			this.editor.insert ('\n1. Item\n2. Item \n3. Item');
		},
		heading1(element)
		{
			this.editor.insert ('\n# Title');
		},
		heading2(element)
		{
			this.editor.insert ('\n## Title');
		},
		heading3(element)
		{
			this.editor.insert ('\n### Title');
		},
		async importFile(element)
		{
			const options = {
				title: 'Select file',
				filetypes: ['*']
			};
			let imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg'];
			let openPath = await this.studio.filesystem.openImportDialog(options);
			if (openPath.length > 0) {
				try
				{
					var fileName = path.basename (openPath[0].name);
					var fileType;
					var fileExtension;
					let extension = fileName.substring(fileName.lastIndexOf('.'));
					if(imageExtensions.includes(extension))
					{
						fileType = 'image';
						fileExtension = extension.substring(1);
						this.editor.insert('!');
					}
					else
					{
						if(extension === '.html')
						{
							fileType = 'text';
							fileExtension = 'html';
						}
						else
						{
							fileType = 'application';
							if(extension === '.json' || extension === '.doc' || extension ==='.docx')
								fileExtension = 'octet-stream:';
							else if(extension === '.js')
								fileExtension = 'javascript:';
							else
								fileExtension = extension.substring(1) + ':';
						}
					}	
					try {
						var encoded = (await this.studio.filesystem.readImportFile(openPath[0])).toString ('base64');
						this.editor.insert('[' + fileName+ ']'+'(data:'+fileType+'/'+fileExtension+';base64,' + encoded + ')');
					}
					catch(e)
					{
						console.log(e.message);
					}
				}
				catch(e)
				{
					this.studio.workspace.showError('NOTEBOOK_SELECT_FILE_ERROR');
					console.log('Please select a file. ' + e.message);
				}
			}
		},
		async importImage(element)
		{
			const options = {
				title: 'Select file',
				filetypes: ['*']
			};
			let openPath = await this.studio.filesystem.openImportDialog(options);
			console.log (openPath);
			if (openPath.length > 0)
			{
				try
				{
					var fileName = path.basename (openPath[0].name);
					var encoded = (await this.studio.filesystem.readImportFile(openPath[0])).toString ('base64');
					this.editor.insert('![' + fileName+ ']'+'(data:image/jpeg;base64,' + encoded + ')');
				}
				catch(e)
				{
					this.studio.workspace.showError('NOTEBOOK_SELECT_IMAGE_ERROR');
					console.log('Please select an image. ' + e.message);
				}
			}
			
		},
		addImageLink(element)
		{
			this.editor.insert ('\n![image](http://)');
		},
		addLink(element)
		{			
			this.editor.insert ('\n[text](http://)');
		},
		addSource(element)
		{
			this.editor.insert('\n```language\nsource\n```');
		}
	},
	components: {
		editor
	},
	watch:
	{
		readOnly() {
			this.tester = this.readOnly;
		},
		value (newValue, oldValue)
		{
			if (newValue !== oldValue)
			{
				let value = this.value;
				try
				{
					if (typeof this.value === 'object') value = this.value.toString ();
				}
				catch (e)
				{
					value = '';
				}
				this.source = value;
			}
		},
		source (newValue, oldValue)
		{
			if (newValue !== oldValue)
			{
				this.$emit ('input', this.source);
			}
		}
	}
	
};
</script>

<style lang="less" scoped>
	@import '../style/notebook.less';
</style>