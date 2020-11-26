<template>
	<v-card>
		<v-card-title>
			<span class="headline">{{$t('Select Example')}}</span>
		</v-card-title>
		<v-card-text>
			<v-container fluid v-if="downloadingStatus === ''">
				Start From an Example Application
				<v-select return-object v-model = "gitInfos.version" :items="gitVersions" item-text="name"  label="Select TockOS Repo Version">
				</v-select>
				<v-select v-model = "example" :items="examples[gitInfos.version.tag]" item-text = "name" item-value="example" label="Select Example">
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

export default {
	name: 'SelectExample',
	props: ['name'],
	data () {
		return {
			gitVersions: [],
			examples: EXAMPLES,
			example: undefined,
			downloadingStatus: '',
			progress: {
				value: 0,
				text: 'N/A'
			},
			gitInfos: {
				owner: 'tock',
				repo: 'libtock-c',
				version: undefined
			}
		};
	},
	created: function () {
		this.gitVersions.push({
			name: 'Latest',
			tag: RELEASES['libtock-c'][0].tag
		});
		this.gitVersions = this.gitVersions.concat(RELEASES['libtock-c']);
		this.gitInfos.version = this.gitVersions[0];
		this.example = this.examples[this.gitInfos.version.tag][0].example;
	},
	methods: {
		async select ()
		{
			if (this.example !== '') {
				if (this.gitInfos.version.name === 'Latest') {
					this.gitInfos.version.tag = 'master';
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
			let exampleRoot = `examples/${this.example}`;
			let exampleInfos = await this.studio.github.getRepoFileHierarchy(exampleRoot, this.gitInfos.owner, this.gitInfos.repo, this.gitInfos.version.tag);
			
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
					let filePath = file;
					filePath = filePath.replace(exampleRoot, '');
					
					if (filePath.indexOf('Makefile') !== -1)
						await this.studio.projects.newFile(this.name,filePath+'.app', await this.studio.github.downloadFile(file, this.gitInfos.owner, this.gitInfos.repo, this.gitInfos.version.tag));
					else
						await this.studio.projects.newFile(this.name,filePath, await this.studio.github.downloadFile(file, this.gitInfos.owner, this.gitInfos.repo, this.gitInfos.version.tag));
					
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
			gitPrepare += `cd $TOCK_LIBC_DIR && git checkout ${this.gitInfos.version.tag}\n`;
			if (this.gitInfos.version.name === 'Latest') {
				gitPrepare += 'cd $TOCK_LIBC_DIR && git pull\n';
			}
			
			await this.studio.projects.newFile(this.name, '.project/gitPrepare.sh', gitPrepare);
		},
		close ()
		{
			this.$root.$emit ('submit', false);
		}
	}
};
</script>
