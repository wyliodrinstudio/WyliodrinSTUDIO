<template>
	<v-card>
		<v-card-title>
			<span class="headline">{{$t('FLASH_ESP')}}</span>
		</v-card-title>
		<v-card-text>
			<div>
				<v-row align="center" justify="center">
					<p>{{ progress.text }}</p>
					<v-progress-linear
						rounded
						striped
						:value="progress.value"
						height="15"
						:color="progress.color"
					></v-progress-linear>
				</v-row>
			</div>
		</v-card-text>
		<v-card-actions>
			<v-btn :disabled='!progress.started || canceled' text @click="cancel">{{$t('CANCEL')}}</v-btn>
			<v-spacer/>
			<v-btn :disabled="progress.started" text @click="close">{{$t('BACK')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import FlashSelectDevice from '../../flash/views/FlashSelectDevice.vue';
import FlashCancel from '../../flash/views/FlashCancel.vue';
import * as espFlash from '../data/esp-web-flasher/index.js';

export default {
	name: 'FlashDialog',
	props: ['device', 'fromBurger'],
	data ()
	{
		return  {
			espLoader: null,
			closed: 0,
			canceled: false,
			port: null,
			progress: {
				value: 0,
				text: '',
				color: 'teal',
				started: false
			}
		};
	},
	mounted() {
		this.connect();
	},
	methods: {
		async connect ()
		{
			this.progress.started = true;

			if(!this.device) {
				this.progress.text = this.$t('FLASH_SELECT_DEVICE');
				this.progress.color = 'teal';
				this.progress.value = 0;

				try {
					this.port = await navigator.serial.requestPort({
						filters: [{usbVendorId: 0x1a86}]
					});

					await this.flash(this.port);
				} 
				catch (error) {
					this.close();
				}
			} else {
				this.progress.started = true;
				this.progress.text = this.$t('FLASH_CONNECTING_TEXT');
				
				this.port = new this.studio.serialport.SerialPort();

				if(!this.fromBurger)
					await this.port.connect(this.device.address, 115200);
				else
					await this.port.connect(this.device.path, 115200);

				await this.port.open();
				await this.sleep(1000);

				try {
					await this.flash(this.port);
				} 
				catch (error) {
					//this.close();
				}
			}

			this.progress.started = false;
		},
		//Fake Logger to send to the espFlash, with log, error and debug functions.
		log(message) {
			return message;
		},
		error(message) {
			return message;
		},
		debug(message) {
			return message;
		},
		async sleep(time) {
			await new Promise(resolve => setTimeout(resolve, time));
		},
		async flash(port) {
			this.progress.started = true;

			try {
				this.progress.text = this.$t('FLASH_CONNECTING_TEXT');
				this.espLoader = await espFlash.connect(port, this);
				this.progress.text = this.$t('FLASH_INITIALIZING_TEXT');
			} catch (error) {
				this.progress.text = error;
			}

			try {
				await this.espLoader.initialize();
			} catch (error) {
				this.progress.text = error;

				this.espLoader.disconnect();
				return;
			}

			let chipFamily = this.getChipFamily();
			
			if(chipFamily == 'Unknown Chip') {
				this.espLoader.disconnect();
				this.progress.text = this.$t('FLASH_UNKNOWN_BOARD_TEXT');
				this.progress.color = 'red';

				return;
			}

			let data = {};

			if(chipFamily == 'ESP8266') {
				data.file = await this.studio.filesystem.loadDataFile('flash/flash.esp', 'micropython/esp8266-v1.16.bin');
				data.offset = 0;
			} else {
				data.file = await this.studio.filesystem.loadDataFile('flash/flash.esp', 'micropython/esp32-v1.16.bin');
				data.offset = 4096;
			}

			const espStub = await this.espLoader.runStub();

			if(this.device)
				data.file = new Uint8Array(data.file);

			this.progress.text = this.$t('FLASH_ERASING_DEVICE_TEXT');
			await espStub.eraseFlash();

			this.progress.value = 0;
			this.progress.text = `${this.$t('FLASH_WRITING_PROGRESS')} ${this.progress.value}%`;

			try {
				await espStub.flashData(data.file.buffer, bytesWritten => {
					if(this.canceled) {
						this.close();
						throw 'Canceled flashing data';
					}

					this.progress.value = (bytesWritten / data.file.byteLength) * 100;
					this.progress.text = `${this.$t('FLASH_WRITING_PROGRESS')} ${Math.floor(this.progress.value)}%`;
				}, data.offset, true);
			} catch (error) {
				this.progress.text = error;
				this.progress.color = 'red';

				this.espLoader.disconnect();
				return;
			}

			this.progress.text = this.$t('FLASH_DISCONNECTING_TEXT');
			await this.espLoader.hardReset();
			await this.espLoader.disconnect();

			this.progress.text = this.$t('FLASH_COMPLETE_TEXT');
		},
		getChipFamily () {
			switch (this.espLoader.chipFamily) {
				case espFlash.CHIP_FAMILY_ESP32:
					return 'ESP32';
				case espFlash.CHIP_FAMILY_ESP8266:
					return 'ESP8266';
				default:
					return 'Unknown Chip';
			}
		},
		close ()
		{
			if(!this.closed) {
				this.$root.$emit ('submit');

				if(!this.device)
					this.studio.workspace.showDialog (FlashSelectDevice, {
						width: 500
					});
			
				this.closed = 1;
			}
		},
		async cancel ()
		{
			let action = await this.studio.workspace.showDialog  (FlashCancel, {
				width: 400
			});

			if(action)
				this.canceled = true;
		}
	}
};
</script>