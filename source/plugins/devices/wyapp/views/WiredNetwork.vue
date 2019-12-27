<template>
	<div class="p-20">
		<!--<div v-if="network.up">Connected <img src="img/icons/wifi-strength-100.png" aria-label="Signal strenght"></div>
		<div v-else>Disconnected</div>-->
		<div class="networkinfo">
			<strong>{{$t('DEVICE_WYAPP_WIREDNETWORK_IP')}}:</strong> {{network.ip}}
			<br>
			<strong>{{$t('DEVICE_WYAPP_WIREDNETWORK_MASK')}}:</strong> {{network.m}}
			<br>
			<strong>{{$t('DEVICE_WYAPP_WIREDNETWORK_BROADCAST')}}:</strong> {{network.b}}
			<br>
			<strong>{{$t('DEVICE_WYAPP_WIREDNETWORK_HARDWARE')}}:</strong> {{network.h}}
		</div>
	</div>
</template>

<script>
module.exports = {
	name: 'WiredNetwork',
	props: ['network']
};
</script>