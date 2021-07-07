<template>
	<v-card>
		<v-card-title>
			<span class="headline">{{$t('FLASH_MICROBIT')}}</span>
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
			<v-btn :disabled='progress.started' text @click="connect">{{$t('START')}}</v-btn>
			<v-spacer/>
			<v-btn :disabled='progress.started' text @click="close">{{$t('BACK')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import FlashSelectDevice from './FlashSelectDevice.vue';
const DAPjs = require('dapjs');

export default {
	name: 'FlashMicropythonMicrobit',
	data ()
	{
		return  {
			progress: {
				value: 0,
				text: 'Press START to begin.',
				color: 'teal',
				started: false
			},
			buffer: null
		};
	},
	methods: {
		close ()
		{
			this.$root.$emit ('submit');
			this.studio.workspace.showDialog (FlashSelectDevice, {
				width: 500
			});
		},
		async readHex ()
		{
			await fetch('plugins/flash/data/micropython/microbit-v1.0.1.hex').then(response => response.arrayBuffer()).then(buffer => this.buffer = buffer);
		},
		async connect ()
		{
			this.progress.text = 'Please select device.';
			this.progress.color = 'teal';
			this.progress.value = 0;
			this.progress.started = true;

			try {
				const device = await navigator.usb.requestDevice({
					filters: [{vendorId: 0xD28}]
				});

				await this.flash(device);
			} 
			catch (error) {
				this.progress.text = error;
				this.progress.color = 'red';
			}

			this.progress.started = false;
		},
		async flash (device) 
		{
			await this.readHex();

			const transport = new DAPjs.WebUSB(device);
			const target = new DAPjs.DAPLink(transport);

			target.on(DAPjs.DAPLink.EVENT_PROGRESS, progress => {
				this.progress.text = `Writing progress: ${progress * 100}%`;
				this.progress.value = progress * 100;
			});

			try {
				await target.connect();
				await target.flash(this.buffer);

				this.progress.text = 'Disconnecting...';
				await target.disconnect();

				this.progress.text = 'All done.';
				this.progress.color = 'green';
			}
			catch (error) {
				this.progress.text = error;
				this.progress.color = 'red';
			}
		}
	}
};
</script>