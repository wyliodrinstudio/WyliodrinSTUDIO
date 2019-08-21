<template>
	<div>
		<!--<div v-if="network.up">Connected</div>
		<div v-else>Disocnnected</div>
		<br>-->
		<!--<div v-for="wirelessNetwork in wirelessNetworks" :key="wirelessNetwork.s">
			<strong>SSID:</strong> {{wirelessNetwork.s}}
			<br>
			<strong>RSS:</strong> <img src="img/icons/wifi-strength-100.png" aria-label="Signal strenght"> {{signalStrength(wirelessNetwork)}}
		</div>-->
		<table class="w-100">
			<tr v-for="wirelessNetwork in wirelessNetworks" :key="wirelessNetwork.s" class="w-100 task">
				<td class="w-50 signal">
					<h3><img src="plugins/device.wyapp/data/img/icons/wifi-strength-100.png" aria-label="Signal strenght"> {{wirelessNetwork.s}}</h3>
				</td>
				<td class="w-50 text-right">
					<v-btn text class="lib-app-btn">Disconnect / Change network</v-btn>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
module.exports = {
	name: 'WirelessNetwork',
	props: ['network', 'wirelessNetworks'],
	methods: {
		signalStrength (wirelessNetwork)
		{
			let value;
			if (wirelessNetwork.q >= 75) value = 100;
			else
			if (wirelessNetwork.q >= 50) value = 75;
			else
			if (wirelessNetwork.q >= 25) value = 50;
			else value = 0;
			
			return value;
		}
	}
};
</script>