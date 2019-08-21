<template>
	<div class="dashboard-content">
		<div class="graph-signal">
			<!-- <v-btn @click="emitSignal">click for signal</v-btn> -->
			<li v-for="signal in signals" :key="signal.id">
				<div>
					<!-- <div class="warning-graph" @hide="signal.signalTitle">
						<v-img src="plugins/dashboard/data/img/icons/warning-icon.png"></v-img>
						<v-tooltip bottom>
						{{$t('DASHBOARD_VIEWER_IVALID_SIGNAL')}}
						</v-tooltip>
					</div> -->
					<h3  class="graph-title">{{ signal.data.signalTitle }}</h3>
					<v-btn @click="left(signal.id)" icon class="dash-btn">
						<v-img src="plugins/dashboard/data/img/icons/move-left-icon.svg" aria-label="DASHBOARD_VIEWER_MOVE_LEFT" class="s24"></v-img>
						<v-tooltip bottom>{{ $t('DASHBOARD_VIEWER_MOVE_LEFT')}}</v-tooltip>
					</v-btn>
					<v-btn @click="right (signal.id)" icon class="dash-btn">
						<v-img src="plugins/dashboard/data/img/icons/move-right-icon.svg" aria-label="DASHBOARD_VIEWER_MOVE_RIGHT" class="s24"></v-img>
						<v-tooltip bottom>{{ $t('DASHBOARD_VIEWER_MOVE_RIGHT') }}</v-tooltip>
					</v-btn>
					
					<v-btn :v-if="isFunction (signal.setup)" icon @click="setup(signal)" class="dash-btn">
						<v-img src="plugins/dashboard/data/img/icons/settings-icon.svg" aria-label="DASHBOARD_VIEWER_GRAPH_SETTINGS" class="s24"></v-img>
						<v-tooltip bottom>{{ $t('DASHBOARD_VIEWER_GRAPH_SETTINGS') }}</v-tooltip>
					</v-btn>
					<v-btn @click="erase(signal)" icon class="dash-btn">
						<v-img src="plugins/dashboard/data/img/icons/erase-icon.svg" aria-label="DASHBOARD_VIEWER_ERASE_GRAPH" class="s18"></v-img>
						<v-tooltip bottom>
						{{ $t('DASHBOARD_VIEWER_ERASE_GRAPH') }}
						</v-tooltip>
					</v-btn>
					<component :is="signal.component" :data="signal.data" class="graph-box" :class="'graph-box-'+signals.width"></component>
				</div>	
			</li>
		</div>
		<div class="widgets-toolBox">
			<v-layout v-for="graph in graphs" :key="graph.name" class="widget_item">
				<v-btn @click.stop="addSignal (graph)" class="widget_btn">
					<p class="widget_title">{{$t(graph.name)}}</p>
					<img :src="graph.iconURL" :alt="$t(graph.name)">
				</v-btn>
			</v-layout> 
		</div>
	</div>
</template>
<script>
import uuid from 'uuid';
import { mapGetters } from 'vuex';
import _ from 'lodash';

export default {
	name: 'Dashboard',
	data()
	{
		return {
			canvas: false,
			signals: [],
			newValue: 0
		}
	},
	computed: {
		
		graphs: {
			get ()
			{
				return this.$store.getters['dashboard/graphs'];
			},
			set (value)
			{
				this.$store.dispatch('dashboard/graphs', value);
			} 
		},
		...mapGetters ({
			graphs: 'dashboard/graphs'
		}),
		forceUpdate ()
		{
			return true;
		}
	},
	methods: {
		left(id)
		{
			try
			{
				let index = this.signals.findIndex(e=>e.id === id);
				if (index > 0)
				{
					let aux = this.signals[index];
					this.signals[index] = this.signals[index-1];
					this.signals[index-1] = aux;
					this.$forceUpdate();
				}
			}
			catch(e)
			{
				console.log(e.message);
			}
		},
		right(id)
		{
			try
			{
				let index = this.signals.findIndex(e=>e.id === id);
				if (index < this.signals.length-1)
				{
					let aux = this.signals[index];
					this.signals[index] = this.signals[index+1];
					this.signals[index+1] = aux;
					this.$forceUpdate();
				}
			}
			catch(e)
			{
				console.log(e.message);
			}
		},
		erase(signal)
		{
			this.signals = this.signals.filter(e=>e.id !== signal.id)
		},
		async addSignal (graph)
		{
			let signal = {
				id: uuid.v4(),
				component: graph.component,
				setup: graph.setup,
				data: {}
			};
			if (_.isFunction (signal.setup))
			{
				signal.data = await signal.setup (signal.data);
				if (signal.data)
				{
					this.signals.push (signal);
				}
			}
			else
			{
				this.signals.push (signal);
			}
		},
		isFunction (f)
		{
			return _.isFunction (f);
		},
		async setup(signal)
		{
			let index = this.signals.findIndex(e=>e.id === signal.id);
			try 
			{
				signal.data = await signal.setup (signal.data);
				this.signals[index].data = signal.data;
			}
			catch(e)
			{
				console.log(e.message);
			}	
		},
		emitSignal()
		{
			this.studio.dashboard.emitSignal('LineGraph',this.newValue);
			this.newValue+=10;
			this.studio.dashboard.emitSignal('GaugeGraph', this.newValue);
			this.studio.dashboard.emitSignal('SpeedometerGraph', this.newValue);
			this.studio.dashboard.emitSignal('VumeterGraph', this.newValue);
			this.studio.dashboard.emitSignal('ThermometerGraph', this.newValue);
		}
	}
}
</script>

<style lang="less">
	@import '../style/dashboard.less';
</style>
