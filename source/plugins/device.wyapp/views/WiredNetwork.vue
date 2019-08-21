<template>
	<div class="p-20">
		<!--<div v-if="network.up">Connected <img src="img/icons/wifi-strength-100.png" aria-label="Signal strenght"></div>
		<div v-else>Disconnected</div>-->
		<div class="networkinfo">
			<strong>IP:</strong> {{network.ip}}
			<br>
			<strong>Mask:</strong> {{network.m}}
			<br>
			<strong>Broadcast:</strong> {{network.b}}
			<br>
			<strong>Hardware Address:</strong> {{network.h}}
		</div>
	</div>
</template>

<script>
module.exports = {
	name: 'WiredNetwork',
	props: ['network']
};
</script>