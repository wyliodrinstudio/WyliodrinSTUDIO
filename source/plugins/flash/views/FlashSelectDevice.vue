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
	props: ['device', 'fromBurger'],
	data () {
		return {
			devices: [],
			boards: [],
			boardID: null
		};
	},
	async mounted () {
		if(this.studio.system.platform () === 'browser' || !this.fromBurger) {
			this.newBoard('esp', 'ESP8266/32', 'plugins/flash/data/img/ESP.png');
			this.newBoard('micro1', 'Micro:bit V1', 'plugins/flash/data/img/microbit1.png');
			this.newBoard('micro2', 'Micro:bit V2', 'plugins/flash/data/img/microbit2.png');

			this.boardID = 'esp';
		} else {
			this.devices = await this.studio.serialport.list();

			this.boardID = 0;
			for(let i = 0; i < this.devices.length; i++) {
				let board = this.devices[i];

				if(board.vendorId.toLowerCase() == '1a86')
					this.newBoard(i,'ESP8266/32', 'plugins/flash/data/img/ESP.png');
				else if(board.vendorId.toLowerCase() == '0d28' || board.vendorId.toLowerCase() == 'd28') {
					//Get version of micro:bit (v1.3 = 9900, v1.5 = 9901, v2 = 9903 || 9904)
					let serialNumber = board.serialNumber.substring(0, 4);

					if(serialNumber == '9900' || serialNumber == '9901') this.newBoard(i, 'Micro:bit V1', 'plugins/flash/data/img/microbit1.png');
					else if(serialNumber == '9903' || serialNumber == '9904') this.newBoard(i, 'Micro:bit V2', 'plugins/flash/data/img/microbit2.png');
				}
			}
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
		showDialog (dialog)
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
		}
	}
};
</script>

<style lang="less" scoped>
	@import '..//style/projectlibrary.less';
</style>