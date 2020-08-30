<template>
	<v-card>
		<v-card-title>
			<span class="headline">{{$t('DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_TITLE')}}</span>
		</v-card-title>
		<v-card-text>
			<v-text-field autofocus :label="$t('DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_NAME')" required v-model="value"></v-text-field>
			<pre v-show="nameValid">{{json}}</pre>
			<div v-show="!nameValid">{{$t('DEVICE_WYAPP_WEBSOCKET_NEW_DEVICE_NAME_NOT_VALID')}}</div>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn text @click="more">{{$t('DEVICE_WYAPP_WEBSOCKET_MORE_INFO')}}</v-btn>
			<v-btn text @click="close">{{$t('CLOSE')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	name: 'DeviceSetup',
	props: ['token'],
	data () {
		return {
			value: ''
		};
	},
	computed: {
		json ()
		{
			let server = window.location.href;
			if (server.startsWith('file://')) server = 'https://beta.wyliodrin.studio/';
			return JSON.stringify ({token: this.token, id: this.value.trim (), server: server+'socket/remote'}, null, 2);
		},
		nameValid ()
		{
			return (this.value.trim ().length > 0);
		}
	},
	methods: {
		more ()
		{
			this.studio.system.openLink ('https://wyliodrinstudio.readthedocs.io/en/latest/boards.html');
		},
		close ()
		{
			this.$root.$emit ('submit');
		}
	}
};
</script>