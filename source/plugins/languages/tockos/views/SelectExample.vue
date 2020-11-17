<template>
	<v-card>
		<v-card-title>
			<span class="headline">{{$t('Select Example')}}</span>
		</v-card-title>
		<v-card-text>
			<v-container fluid v-if="downloadingStatus === ''">
				Start From an Example Application
				<v-select return-object v-model = "gitVesion" :items="gitVesions" item-text="name"  label="Select TockOS Repo Version">
				</v-select>
				<v-select v-model = "example" :items="examples[gitVesion.tag]" item-text = "name" item-value="example" label="Select Example">
				</v-select>
			</v-container>
			<v-container fluid style="height: 170px;" v-else-if="downloadingStatus !== ''">
				<v-row align="center" justify="center">
					{{downloadingStatus}}

					<v-progress-circular
						:rotate="-90"
						:size="100"
						:width="15"
						:value="progress.value"
						color="teal"
					>
						{{ progress.text }}
					</v-progress-circular>
				</v-row>
			</v-container>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn text @click="select" :disabled="downloadingStatus !== ''">{{$t('SELECT')}}</v-btn>
			<v-btn text @click="close" :disabled="downloadingStatus !== ''">{{$t('CLOSE')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import EXAMPLES from './examples.json';
import RELEASES from './releases.json';
import Axios from 'axios';

export default {
	name: 'SelectExample',
	props: ['name'],
	data () {
		return {
			gitVesions: [],
			gitVesion: undefined,
			examples: EXAMPLES,
			example: undefined,
			downloadingStatus: '',
			progress: {
				value: 0,
				text: 'N/A'
			}
		};
	},
	created: function () {
		this.gitVesions.push({
			name: 'Latest',
			tag: RELEASES['libtock-c'][0].tag
		});
		this.gitVesions = this.gitVesions.concat(RELEASES['libtock-c']);
		this.gitVesion = this.gitVesions[0];
		this.example = this.examples[this.gitVesion.tag][0];
	},
	methods: {
		async select ()
		{
			if (this.example !== '') {
				if (this.gitVesion.name === 'Latest') {
					this.gitVesion.tag = 'master';
				}
				await this.downloadExampleFiles();
			} else {
				await this.studio.projects.newFile(this.name, './main.c', '');
			}

			await this.generateGitPrepareFile();

			this.$root.$emit ('submit', true);
		},
		async downloadExampleFiles() {
			this.downloadingStatus = 'Fetching infos...';
			let exampleRoot = 'examples/'+this.example;
			let exampleInfos = await this.getLibtockListOfFiles(exampleRoot);
			
			let numberOfFiles = 0;
			for (let key in exampleInfos) {
				numberOfFiles += exampleInfos[key].length;
			}

			this.downloadingStatus = 'Downloading...';
			let downloadedFiles = 0;
			this.progress.text = this.progress.value.toFixed(2)+'%';
			for (let key in exampleInfos) {
				let folderPath = key.replace(exampleRoot, '');
				if (folderPath !== '') {
					await this.studio.projects.newFolder(this.name,folderPath);
				}

				for (let file of exampleInfos[key]) {
					let filePath = file.replace(exampleRoot, '');
					
					if (filePath.indexOf('Makefile') !== -1)
						await this.studio.projects.newFile(this.name,filePath+'.app', await this.downloadLibtockcFile(this.example,filePath));
					else
						await this.studio.projects.newFile(this.name,filePath, await this.downloadLibtockcFile(this.example,filePath));
					
					downloadedFiles++;
					this.progress.value = (downloadedFiles/numberOfFiles)*100;	
					this.progress.text = this.progress.value.toFixed(2)+'%';
				}
			}

			this.downloadingStatus = 'Finished';
		},
		async generateGitPrepareFile() {
			let gitPrepare = 'cd $TOCK_LIBC_DIR && git reset --hard\n';
			gitPrepare += 'cd $TOCK_LIBC_DIR && git clean -f -d\n';
			gitPrepare += `cd $TOCK_LIBC_DIR && git checkout ${this.gitVesion.tag}\n`;
			if (this.gitVesion.name === 'Latest') {
				gitPrepare += 'cd $TOCK_LIBC_DIR && git pull\n';
			}
			
			await this.studio.projects.newFile(this.name, '.project/gitPrepare.sh', gitPrepare);
		},
		async downloadLibtockcFile (example, filename) {
			let response = await Axios.get(`https://raw.githubusercontent.com/tock/libtock-c/${this.gitVesion.tag}/examples/${example}${filename}`);
			return response.data;
		},
		async getLibtockListOfFiles (exampleRoot) {
			let exampleInfos = {};
			
			await this.getDirListOfFiles(exampleRoot, exampleInfos, 'libtock-c');

			return exampleInfos;
		},
		async getDirListOfFiles (path, dirInfos) {
			let response = await Axios.get(`https://api.github.com/repos/tock/libtock-c/contents/${path}?ref=${this.gitVesion.tag}`);
		
			for(let item of response.data) {
				if (item.type === 'file') {
					if (dirInfos[path] === undefined) {
						dirInfos[path] = [];
					}
					dirInfos[path].push(item.path);
				}
				else if (item.type === 'dir') {
					await this.getDirListOfFiles(item.path, dirInfos);
				}
			}
		},	
		close ()
		{
			this.$root.$emit ('submit', false);
		}
	}
};
</script>