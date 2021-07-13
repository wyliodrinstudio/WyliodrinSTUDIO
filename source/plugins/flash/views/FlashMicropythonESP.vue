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
import FlashSelectDevice from './FlashSelectDevice.vue';
import FlashCancel from './FlashCancel.vue';
import * as espFlash from '../data/espFlasher/index.js';

export default {
	name: 'FlashMicropythonESP',
	data ()
	{
		return  {
			espLoader: null,
			closed: 0,
			canceled: false,
			port: null,
			progress: {
				value: 0,
				text: 'Please select device.',
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
			this.progress.text = 'Please select device.';
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
		async flash(port) {
			this.progress.started = true;

			try {
				this.progress.text = 'Connecting...';
				this.espLoader = await espFlash.connect(port, this);
				this.progress.text = 'Initializing...';
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
				this.progress.text = 'Unknown ESP Board...';
				this.progress.color = 'red';

				return;
			}

			let data = {};

			if(chipFamily == 'ESP8266') {
				data.file = await this.studio.filesystem.loadDataFile('flash', 'micropython/esp8266-v1.16.bin');
				data.offset = 0;
			} else {
				data.file = await this.studio.filesystem.loadDataFile('flash', 'micropython/esp32-v1.16.bin');
				data.offset = 4096;
			}

			const espStub = await this.espLoader.runStub();

			this.progress.text = 'Erasing device...';
			await espStub.eraseFlash();
			this.progress.text = 'Device erased.';

			this.progress.value = 0;
			this.progress.text = `Writing progress: ${this.progress.value}%`;

			try {
				await espStub.flashData(data.file.buffer, bytesWritten => {
					if(this.canceled) {
						this.close();
						throw 'Canceled flashing data';
					}

					this.progress.value = (bytesWritten / data.file.byteLength) * 100;
					this.progress.text = `Writing progress: ${Math.floor(this.progress.value)}%`;
				}, data.offset, true);
			} catch (error) {
				this.progress.text = error;
				this.progress.color = 'red';

				this.espLoader.disconnect();
				return;
			}

			this.progress.text = 'Writing complete.';

			await this.espLoader.hardReset();
			await this.espLoader.disconnect();

			this.progress.text = 'All done!';
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