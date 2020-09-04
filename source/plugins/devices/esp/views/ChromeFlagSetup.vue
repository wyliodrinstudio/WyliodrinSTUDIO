<template>
	<v-card>
		<v-card-title>
			<span class="headline">{{$t('DEVICE_ESP_FLAG_HEADER')}}</span>
		</v-card-title>
		<v-card-text>
			<div>
				{{$t('DEVICE_ESP_FLAG_STEP_ONE')}}
			</div>
			<div>
				{{$t('DEVICE_ESP_FLAG_STEP_TWO')}}
			</div>
			<div>
				{{$t('DEVICE_ESP_FLAG_STEP_THREE')}}
			</div>
			<div>
				{{$t('DEVICE_ESP_FLAG_CAREFUL')}}
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
	name: 'ChromeFlagSetup',
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