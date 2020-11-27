<template>
	<v-card>
		<v-card-title>
			<span class="headline">{{$t('TOCK_OS_SELECT_BOARD')}} </span>
		</v-card-title>
		<v-card-text >
			<v-container fluid v-if="downloadingStatus === ''">
				<v-select return-object v-model = "gitInfos.version" :items="gitVersions" item-text="name"  label="$t('TOCK_OS_SELECT_RELEASE_VERSION')">
				</v-select>
				<v-select v-model = "board" :items="boards[gitInfos.version.tag]" item-text = "name" item-value="board" label="$t('TOCK_OS_SELECT_BOARD')"> 
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
import BOARDS from './boards.json';
import RELEASES from './releases.json';
import boardSetupTemplate from 'raw-loader!../template/boardSetup.template';
import Mustache from 'mustache';

export default {
	name: 'SelectBoard',
	props: ['name'],
	data () {
		return {
			gitVersions: [],
			boards: BOARDS,
			board: undefined,
			downloadingStatus: '',
			progress: {
				value: 0,
				text: 'N/A'
			},
			gitInfos: {
				owner: 'tock',
				repo: 'tock',
				version: undefined
			}
		};
	},
	created: function () {
		this.gitVersions.push({
			name: 'Latest',
			tag: RELEASES['tock'][0].tag
		});
		this.gitVersions = this.gitVersions.concat(RELEASES.tock);
		this.gitInfos.version = this.gitVersions[0];
		this.board = this.boards[this.gitInfos.version.tag][0].board;
	},
	methods: {
		async select ()
		{
			if (this.gitInfos.version.name === 'Latest') {
				this.gitInfos.version.tag = 'master';
			}
			
			await this.downloadBoardFiles();
			await this.generateBoardSetupFile();
			await this.generateGitPrepareFile();

			this.$root.$emit ('submit', true);
		},
		async downloadBoardFiles() {
			this.downloadingStatus = this.$t('TOCK_OS_STATUS_FETCHING');
			let boardRoot = `boards/${this.board}`;
			let boardInfos = await this.studio.github.getRepoFileHierarchy(boardRoot, this.gitInfos.owner, this.gitInfos.repo, this.gitInfos.version.tag);
			
			let numberOfFiles = 0;
			for (let key in boardInfos) {
				numberOfFiles += boardInfos[key].length;
			}
			
			this.downloadingStatus = this.$t('TOCK_OS_STATUS_DOWNLOADING');
			let downloadedFiles = 0;
			this.progress.text = this.progress.value.toFixed(2)+'%';
			for (let key in boardInfos) {
				let folderPath = key.replace(boardRoot, '');
				if (folderPath !== '') {
					await this.studio.projects.newFolder(this.name,folderPath);
				}
				for (let file of boardInfos[key]) {
					let filePath = file;
					filePath = filePath.replace(boardRoot, '');
					
					if (filePath.indexOf('Makefile') !== -1)
						await this.studio.projects.newFile(this.name,filePath+'.kernel', await this.studio.github.downloadFile(file, this.gitInfos.owner, this.gitInfos.repo, this.gitInfos.version.tag));
					else
						await this.studio.projects.newFile(this.name,filePath, await this.studio.github.downloadFile(file, this.gitInfos.owner, this.gitInfos.repo, this.gitInfos.version.tag));
					
					downloadedFiles++;
					this.progress.value = (downloadedFiles/numberOfFiles)*100;
					this.progress.text = this.progress.value.toFixed(2)+'%';	
				}
			}
			this.downloadingStatus = this.$t('TOCK_OS_STATUS_FINISHED');
		},
		async generateBoardSetupFile() {
			let boardRoot = `boards/${this.board}`;

			await this.studio.projects.newFile(this.name, '.project/boardSetup.sh', Mustache.render(boardSetupTemplate, {boardRoot}));
		},
		async generateGitPrepareFile() {
			let gitPrepare = 'cd $TOCK_KERNEL_DIR && git reset --hard\n';
			gitPrepare += 'cd $TOCK_KERNEL_DIR && git clean -f -d\n';
			gitPrepare += `cd $TOCK_KERNEL_DIR && git checkout ${this.gitInfos.version.tag}\n`;
			if (this.gitInfos.version.name === 'Latest') {
				gitPrepare += 'cd $TOCK_KERNEL_DIR && git pull\n';
			}
			
			await this.studio.projects.newFile(this.name, '.project/gitPrepare.sh', gitPrepare);
		},
		close ()
		{
			this.$root.$emit ('submit', false);
		},
	}
};
</script>
