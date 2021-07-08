<template>
	<v-card>
		<v-card-title>
			<span class="headline">{{$t('FLASH_MICROBIT')}} V{{this.version}}</span>
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
	props: ['version'],
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
	mounted () {
		this.connect();
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
			if(this.version == 1)
				this.buffer = await this.studio.filesystem.loadDataFile('flash', 'micropython/microbit-v1.0.1.hex');
			else if(this.version == 2)
				this.buffer = await this.studio.filesystem.loadDataFile('flash', 'micropython/microbit-v2.0.0.hex');
		},
		async connect ()
		{
			this.progress.text = 'Please select device.';
			this.progress.color = 'teal';
			this.progress.value = 0;

			try {
				const device = await navigator.usb.requestDevice({
					filters: [{vendorId: 0xD28}]
				});

				await this.flash(device);
			} 
			catch (error) {
				this.close();
			}

			this.progress.started = false;
		},
		async flash (device) 
		{
			this.progress.started = true;
			await this.readHex();

			const transport = new DAPjs.WebUSB(device);
			const target = new DAPjs.DAPLink(transport);

			target.on(DAPjs.DAPLink.EVENT_PROGRESS, progress => {
				this.progress.text = `Writing progress: ${Math.floor(progress * 100)}%`;
				this.progress.value = progress * 100;
			});

			try {
				await target.connect();
				await target.flash(this.buffer);

				this.progress.text = 'Disconnecting...';
				await target.disconnect();

				this.progress.text = 'All done.';
				this.progress.color = 'red';
			}
			catch (error) {
				this.progress.text = error;
				this.progress.color = 'red';
			}
		}
	}
};
</script>