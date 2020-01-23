<template>
	<v-card class="manager-box">
		<v-card-title>
			<span class="headline">{{$t('DEVICE_WYAPP_NETWORK_MANAGER')}}</span>
			<v-spacer></v-spacer>
		</v-card-title>
		<v-card-text>
			<div v-if="!networks">
				<v-progress-circular indeterminate></v-progress-circular>
			</div>
			<v-tabs v-model="active" left class="tabs-box">
				<v-tab v-for="network in networks" :key="network.i" ripple>
					<v-img :src="'plugins/devices/wyapp/plugin/data/img/icons/'+networkIcon (network)+'-icon.svg'" aria-label="WiFi" ></v-img>
					{{network.i}}
				</v-tab>
			</v-tabs>
			<v-tabs-items v-model="active">
				<v-tab-item v-for="network in networks" :key="network.i" fill-height>
					<WiredNetwork v-if="network.t === 'e'" :network="network"></WiredNetwork>
					<WirelessNetwork v-if="network.t === 'w'" :network="network" :wireless-networks="wirelessNetworks[network.i]" @link="link" @unlink="unlink"></WirelessNetwork>
				</v-tab-item>
			</v-tabs-items>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn text @click="close" ref="button">{{$t('CLOSE')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import WiredNetwork from './WiredNetwork.vue';
import WirelessNetwork from './WirelessNetwork.vue';
import { mapGetters } from 'vuex';
export default {
	name: 'NetworkManager',
	props: ['connection'],
	components: {
		WiredNetwork,
		WirelessNetwork
	},
	data () {
		return {
			dialog: false,
			active: 0,
			networks: null,
			wirelessNetworks: {

			}
		};
	},
	mounted() {
		this.$refs.button.$el.focus();
	},
	computed: {
		...mapGetters ({
			device: 'workspace/device',
		}),
	},
	created ()
	{
		this.connection.send ('net', {
			a: 'run'
		});
		this.connection.on ('tag:net', this.updateNetworks);
	},
	destroyed ()
	{
		this.connection.send ('net', {
			a: 'stop'
		});
		this.connection.removeListener ('tag:net', this.updateNetworks);
	},
	methods: {
		esc() {
			this.close();
		},
		close ()
		{
			this.$root.$emit ('submit');
		},
		networkIcon (network)
		{
			if (network.t === 'e') return 'eth';
			else if (network.t === 'w') return 'wifi';
			else return 'eth';
		},
		updateNetworks (data)
		{
			if (data.a === 'l')
			{
				this.networks = data.n;
				for (let network of this.networks)
				{
					if (network.t === 'w')
					{
						this.connection.send ('net', {a:'s', i:network.i});
					}
				}
			}
			else
			if (data.a === 's')
			{
				if (data.e)
				{
					// TODO show error
					delete this.wirelessNetworks[data.i];
				}
				else
				{
					let wirelessNetworksMap = {};
					data.n.filter ((wirelessNetwork) => {
						if (!wirelessNetworksMap[wirelessNetwork.s])
						{
							wirelessNetworksMap[wirelessNetwork.s] = wirelessNetwork;
						}
						else
						{
							if (wirelessNetworksMap[wirelessNetwork.s].q < wirelessNetwork.q)
							{
								wirelessNetworksMap[wirelessNetwork.s] = wirelessNetwork;
							}
						}
					});
					this.wirelessNetworks[data.i] = Object.values (wirelessNetworksMap).sort ((wirelessNetwork1, wirelessNetwork2) => {
						let s1 = wirelessNetwork1.s.toLowerCase ();
						let s2 = wirelessNetwork2.s.toLowerCase ();
						if (s1 < s2) return -1;
						else
						if (s1 > s2) return 1;
						else return 0;
					});
					if (this.wirelessNetworks[data.i])
					{
						// push the connect to other network
						this.wirelessNetworks[data.i].push ({s: '', p:'wpa2'});
					}
				}
			}
		},
		link (network)
		{
			this.connection.send ('net', {
				a: 'c', 
				...network
			});
		},
		unlink (network)
		{
			this.connection.send ('net', {
				a: 'd',
				...network
			});
		}
	}
};
</script>

