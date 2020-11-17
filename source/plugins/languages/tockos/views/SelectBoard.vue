<template>
	<v-card>
		<v-card-title>
			<span class="headline">{{$t('Select Board')}} </span>
		</v-card-title>
		<v-card-text >
			<v-container fluid v-if="downloadingStatus === ''">
				<v-select return-object v-model = "gitVesion" :items="gitVesions" item-text="name"  label="Select TockOS Repo Version">
				</v-select>
				<v-select v-model = "board" :items="boards[gitVesion.tag]" item-text = "name" item-value="board" label="Select Board"> 
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
import Axios from 'axios';

export default {
	name: 'SelectBoard',
	props: ['name'],
	data () {
		return {
			gitVesions: [],
			gitVesion: undefined,
			boards: BOARDS,
			board: undefined,
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
			tag: 'master'
		});
		this.gitVesions = this.gitVesions.concat(RELEASES.tock);
		this.gitVesion = this.gitVesions[0];
		this.board = this.boards[this.gitVesion.tag][0];
	},
	methods: {
		async select ()
		{
			await this.downloadBoardFiles();
			await this.generateBoardSetupFile();
			await this.generateGitPrepareFile();

			this.$root.$emit ('submit', true);
		},
		async downloadBoardFiles() {
			this.downloadingStatus = 'Fetching infos...';

			let boardRoot = 'boards/'+this.board;
			let boardInfos = await this.getBoardListOfFiles(boardRoot);
			
			let numberOfFiles = 0;
			for (let key in boardInfos) {
				numberOfFiles += boardInfos[key].length;
			}
			
			this.downloadingStatus = 'Downloading...';
			let downloadedFiles = 0;
			this.progress.text = this.progress.value.toFixed(2)+'%';
			for (let key in boardInfos) {
				let folderPath = key.replace(boardRoot, '');
				if (folderPath !== '') {
					await this.studio.projects.newFolder(this.name,folderPath);
				}
				for (let file of boardInfos[key]) {
					let filePath = file.replace(boardRoot, '');
					
					if (filePath.indexOf('Makefile') !== -1)
						await this.studio.projects.newFile(this.name,filePath+'.kernel', await this.downloadBoardFile(this.board,filePath));
					else
						await this.studio.projects.newFile(this.name,filePath, await this.downloadBoardFile(this.board,filePath));
					
					downloadedFiles++;
					this.progress.value = (downloadedFiles/numberOfFiles)*100;
					this.progress.text = this.progress.value.toFixed(2)+'%';	
				}
			}
			this.downloadingStatus = 'Finished';
		},
		async generateBoardSetupFile() {
			let boardRoot = 'boards/'+this.board;

			await this.studio.projects.newFile(this.name, '.project/boardSetup.sh', Mustache.render(boardSetupTemplate, {boardRoot}));
		},
		async generateGitPrepareFile() {
			let gitPrepare = 'cd $TOCK_DIR && git reset --hard\n';
			gitPrepare += 'cd $TOCK_DIR && git clean -f -d\n';
			gitPrepare += `cd $TOCK_DIR && git checkout ${this.gitVesion.tag}\n`;
			if (this.gitVesion.name === 'Latest') {
				gitPrepare += 'cd $TOCK_DIR && git pull\n';
			}
			
			await this.studio.projects.newFile(this.name, '.project/gitPrepare.sh', gitPrepare);
		},
		async downloadBoardFile (board, filename) {
			let response = await Axios.get (`https://raw.githubusercontent.com/tock/tock/${this.gitVesion.tag}/boards/${board}${filename}`);
			return response.data;
		},
		async getDirListOfFiles (path, dirInfos) {
			let response = await Axios.get (`https://api.github.com/repos/tock/tock/contents/${path}?ref=${this.gitVesion.tag}`);
		
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
		async getBoardListOfFiles (boardRoot) {
			let boardInfos = {};
		
			await this.getDirListOfFiles(boardRoot, boardInfos);
		
			return boardInfos;
		},
		close ()
		{
			this.$root.$emit ('submit', false);
		},
	}
};
</script>