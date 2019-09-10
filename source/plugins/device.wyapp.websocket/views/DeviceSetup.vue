<template>
	<v-card>
		<v-card-title>
			<span class="headline">{{$t('WYAPP_WEBSOCKET_NEW_DEVICE_TITLE')}}</span>
		</v-card-title>
		<v-card-text>
			<v-text-field autofocus :label="$t('WYAPP_WEBSOCKET_NEW_DEVICE_NAME')" required v-model="value"></v-text-field>
		</v-card-text>
		<v-card-text>
			<pre>{{json}}</pre>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
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
			return JSON.stringify ({token: this.token, id: this.value, server: window.location.href+'/socket/remote'}, null, 2);
		}
	},
	methods: {
		close ()
		{
			this.$root.$emit ('submit');
		}
	}
}
</script>