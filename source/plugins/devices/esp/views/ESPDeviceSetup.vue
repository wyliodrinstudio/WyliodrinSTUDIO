<template>
	<v-card>
		<v-card-title>
			<span class="headline">{{$t('ESP_NOT_CONNECTED_YET')}}</span>
		</v-card-title>
		<v-card-text>,
			<img src="plugins/device.esp/data/img/icons/nothing_here.jpg" style="width:100%;"><!--</img> -->
			
			<div>
				{{$t('CONNECT_ESP_DEVICE')}}
			</div>
			<div v-show="binary">
				{{$t('ESP_NEW_DEVICE_FLASH_INSTRUCTIONS')}}
			</div>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn text @click="flash" v-show="binary">{{$t('DEVICE_ESP_FLASH')}}</v-btn>
			<v-btn text @click="close">{{$t('CLOSE')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	name: 'ESPDeviceSetup',
	props: ['token', 'binary', 'filename'],
	data () {
		return {
			value: ''
		};
	},
	computed: {
		json ()
		{
			return JSON.stringify ({token: this.token, id: this.value.trim (), server: window.location.href+'socket/remote'}, null, 2);
		},
		nameValid ()
		{
			return (this.value.trim ().length > 0);
		}
	},
	methods: {
		flash ()
		{
			this.studio.filesystem.openExportDialog (this.binary, {filename: this.filename+'.bin', type:'application/binary'});
		},
		close ()
		{
			this.$root.$emit ('submit');
		}
	}
}
</script>