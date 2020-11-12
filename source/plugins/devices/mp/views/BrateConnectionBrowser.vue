<template>
	<v-card>
		<v-card-title>
			<span class="headline">{{$t('DEVICE_MP_SERIAL_OPTIONS')}}</span>
		</v-card-title>
		<v-card-text>
			<v-layout class="input-container" wrap>
				<v-text-field :label="$t('DEVICE_MP_SERIAL_BAUDRATE')"  required v-model="baudrate">{{$t('DEVICE_SERIAL_BAUDRATE')}}</v-text-field>
			</v-layout>
		</v-card-text>
		
		<v-card-text>
			<v-select class="drpdown"
							:label="$t('DEVICE_MP_DROPDOWN_TITLE')"
							:items="items"
							v-model="chartType"
							item-text = "title"
							item-value = "title"
							hide-details
			></v-select>
		</v-card-text>

		<v-card-text>
			<input type="checkbox" id="checkbox" v-model="checked" checked>
			<label for="checkbox">{{$t('DEVICE_MP_CHECKBOX')}}</label>
		</v-card-text>

		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn text @click="connect">{{$t('DEVICE_MP_CONNECT')}}</v-btn>
			<v-btn text @click="close">{{$t('DEVICE_MP_EXIT')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	name: 'SerialConnectionDialog',
	props: ['device'],
	data ()
	{
		return {
			baudrate: this.device.baudrate || 115200,
			port: this.device.address,
			items: [
				{ title: 'Autodetect' },
				{ title: 'MicroPython' },
				{ title: 'CircuitPython' }
			],
			chartType: 'STEP'
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
			this.$root.$emit ('submit', {
				baudrate: this.baudrate,
				port: this.port,
			});
		},
		close ()
		{
			this.$root.$emit('submit');
		}
	}
};
</script>
