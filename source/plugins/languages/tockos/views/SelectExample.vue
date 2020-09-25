<template>
	<v-card>
		<v-card-title>
			<span class="headline">{{$t('Select Example')}}</span>
		</v-card-title>
		<v-card-text>
			<v-container fluid v-if="downloadingStatus === ''">
				Start From an Example Application
				<v-select v-model = "example" :items="examples" item-text = "name" item-value="example">
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

export default {
	name: 'SelectExample',
	props: ['name'],
	data () {
		return {
			examples: EXAMPLES,
			example: EXAMPLES[0].example,
			downloadingStatus: '',
			progress: {
				value: 0,
				text: 'N/A'
			}
		};
	},
	computed: {
		
	},
	methods: {
		async select ()
		{
			if (this.example !== '') {
				this.downloadingStatus = 'Fetching infos...';
				let exampleRoot = 'examples/'+this.example;
				let exampleInfos = await this.studio.tockos.getLibtockListOfFiles(exampleRoot);
				
				let numberOfFiles = 0;
				for (let key in exampleInfos) {
					numberOfFiles += exampleInfos[key].length;
				}

				this.downloadingStatus = 'Downloading...';
				let downloadedFiles = 0;
				this.progress.text = downloadedFiles + '/' + numberOfFiles;
				for (let key in exampleInfos) {
					let folderPath = key.replace(exampleRoot, '');
					if (folderPath !== '') {
						await this.studio.projects.newFolder(this.name,folderPath);
					}

					for (let file of exampleInfos[key]) {
						let filePath = file.replace(exampleRoot, '');
						
						if (filePath.indexOf('Makefile') !== -1)
							await this.studio.projects.newFile(this.name,filePath+'.app', await this.studio.tockos.downloadLibtockcFile(this.example,filePath));
						else
							await this.studio.projects.newFile(this.name,filePath, await this.studio.tockos.downloadLibtockcFile(this.example,filePath));
						
						downloadedFiles++;
						this.progress.text = downloadedFiles+'/'+numberOfFiles;
						this.progress.value = (downloadedFiles/numberOfFiles)*100;	
					}
				}

				this.downloadingStatus = 'Finished';
			} else {
				await this.studio.projects.newFile(this.name, './main.c', '');
			}

			this.$root.$emit ('submit', true);
		},
		close ()
		{
			this.$root.$emit ('submit', false);
		}
	}
};
</script>