<template>
	<v-card>
		<v-card-title>
			<span class="headline">{{$t('PROJECT_WELCOME_CREATE_NEW_APP')}}</span>
		</v-card-title>
		<v-card-text style="height:210px;">
			<v-layout wrap>
				<v-text-field autofocus hide-details :label="$t('PROJECT_LIBRARY_NAME')"  required v-model="projectName"></v-text-field>
			</v-layout>
			<v-layout wrap>
				<v-radio-group row v-model="languageID" class="project-lang-box">
					<label v-for="language of ProgLanguages" :key="language.id" class="project-lang">
						<v-radio :label="language.title" :value="language.id"></v-radio>
						<v-img :src="language.icon"></v-img>
					</label>
				</v-radio-group>
			</v-layout>
			
			<br><br>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn text class="newapp" @click="newProject()">{{$t('PROJECT_LIBRARY_NEW_PROJECT')}}</v-btn>
			<v-btn text @click="close">{{$t('PROJECT_LIBRARY_CLOSE')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import _ from 'lodash';

export default {
	name: 'AddProjectDialog',
	data () {
		return {
			projectName: '',
			ProgLanguages:[],
			languageID:'',
			projects:[]
		};
	},
	methods: {
		enter() {
			this.newProject();
		}, 
		async newProject()
		{
			if(this.projectName === '') {
				await this.studio.workspace.showNotification ('PROJECT_NAME_PROMPT');
			} else if(this.projects.find(x => x.name === this.projectName) !== undefined) {
				await this.studio.workspace.showNotification ('PROJECT_EXISTS_PROMPT');
			} else {
				let type = this.studio.projects.getLanguage(this.languageID);
				let project = await this.studio.projects.createEmptyProject(this.projectName,this.languageID);
				if(project && _.isFunction(type.options.createProject)){
					if(await type.options.createProject(project))
					{
						this.languageID='';
						this.projectName='';				
					}
				}
				this.close();
			}
			

			
		},
		esc() {
			this.close();
		}, 
		close ()
		{
			this.$root.$emit ('submit', undefined);
		}
	},
	async created()
	{
		this.projects = await this.studio.projects.loadProjects(false);
		this.ProgLanguages = this.studio.projects.languages;
		this.languageID = this.ProgLanguages[0].id;
	},
};
</script>

<style lang="less" scoped>
	@import '../../style/projectlibrary.less';
</style>