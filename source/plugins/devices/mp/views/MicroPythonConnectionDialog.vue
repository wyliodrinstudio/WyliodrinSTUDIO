<template>
	<v-card>
		<v-card-title>
			<span class="headline">{{$t('DEVICE_MP_SERIAL_OPTIONS')}}</span>
		</v-card-title>
		<v-card-text>
			<v-layout wrap>
				<v-text-field :label="$t('DEVICE_MP_SERIAL_PORT')" class="col-md-12" required v-model="port"></v-text-field>
				<v-text-field :label="$t('DEVICE_MP_SERIAL_BAUDRATE')" class="col-md-6" required v-model="baudrate" autofocus></v-text-field>
				<v-select class="dropdown col-md-6" 
							:label="$t('DEVICE_MP_VARIANT')"
							:items="items"
							v-model="python"
							item-text = "title"
							item-value = "value"
							hide-details
			></v-select>
			<div>
				<v-switch v-model="reset" :label="$t('DEVICE_MP_RESET_AFTER_CONNECT')"></v-switch>
			</div>
			</v-layout>
		</v-card-text>

		<v-card-actions>
			<div v-if="electron">
				<v-btn text @click="flash">{{$t('DEVICE_MP_FLASH')}}</v-btn>
			</div>
			<v-spacer></v-spacer>
			<v-btn text @click="connect">{{$t('DEVICE_MP_CONNECT')}}</v-btn>
			<v-btn text @click="close">{{$t('DEVICE_MP_EXIT')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import FlashSelectDevice from '../../../flash/flash/views/FlashSelectDevice.vue';

let defaults = {};

export default {
	name: 'MicroPythonConnectionDialog',
	props: ['device', 'electron'],
	data ()
	{
		let defvalue = defaults[this.device.address];
		return {
			baudrate: this.device.baudrate || ((defvalue && defvalue.baudrate)?defvalue.baudrate:115200),
			port: this.device.address,
			items: [
				{ 
					title: this.$t('DEVICE_MP_AUTODETECT'),
					value: 'autodetect'
				},
				{ 
					title: 'MicroPython',
					value: 'micropython'
				},
				{ 
					title: 'CircuitPython',
					value: 'circuitpython'
				},
			],
			python: this.device.python || ((defvalue && defvalue.python)?defvalue.python:'autodetect'),
			reset: this.device.reset || ((defvalue && defvalue.reset)?defvalue.reset:115200),
		};
	},
	methods: {
		enter() {
			this.connect();
		}, 
		esc() {
			this.close();
		}, 
		connect ()
		{
			if (this.port.length > 0)
			{
				this.$root.$emit ('submit', {
					baudrate: this.baudrate,
					port: this.port,
					python: this.python,
					reset: this.reset
				});
				defaults[this.port] = {
					baudrate: this.baudrate,
					python: this.python,
					reset: this.reset
				};
			}
		},
		close ()
		{
			this.$root.$emit('submit');
		},
		flash()
		{
			let neededFlasher = this.studio.flash.getFlasherByVP(this.device.properties.vendorId.toLowerCase(), this.device.properties.productId.toLowerCase());

			if(neededFlasher == null)
				this.studio.workspace.showDialog (FlashSelectDevice, {
					device: this.device,
					width: 500
				});
			else
				this.studio.workspace.showDialog(neededFlasher.dialogVue, {
					device: this.device,
					width: 500
				});
		}
	}
};
</script>
