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
		<div class="networkinfo" v-if="network.ip">
			<strong>{{$t('DEVICE_WYAPP_SSID')}}:</strong> {{network.s}}
			<br>
			<strong>{{$t('DEVICE_WYAPP_WIREDNETWORK_IP')}}:</strong> {{network.ip}}
			<br>
			<strong>{{$t('DEVICE_WYAPP_WIREDNETWORK_MASK')}}:</strong> {{network.m}}
			<br>
			<strong>{{$t('DEVICE_WYAPP_WIREDNETWORK_BROADCAST')}}:</strong> {{network.b}}
			<br>
			<strong>{{$t('DEVICE_WYAPP_WIREDNETWORK_HARDWARE')}}:</strong> {{network.h}}
			<v-btn text class="lib-app-btn" @click="unlink ()">{{$t('DEVICE_WYAPP_DISCONNECT')}}</v-btn>
		</div>
		<div v-else>
			<div v-if="!wirelessNetworks">
				<v-progress-circular indeterminate></v-progress-circular>
			</div>
			<table v-else class="w-100">
				<tr v-for="wirelessNetwork in wirelessNetworks" :key="wirelessNetwork.s" class="w-100 task">
					<td class="w-50 signal">
						<h3><img :src="'plugins/device.wyapp/data/img/icons/wifi-strength-'+signalStrength(wirelessNetwork)+'.png'" aria-label="Signal strenght"> {{networkSSID (wirelessNetwork)}}</h3>
						<div v-if="wirelessNetwork.s === SSID">
							<v-text-field v-if="wirelessNetwork.s === ''" :label="$t('DEVICE_WYAPP_SSID')" v-model="linkSSID"></v-text-field>
							<v-text-field type="password" :label="$t('DEVICE_WYAPP_PSK')" v-model="linkPSK"></v-text-field>
							<v-btn v-if="network.s !== wirelessNetwork.s" text class="lib-app-btn" @click="link(wirelessNetwork)">{{$t('DEVICE_WYAPP_CONNECT')}}</v-btn>
						</div>
					</td>
					<td class="w-50 text-right" v-show="wirelessNetwork.s !== SSID">
						<v-btn v-if="!wirelessNetwork.linking" text class="lib-app-btn" @click="connect (wirelessNetwork)">{{$t('DEVICE_WYAPP_CONNECT')}}</v-btn>
						<div v-else>
							<v-progress-circular indeterminate></v-progress-circular>
						</div>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
module.exports = {
	name: 'WirelessNetwork',
	props: ['network', 'wirelessNetworks'],
	data () {
		return {
			SSID: null,
			linkSSID: null,
			linkPSK: ''
		};
	},
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
		},
		connect (wn)
		{
			this.SSID = wn.s;
			this.linkSSID = wn.s;
			this.linkPSK = '';
		},
		link (wirelessNetwork)
		{
			wirelessNetwork.linking = true;
			this.$emit ('link', {
				i: this.network.i,
				s: this.linkSSID,
				p: this.linkPSK
			});
			this.SSID = null;
		},
		unlink ()
		{
			this.$emit ('unlink', {
				i: this.network.i
			});
		},
		networkSSID (wirelessNetwork)
		{
			if (wirelessNetwork.s.length > 0) return wirelessNetwork.s;
			else return this.$t('DEVICE_WYAPP_SSID_OTHER_NETWORK');
		}
	}
};
</script>