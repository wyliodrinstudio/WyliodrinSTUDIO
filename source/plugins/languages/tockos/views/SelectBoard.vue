<template>
	<v-card>
		<v-card-title>
			<span class="headline">{{$t('Select Board')}} </span>
		</v-card-title>
		<v-card-text >
			<v-container fluid v-if="downloadingStatus === ''">
				Start From Board
				<v-select v-model = "board" :items="boards" item-text = "name" item-value="board">
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

export default {
	name: 'SelectBoard',
	props: ['name'],
	data () {
		return {
			boards: BOARDS,
			board: BOARDS[0].board,
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
			this.downloadingStatus = 'Fetching infos...';

			let boardRoot = 'boards/'+this.board;
			let boardInfos = await this.studio.tockos.getBoardListOfFiles(boardRoot);
			
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
						await this.studio.projects.newFile(this.name,filePath+'.kernel', await this.studio.tockos.downloadBoardFile(this.board,filePath));
					else if (filePath.indexOf('Cargo.toml') !== -1)
						await this.studio.projects.newFile(this.name,filePath, (await this.studio.tockos.downloadBoardFile(this.board,filePath)).toString()+'\n\n[workspace]\n');
					else
						await this.studio.projects.newFile(this.name,filePath, await this.studio.tockos.downloadBoardFile(this.board,filePath));
					
					downloadedFiles++;
					this.progress.value = (downloadedFiles/numberOfFiles)*100;
					this.progress.text = this.progress.value.toFixed(2)+'%';	
				}
			}
			this.downloadingStatus = 'Finished';
			this.$root.$emit ('submit', true);
		},
		close ()
		{
			this.$root.$emit ('submit', false);
		},
	}
};
</script>