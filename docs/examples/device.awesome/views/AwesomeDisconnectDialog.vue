<template>
	<v-card class="disconnect">
		<v-tooltip>
			<template #activator="data">
				<v-btn @click.stop="disconnect" class="icon-btn" ref="reference">
					<img src="plugins/device.awesome/data/img/icons/disconnect-icon.svg" :alt="$t('DEVICE_AWESOME_DISCONNECT')" class="s24">
				</v-btn>
			</template>
			<span>{{$t('DEVICE_AWESOME_DISCONNECT')}}</span>
		</v-tooltip>
	</v-card>
</template>

<script>
export default {
	name: 'AwesomeDisconnectDialog',
	methods: {
		disconnect ()
		{
			this.$root.$emit ('submit', {
				disconnect: 'disconnect'
			});
		},
		esc() {
			this.$root.$emit('submit');
		}
	}
}
</script>

<style lang="less" scoped>
	@import '../style/device.less';
</style>