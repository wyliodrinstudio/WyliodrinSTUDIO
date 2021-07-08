<template>
	<v-card>
		<v-card-title>
			<span class="headline">{{$t('DEVICE_MP_HTTPS_HEADER')}}</span>
		</v-card-title>
		<v-card-text>
			<div>{{$t('DEVICE_MP_HTTPS_MESSAGE')}}</div>
		</v-card-text>
		<v-card-actions>
			<v-btn text @click="upgrade">{{$t('DEVICE_MP_HTTPS_SWITCH_CONNECTION')}}</v-btn>
			<v-spacer/>
			<v-btn text @click="close">{{$t('CLOSE')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	name: 'UpgradeToHttps',
	methods: {
		upgrade() {
			window.location.href = window.location.href.replace('http:', 'https:');  
		},
		close ()
		{
			this.$root.$emit ('submit');
		}
	}
};
</script>