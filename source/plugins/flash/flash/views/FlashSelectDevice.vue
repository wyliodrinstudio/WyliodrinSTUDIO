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
	async mounted () {
		this.flashers = this.studio.flash.flashers;

		if(this.studio.system.platform () === 'browser' || !this.fromBurger) {
			for(let flasher of this.flashers)
				this.newBoard(flasher.id, flasher.name, flasher.boardLogo);
			
			this.boardID = this.flashers[0].id;
		} else {
			this.devices = await this.studio.serialport.list();

			for(let i = 0; i < this.devices.length; i++) {
				let board = this.devices[i];
				let flasher = this.studio.flash.getFlasherByVP(board.vendorId.toLowerCase(), board.productId.toLowerCase());

				this.newBoard(i, flasher.name, flasher.boardLogo);
			}

			this.boardID = 0;
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
				let neededFlasher = this.studio.flash.getFlasher(this.boardID);

				this.studio.workspace.showDialog (neededFlasher.dialogVue, {
					device: this.device,
					version: neededFlasher.name,
					width: 500
				});
			} else 
				this.studio.workspace.showDialog (this.studio.flash.getFlasherByName(this.boards[this.boardID].title).dialogVue, {
					device: this.devices[this.boardID],
					version: this.boards[this.boardID].title,
					fromBurger: true,
					width: 500
				});
		}
	}
};
</script>

<style lang="less" scoped>
	@import '..//style/projectlibrary.less';
</style>