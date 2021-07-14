<template>
	<v-card>
		<v-card-title>
			<span class="headline">{{$t('FLASH_SELECT_BOARD')}}</span>
		</v-card-title>
		<v-card-text>
			<v-layout>
				<v-radio-group v-model="boardID" row class="project-lang-box">
					<label v-for="board of boards" :key="board.id" class="project-lang">
						<v-radio :label="board.title" :value="board.id"></v-radio>
						<v-img :src="board.logo"></v-img>
					</label>
				</v-radio-group>
			</v-layout>
		</v-card-text>
		<v-card-actions>
			<v-spacer/>
			<v-btn text @click="showDialog(boardID)">{{$t('SELECT')}}</v-btn>
			<v-btn text @click="close">{{$t('CLOSE')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import FlashMicropythonESP from './FlashMicropythonESP.vue';
import FlashMicropythonMicrobit from './FlashMicropythonMicrobit.vue';

export default {
	name: 'FlashSelectDevice',
	props: ['device'],
	data () {
		return {
			boards: [],
			boardID: null
		};
	},
	mounted () {
		this.newBoard('esp', 'ESP8266/32', 'plugins/flash/data/img/ESP.png');
		this.newBoard('micro1', 'Micro:bit V1', 'plugins/flash/data/img/microbit1.png');
		this.newBoard('micro2', 'Micro:bit V2', 'plugins/flash/data/img/microbit2.png');

		this.boardID = 'esp';
	},
	methods: {
		newBoard (id, title, logo) 
		{
			let board = {
				id: id,
				title: title,
				logo: logo
			};

			this.boards.push(board);
		},
		close ()
		{
			this.$root.$emit ('submit');
		},
		showDialog (dialog)
		{
			this.close();
			if(dialog == 'esp')
				this.studio.workspace.showDialog (FlashMicropythonESP, {
					device: this.device,
					width: 500
				});
			else if(dialog == 'micro1')
				this.studio.workspace.showDialog (FlashMicropythonMicrobit, {
					device: this.device,
					version: 1,
					width: 500
				});
			else if(dialog == 'micro2')
				this.studio.workspace.showDialog (FlashMicropythonMicrobit, {
					device: this.device,
					version: 2,
					width: 500
				});
		}
	}
};
</script>

<style lang="less" scoped>
	@import '..//style/projectlibrary.less';
</style>