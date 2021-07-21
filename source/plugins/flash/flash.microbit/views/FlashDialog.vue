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
			<v-btn :disabled='!progress.started' text @click="cancel">{{$t('CANCEL')}}</v-btn>
			<v-spacer/>
			<v-btn :disabled='progress.started' text @click="close">{{$t('BACK')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import FlashSelectDevice from '../../flash/views/FlashSelectDevice.vue';
import FlashCancel from '../../flash/views/FlashCancel.vue';
const DAPjs = require('dapjs');
let usb = null;

export default {
	name: 'FlashDialog',
	props: ['device', 'version', 'fromBurger'],
	data ()
	{
		return  {
			progress: {
				value: 0,
				text: '',
				color: 'teal',
				started: false
			},
			buffer: null,
			closed: 0,
			target: null
		};
	},
	mounted () {
		usb = this.loadUSB();
		this.connect();
	},
	methods: {
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

			if(action) this.target.disconnect();
		},
		async readHex ()
		{
			if(this.version == 1)
				this.buffer = await this.studio.filesystem.loadDataFile('flash/flash.microbit', 'micropython/microbit-v1.0.1.hex');
			else if(this.version == 2)
				this.buffer = await this.studio.filesystem.loadDataFile('flash/flash.microbit', 'micropython/microbit-v2.0.0.hex');
		},
		async connect ()
		{
			if(!this.device) {
				this.progress.text = this.$t('FLASH_SELECT_DEVICE');
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
			} else {
				let devices = usb.getDeviceList();
				if(!this.fromBurger)
					devices = devices.filter(device => device.deviceDescriptor.idProduct === parseInt(this.device.properties.productId, 16) && device.deviceDescriptor.idVendor === parseInt(this.device.properties.vendorId, 16));
				else
					devices = devices.filter(device => device.deviceDescriptor.idProduct === parseInt(this.device.productId, 16) && device.deviceDescriptor.idVendor === parseInt(this.device.vendorId, 16));

				if(devices.length != 1) {
					this.progress.text = this.$t('FLASH_DEVICE_NOT_FOUND');
					this.progress.color = 'red';
				} else {
					try {
						await this.flash(devices[0]);

					} catch (error) {
						//this.close();
					}
				}
			}

			this.progress.started = false;
		},
		async flash (device) 
		{
			this.progress.started = true;
			await this.readHex();
			
			let transport = null;

			if(!this.device)
				transport = new DAPjs.WebUSB(device);
			else
				transport = new DAPjs.USB(device);

			this.target = new DAPjs.DAPLink(transport);

			this.target.on(DAPjs.DAPLink.EVENT_PROGRESS, progress => {
				this.progress.text = `${this.$t('FLASH_WRITING_PROGRESS')} ${Math.floor(progress * 100)}%`;
				this.progress.value = progress * 100;
			});

			try {
				await this.target.connect();
				await this.target.flash(this.buffer.buffer);

				this.progress.text = this.$t('FLASH_DISCONNECTING_TEXT');
				await this.target.disconnect();

				this.progress.text = this.$t('FLASH_COMPLETE_TEXT');
			}
			catch (error) {
				this.progress.text = error;
				this.progress.color = 'red';
			}
		},
		loadUSB ()
		{
			try
			{
				// written like this to work with webpack when target is browser
				return eval ('require(\'usb\')');
			}
			catch (e)
			{	
				this.studio.workspace.error ('usb: usb is not available '+e.message);
				return null;
			}
		}
	}
};
</script>