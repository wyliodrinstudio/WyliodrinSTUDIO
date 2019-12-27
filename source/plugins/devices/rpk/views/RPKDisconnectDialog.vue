<template>
	<v-card class="disconnect">
		<v-tooltip top>
			<template v-slot:activator="{ on }">
				<v-btn @click.stop="disconnectAndStandby" class="icon-btn" v-on="on">
					<img src="plugins/devices/rpk/data/img/icons/standby-icon.svg" :alt="$t('DEVICE_RPK_STANDBY')" class="s24">
				</v-btn>
			</template>
			<span>{{$t('DEVICE_RPK_STANDBY')}}</span>
		</v-tooltip>
		<v-tooltip top>
			<template v-slot:activator="{ on }">
				<v-btn @click.stop="disconnect" class="icon-btn" ref="reference" v-on="on">
					<img src="plugins/devices/rpk/data/img/icons/disconnect-icon.svg" :alt="$t('DEVICE_RPK_DISCONNECT')" class="s24">
				</v-btn>
			</template>
			<span>{{$t('DEVICE_RPK_DISCONNECT')}}</span>
		</v-tooltip>
		<v-tooltip top>
			<template v-slot:activator="{ on }">
				<v-btn @click.stop="disconnectAndStop" class="icon-btn" v-on="on">
					<img src="plugins/devices/rpk/data/img/icons/turn-off-icon.svg" :alt="$t('DEVICE_RPK_TURNOFF')" class="s24">
				</v-btn>
			</template>
			<span>{{$t('DEVICE_RPK_TURNOFF')}}</span>
		</v-tooltip>
	</v-card>
</template>

<script>
export default {
	name: 'RPKDisconnectDialog',
	mounted() {
		this.$nextTick (() => {
			this.$refs.reference.$el.focus(); 
		}); 
	}, 
	methods: {
		disconnectAndStop ()
		{
			this.$root.$emit ('submit', {
				disconnect: 'stop'
			});
		},
		disconnectAndStandby ()
		{
			this.$root.$emit ('submit', {
				disconnect: 'standby'
			});
		},
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