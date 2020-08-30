<template>
	<v-card class="devicesett-box">
		<v-card-title>
			<span class="headline">{{$t('DEVICE_WYAPP_SETTINGS')}}</span>
			<v-spacer></v-spacer>
		</v-card-title>
		<v-card-text>
			<v-text-field :label="$t('DEVICE_WYAPP_NAME')"  required v-model="name">{{$t('DEVICE_WYAPP_NAME')}}</v-text-field>
			<div style="padding:0 0 10px 0;"><strong>{{$t('DEVICE_WYAPP_VERSION')}}:</strong> {{device.properties.version}}</div>
			<div style="padding:0 0 10px 0;"><strong>{{$t('DEVICE_WYAPP_OS')}}:</strong> {{device.properties.os || device.properties.os}}</div>
			<div style="padding:0 0 10px 0;"><strong>{{$t('DEVICE_WYAPP_LIBWYLIODRIN')}}:</strong> {{device.properties.libwyliodrin}}</div>
			<div style="padding:0 0 10px 0;" class="langtype"><strong>{{$t('DEVICE_WYAPP_LANGUAGES')}}:</strong> <span v-for="(languageAvailable, language) in device.properties.languages" :key="language">{{language }}</span></div>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn text @click="rename">{{$t('OK')}}</v-btn>
			<v-btn text @click="close">{{$t('CLOSE')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<style lang="less" scoped>
	@import '../style/device.less';
</style>

<script>
export default {
	name: 'DeviceSettings',
	props: ['device'],
	data () {
		return {
			name: this.device.name
		};
	},
	methods: {
		close ()
		{
			this.$root.$emit ('submit');
		},
		rename ()
		{
			this.studio.device_wyapp._sendToDevice (this.device, 'n', {n: this.name});
			this.$root.$emit ('submit', this.name);
		},
	}
};
</script>

