<template>
	<div class="notebook-box" v-if="currentProject" ref="notebook" @click.self="showCurrentElement(null)">
		<li v-for="element in elements" :key="element.id">
			<div @click="showCurrentElement(element)">
			<v-layout>
				<v-flex>
					<v-card>
						<div v-if="element.id === visibleId" class="section-active">
							<v-card-actions>
								<v-layout>
									<v-select class="drpdown"
										:items="items"
										v-model="element.type"
										item-text = "title"
										item-value = "type"
										hide-details
									></v-select>
								</v-layout>
								<v-tooltip bottom>
									<!-- eslint-disable-next-line vue/no-unused-vars -->
									<template v-slot:activator="{ on }">
										<v-btn text @click="moveUp(element.id)" class="ntbk-btn">
											<v-img src="plugins/projects/notebook/data/img/icons/up-icon.png"></v-img>
										</v-btn>
									</template>
									<span>Move up</span>
								</v-tooltip>

								<v-tooltip bottom>
									<!-- eslint-disable-next-line vue/no-unused-vars -->
									<template v-slot:activator="{ on }">
										<v-btn text @click="moveDown(element.id)" class="ntbk-btn">
											<v-img src="plugins/projects/notebook/data/img/icons/down-icon.png"></v-img>
										</v-btn>
									</template>
									<span>Move down</span>
								</v-tooltip>

								<v-tooltip bottom>
									<!-- eslint-disable-next-line vue/no-unused-vars -->
									<template v-slot:activator="{ on }">
										<v-btn text @click="deleteElement(element)" class="ntbk-btn">
											<v-img src="plugins/projects/notebook/data/img/icons/delete-icon.png"></v-img>
										</v-btn>
									</template>
									<span>Delete</span>
								</v-tooltip>

								<v-tooltip bottom>
									<!-- eslint-disable-next-line vue/no-unused-vars -->
									<template v-slot:activator="{ on }">
										<v-btn text @click="addElement" class="ntbk-btn">
											<v-img src="plugins/projects/notebook/data/img/icons/add-icon.png"></v-img>
										</v-btn>
									</template>
									<span>Add</span>
								</v-tooltip>

								<v-tooltip bottom v-if="element.type==='markdown'">
									<!-- eslint-disable-next-line vue/no-unused-vars -->
									<template v-slot:activator="{ on }">
										<v-btn text @click="element.editable = !element.editable" class="ntbk-btn right">
											<v-img src="plugins/projects/notebook/data/img/icons/edit-icon.png"></v-img>
										</v-btn>
									</template>
									<span>Edit</span>
								</v-tooltip>

								<v-tooltip bottom v-if="element.type==='python' && visibleRun && !runningId">
									<!-- eslint-disable-next-line vue/no-unused-vars -->
									<template v-slot:activator="{ on }">
										<v-btn text @click="runCode(element.id)" class="ntbk-btn">
											<v-img src="plugins/projects/notebook/data/img/icons/run-icon.png"></v-img>
										</v-btn>
									</template>
									<span>Run</span>
								</v-tooltip>

								<span v-if="runningId===element.id" class="ntbk-btn">
									<v-img src="plugins/projects/notebook/data/img/icons/running.gif"></v-img>
								</span>

								<v-tooltip bottom v-if="status==='RUNNING' || status==='STOPPED'">
									<!-- eslint-disable-next-line vue/no-unused-vars -->
									<template v-slot:activator="{ on }">
										<v-btn text  v-show="visibleRun" @click="stopCode(element.id)" class="ntbk-btn">
											<v-img src="plugins/projects/notebook/data/img/icons/stop-icon.png"></v-img>
										</v-btn>
									</template>
									<span>Stop</span>
								</v-tooltip>

							</v-card-actions>
							<!-- MARKDOWN -->
							<div v-if="element.type==='markdown'" v-html="compiledMarkdown(element)" class="compiledmkd"></div>
							<div v-if="element.type==='markdown'" class="markdown-box">
								<div v-if="element.editable">
									<AceNotebook :syntax="'markdown'" :element="element" v-model="element.data"></AceNotebook>
							
								</div>
							</div>
							<!-- PYTHON -->
							<div v-else>
								<AceNotebook :syntax="'python'" :element="element" v-model="element.data" ></AceNotebook>
								<pre v-if="element.code">{{ element.code }}</pre>
								<div v-if="element.error" v-html="element.error"></div>
								<div v-if="element.result" v-html="element.result" class="result"></div>

							</div> 
						</div>
						<div v-else-if="element.type==='markdown'">
							<div v-html="compiledMarkdown(element)" class="compiledmkd"></div>
						</div>
						<div v-else>
							<AceNotebook :syntax="'python'" :element="element" v-model="element.data" :readOnly="true"></AceNotebook>
							<pre v-if="element.code" class="code">{{ element.code }}</pre>
							<div v-if="element.error" v-html="element.error" class="error"></div>
							<div v-if="element.result" v-html="element.result" class="result"></div>
						</div>
					</v-card>
				</v-flex>
			</v-layout>
			</div>
		</li>
		<div class="bottom-space"></div>
		<div class="server-status no-print" :class="{'connected':status === 'READY' || status === 'PROCESSING', 'stopped':status === 'STOPPED'}" v-if="visibleRun">
			Python {{ status }}
			<v-tooltip top v-if="visibleRun">
				<!-- eslint-disable-next-line vue/no-unused-vars -->
				<template v-slot:activator="{ on }">
					<v-btn text @click="resetCode(runningElementId)" class="ntbk-btn">
						<v-img src="plugins/projects/notebook/data/img/icons/reset-icon.png"></v-img>
					</v-btn>
				</template>
				<span>Reset</span>
			</v-tooltip>
			<v-tooltip top v-if="visibleRun && status !== 'STOPPED'">
				<!-- eslint-disable-next-line vue/no-unused-vars -->
				<template v-slot:activator="{ on }">
					<v-btn text @click="stopInterpretor()" class="ntbk-btn">
						<v-img src="plugins/projects/notebook/data/img/icons/stop-icon.png"></v-img>
					</v-btn>
				</template>
				<span>Stop</span>
			</v-tooltip>
		</div>
	</div>
	<div v-else>
		{{$t('NOTEBOOK_LOAD_PROJECT')}}
	</div>
</template>

<script>
import { v4 } from 'uuid';
import marked from 'marked';
import AceNotebook from './AceNotebook.vue';
import { mapGetters } from 'vuex';
import highlight from 'highlight.js';
import katex from 'katex';

import { EventEmitter } from 'events';
export let events = new EventEmitter ();

let notebook = null;
export function getNotebook()
{
	return notebook;
}

var renderer = new marked.Renderer();
marked.setOptions({
	renderer: renderer,
	gfm: true,
	tables: true,
	breaks: false,
	pedantic: false,
	sanitize: false,
	smartLists: true,
	smartypants: false,
	highlight: function (code, lang) {
		try
		{
			var html = code;
			if (!lang) 
				html = highlight.highlightAuto (code).value;
			else 
				html = highlight.highlight(lang, code).value;
			return html;
		}
		catch (e)
		{
			return code;
		}
	},
	latex: function (text, style)
	{
		try
		{
			var web = katex.renderToString (text, (style?{displayMode: true}:null));
			if (style) web = '<span style="font-size: 20px">'+web+'</span>';
			return web;
		}
		catch (e)
		{
			return text;
		}
	},
});

export default {
	name: 'Notebook',
	data()
	{
		return {
			elements: [
			
				{ id: v4(), type: 'markdown',editable: false,data: '# New Item', code: '', error: '', result:''},
			],
			nextId : 0,
			visibleId: '',
			editElementId: '',
			runningId: '',
			items: [
				{ 
					title: 'Markdown',
					type: 'markdown' 
				},
				{ 
					title: 'Python',
					type: 'python' 
				}
			],
			events: events,
			status:'READY',
			runningElementId: '',
			onlyOne: true
		};
	},
	components: {
		AceNotebook
	},
	watch: {	
		currentProject:
		{
			async handler (){
				if (this.currentProject)
				{
					let data = await this.studio.projects.loadSpecialFile(this.currentProject,'notebook.json');
					if(data !== null)
					{
						try
						{
							this.elements = JSON.parse (data);
						}
						catch(e)
						{
							this.studio.workspace.showError('NOTEBOOK_LOAD_DATA_ERROR', {error: e.message});
						}
					} 
					else
					{
						this.elements = [{ id: v4(), type: 'markdown',editable: false, data: '# Steps to build a project', code: '', error: '', result: ''}];
					}
					if (this.elements.length === 0) 
						this.elements = [{ id: v4(), type: 'markdown',editable: false, data: '# Steps to build a project', code: '', error: '', result: ''}];
				}
				else
				{
					this.elements = [{ id: v4(), type: 'markdown',editable: false, data: '# Steps to build a project', code: '', error: '', result: ''}];
				}				
			},
		},
		elements: { 
			deep:true,
			handler: function (/* val, oldVal */){
				this.save ();
			}		
		}
	},
	mounted()
	{
		notebook = this;
	},
	methods: {
		async save () {
			if (this.currentProject)
			{
				await this.studio.projects.saveSpecialFile(this.currentProject,'notebook.json', JSON.stringify (this.elements));
			}
		},
		async resetNotebook () {
			let value = await this.studio.workspace.showCustomConfirmationPrompt(
				'NOTEBOOK_RESET_NOTEBOOK_TITLE',
				'NOTEBOOK_RESET_NOTEBOOK_QUESTION',
				{
					false: this.$t('NO'),
					true: {
						color: 'orange',
						text: this.$t('YES'),
						handle: () => {
							return new Promise(resolve => {
								setTimeout(resolve, 100);
							});
						}
					}
				}
			);
			if (value === 'yes')
			{
				this.elements = [{ id: v4(), type: 'markdown',editable: false, data: '# Steps to build a project', code: '', error: '', result: ''}];
				if (this.currentProject)
				{
					this.studio.projects.saveSpecialFile(this.currentProject,'notebook.json', JSON.stringify (this.elements));
				}
			}
			
		},
		itemTypeName (type)
		{
			return this.items.find ((item) => item.type === type).title;
		},
		moveUp(id)
		{
			try
			{
				let index = this.elements.findIndex(e=>e.id === id);
				if(index >= 1)
				{
					let aux = this.elements[index];
					this.elements[index] = this.elements[index-1];
					this.elements[index-1] = aux;
					this.$forceUpdate();
					this.save ();
				}
			}
			catch(e)
			{
				this.studio.workspace.warn (e);
			}
		},
		moveDown(id)
		{
			try
			{
				let index = this.elements.findIndex(e=>e.id === id);

				if(index < this.elements.length-1)
				{
					let aux = this.elements[index];
					this.elements[index] = this.elements[index+1];
					this.elements[index+1] = aux;
					this.$forceUpdate();
					this.save ();
				}
			}
			catch(e)
			{
				this.studio.workspace.warn (e);
			}
		},
		async deleteElement(element)
		{
			let value = await this.studio.workspace.showCustomConfirmationPrompt(
				'NOTEBOOK_DELETE_ITEM_TITLE',
				'NOTEBOOK_DELETE_ITEM_QUESTION',
				{
					false: this.$t('NO'),
					true: {
						color: 'orange',
						text: this.$t('YES'),
						handle: () => {
							return new Promise(resolve => {
								setTimeout(resolve, 100);
							});
						}
					}
				}
			);
			if (value === 'yes' && this.elements.length > 1) {
				this.elements = this.elements.filter(e=>e.id !== element.id);
			} 	
		},
		addElement()
		{
			this.elements.push(
				{
					id: v4 (), 
					type: 'markdown',
					editable: false,
					data: '# New Item',
					code:'',
					error: '', 
					result: ''
				});
			this.onlyOne = false;
		},
		firstElement(id)
		{
			let index = this.elements.findIndex(e=>e.id === id);
			if(index=== 0)
				return true;
			else
				return false;
		},
		openEditArea(element)
		{
			element.editable = true;	
		},
		showCurrentElement(element)
		{
			if (element)
			{
				this.visibleId = element.id;
				let otherElements = this.elements.filter(e=>e.id !== element.id);
				for(let other of otherElements)
					other.editable = false;
			}
			else
			{
				this.visibleId = '';
			}
		},
		runCode(id)
		{
			
			let index = this.elements.findIndex(e=>e.id === id);
			let currentElement = this.elements[index];
			currentElement.code='';
			currentElement.error='';
			currentElement.result = '';
			events.emit('run', currentElement.id, currentElement.data);
			// this.runningElementId = id;
		},
		compiledMarkdown: function(element) 
		{
			return marked(element.data);
		},
		printPythonCode(id, data)
		{
			let element = this.elements.find(e=>e.id === id);
			element.code = data;
			this.$forceUpdate();
		},
		printPythonError(id, data)
		{
			let element = this.elements.find(e=>e.id === id);
			element.error = data;
			this.$forceUpdate();
		},
		printPythonResult(id, data)
		{
			let element = this.elements.find(e=>e.id === id);
			element.result = data;
			this.$forceUpdate();
		},
		setStatus (id, status)
		{
			this.runningId = id;
			this.status = status;
		},
		stopCode(/* id */)
		{
			events.emit('stop', this.runningId);
		},
		stopInterpretor()
		{
			events.emit('stop');
		},
		resetCode(/* id */)
		{
			events.emit('reset');
		}
	},
	computed: {
		...mapGetters ({
			currentProject: 'projects/currentProject',
			device: 'workspace/device'
		}),
		visibleRun() {
			return this.device.status === 'CONNECTED';
		}
	}
};
</script>


<style lang="less" scoped>
	@import '../style/notebook.less';
</style>

<style lang="less">
.v-window-item {
	img {
		height: initial !important;
		width: auto;
		max-width: 100%;
		max-height: 70vh;
	}
}
</style>