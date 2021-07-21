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
export default {
	name: 'FlashSelectDevice',
	props: ['device', 'fromBurger'],
	data () {
		return {
			devices: [],
			flashers: [],
			boards: [],
			boardID: null
		};
	},
	mounted () {
		this.flashers = this.studio.flash.flashers;

		if(this.studio.system.platform () === 'browser' || !this.fromBurger) {
			for(let flasher of this.flashers)
				this.newBoard(flasher.id, flasher.name, flasher.boardLogo);
			
			this.boardID = this.flashers[0].id;
		} else {
			
		}
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
		showDialog ()
		{
			if(this.studio.system.platform () === 'browser' || !this.fromBurger) {
				this.close();
				
				this.studio.workspace.showDialog (this.studio.flash.getFlasher(this.boardID).dialogVue, {
					device: this.device,
					version: this.boardID,
					width: 500
				});
			} else {

			}
		}
		/*showDialog (dialog)
		{
			if(this.studio.system.platform () === 'browser' || !this.fromBurger) {
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
			} else {
				let board = this.boards[this.boardID].title;

				if(board == 'ESP8266/32')
					this.studio.workspace.showDialog (FlashMicropythonESP, {
						device: this.devices[this.boardID],
						fromBurger: true,
						width: 500
					});
				else if(board == 'Micro:bit V1')
					this.studio.workspace.showDialog (FlashMicropythonMicrobit, {
						device: this.device,
						version: 1,
						fromBurger: true,
						width: 500
					});
				else if(board == 'Micro:bit V2')
					this.studio.workspace.showDialog (FlashMicropythonMicrobit, {
						device: this.device,
						version: 2,
						fromBurger: true,
						width: 500
					});
			}
		}*/
	}
};
</script>

<style lang="less" scoped>
	@import '..//style/projectlibrary.less';
</style>