<template>
	<div class="dashboard-content">
		<v-navigation-drawer
			absolute
			permanent
			expand-on-hover
			right
			width="200"
		>
			<v-list dense>
				<v-list-item link v-for="graph in graphs" :key="graph.name" @click.stop="addSignal (graph)">
					<v-list-item-avatar>
						<v-img :src="graph.iconURL"></v-img>
					</v-list-item-avatar>
					<v-list-item-title>{{$t(graph.name)}}</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<!-- <v-navigation-drawer
			permanent
			expand-on-hover
			right
		>
			<v-list
			nav
			dense
			>
				<v-list-item link v-for="graph in graphs" :key="graph.name">
					<v-list-item-icon>
						<v-img :src="graph.iconURL"></v-img>
					</v-list-item-icon>
					<v-list-item-title>{{$t(graph.name)}}</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-navigation-drawer> -->
		<!-- <div class="graph-signal">
			<li v-for="signal in signals" :key="signal.i">
				<div>-->
					<!-- <div class="warning-graph" @hide="signal.id">
						<v-img src="plugins/dashboard/dashboard/data/img/icons/warning-icon.png"></v-img>
						<v-tooltip bottom>
						{{$t('DASHBOARD_VIEWER_IVALID_SIGNAL')}}
						</v-tooltip>
					</div> -->
					<!--<h3  class="graph-title">{{ signal.data.id }}</h3>
					<v-btn @click="left(signal.i)" icon class="dash-btn">
						<v-img src="plugins/dashboard/dashboard/data/img/icons/move-left-icon.svg" aria-label="DASHBOARD_VIEWER_MOVE_LEFT" class="s24"></v-img>
						<v-tooltip bottom>{{ $t('DASHBOARD_VIEWER_MOVE_LEFT')}}</v-tooltip>
					</v-btn>
					<v-btn @click="right (signal.i)" icon class="dash-btn">
						<v-img src="plugins/dashboard/dashboard/data/img/icons/move-right-icon.svg" aria-label="DASHBOARD_VIEWER_MOVE_RIGHT" class="s24"></v-img>
						<v-tooltip bottom>{{ $t('DASHBOARD_VIEWER_MOVE_RIGHT') }}</v-tooltip>
					</v-btn>
					
					<v-btn :v-if="isFunction (signal.setup)" icon @click="setup(signal)" class="dash-btn">
						<v-img src="plugins/dashboard/dashboard/data/img/icons/settings-icon.svg" aria-label="DASHBOARD_VIEWER_GRAPH_SETTINGS" class="s24"></v-img>
						<v-tooltip bottom>{{ $t('DASHBOARD_VIEWER_GRAPH_SETTINGS') }}</v-tooltip>
					</v-btn>
					<v-btn @click="erase(signal)" icon class="dash-btn">
						<v-img src="plugins/dashboard/dashboard/data/img/icons/erase-icon.svg" aria-label="DASHBOARD_VIEWER_ERASE_GRAPH" class="s18"></v-img>
						<v-tooltip bottom>
						{{ $t('DASHBOARD_VIEWER_ERASE_GRAPH') }}
						</v-tooltip>
					</v-btn>
					<div class="graph-description">{{ signal.data.description }}</div>
					<component :is="signal.component" :data="signal.data" class="graph-box" :class="'graph-box-'+signals.width"></component>
				</div>	
			</li>
		</div> -->
		<GridLayout
            :layout="layout"
            :col-num="12"
            :row-height="30"
            :is-draggable="true"
            :is-resizable="true"
            :is-mirrored="false"
            :vertical-compact="true"
            :margin="[10, 10]"
            :use-css-transforms="true"
		>
			<GridItem v-for="signal in layout"
					:x="signal.x"
					:y="signal.y"
					:w="signal.w"
					:h="signal.h"
					:i="signal.i"
					:key="signal.i"
					drag-allow-from=".graph-header"
					drag-ignore-from=".graph-box"
					@resize="resizeEvent"
					@resized="resizeEvent"
					@container-resized="resizeEvent">
						<div class="graph-header">
							<h3  class="graph-title">{{ signals[signal.i].data.title || signals[signal.i].data.id || $t('DASHBOARD_UNKNOWN_TITLE') }}</h3>
							<!-- <div class="graph-description">{{ signals[signal.i].data.description }}</div> -->
							<v-btn @click="erase(signal.i)" icon class="dash-btn">
								<v-img src="plugins/dashboard/dashboard/data/img/icons/erase-icon.svg" aria-label="DASHBOARD_VIEWER_ERASE_GRAPH" class="s14"></v-img>
								<v-tooltip bottom>
								{{ $t('DASHBOARD_VIEWER_ERASE_GRAPH') }}
								</v-tooltip>
							</v-btn>
							<v-btn :v-if="signals[signal.i].setup" icon @click="setup(signal.i)" class="dash-btn">
								<v-img src="plugins/dashboard/dashboard/data/img/icons/settings-icon.svg" aria-label="DASHBOARD_VIEWER_GRAPH_SETTINGS" class="s18"></v-img>
								<v-tooltip bottom>{{ $t('DASHBOARD_VIEWER_GRAPH_SETTINGS') }}</v-tooltip>
							</v-btn>
						</div>	
						<component :is="signals[signal.i].component" :data="signals[signal.i].data" class="graph-box" :width="signal.width" :height="signal.height"></component>
			</GridItem>
		</GridLayout>

		<!-- <div class="widgets-toolBox">
			<v-layout v-for="graph in graphs" :key="graph.name" class="widget_item">
				<v-btn @click.stop="addSignal (graph)" class="widget_btn">
					<p class="widget_title">{{$t(graph.name)}}</p>
					<img :src="graph.iconURL" :alt="$t(graph.name)">
				</v-btn>
			</v-layout>  -->
	</div>
</template>
<script>
import { v4 } from 'uuid';
import { mapGetters } from 'vuex';
import _ from 'lodash';
import VueGridLayout from 'vue-grid-layout';


export default {
	name: 'Dashboard',
	data()
	{
		return {
			canvas: false,
			signals: {},
			layout: [],
			newValue: 0,
		};
	},
	components: {
		GridLayout: VueGridLayout.GridLayout,
		GridItem: VueGridLayout.GridItem
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
			currentProject: 'projects/currentProject',
			graphs: 'dashboard/graphs'
		}),
		forceUpdate ()
		{
			return true;
		}
	},
	methods: {
		resizeEvent: function(i, newH, newW, newHPx, newWPx){
			let item = this.layout.find ((item) => item.i === i);
			if (item) {
				item.width = newWPx-24;
				item.height = newHPx-24;
				this.$forceUpdate ();
			}
		},
		async erase(id)
		{
			let allow = await this.studio.workspace.showConfirmationPrompt ('DASHBOARD_DELETE_TITLE', 'DASHBOARD_DELETE_QUESTION');

			if(allow === 'yes')
				this.layout = this.layout.filter ((item) => item.i !== id);
			delete this.signals[id];
		},
		async addSignal (graph)
		{
			let id = v4();
			let item = {
				x: (this.layout.length * 2) % 12,
				y: this.layout.length + 12, // puts it at the bottom
				w: 2,
				h: 2,
				width: 100,
				height: 100,
				i: id,
			};
			let signal = {
				id,
				component: graph.component,
				data: {},
			};
			const setup = this.getSetupFunction (signal);
			if (_.isFunction (setup))
			{
				signal.data = await setup (signal.data);
				if (signal.data)
				{
					this.signals[id] = signal;
					this.layout.push (item);
				}
			}
			else
			{
				this.signals[id] = signal;
				this.layout.push (item);
			}
		},
		getSetupFunction (signal) {
			let graph = this.graphs.find ((graph) => graph.component === signal.component);
			if (graph) return graph.setup;
			else return null;
		},
		async setup(id)
		{
			let signal = this.signals[id];
			try 
			{
				const setup = this.getSetupFunction (signal);
				let data = await setup (signal.data);
				if (data) {
					signal.data = data;
					this.saveDashboard ();
				}
				this.$forceUpdate();
			}
			catch(e)
			{
				this.studio.workspace.warn(e.message);
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
		},
		async saveDashboard () {
			if (this.currentProject)
			{
				await this.studio.projects.saveSpecialFile(this.currentProject,'dashboard.json', JSON.stringify ({
					layout: this.layout,
					signals: this.signals
				}));
			}
		}
	},
	watch: {
		currentProject:
		{
			async handler (){
				if (this.currentProject)
				{
					let data = await this.studio.projects.loadSpecialFile(this.currentProject,'dashboard.json');
					if(data !== null)
					{
						try
						{
							let dashboard = JSON.parse (data);
							this.layout = [];
							this.signals = {};
							for (let signal of dashboard.layout) {
								let dashboardSignal = dashboard.signals[signal.i];
								if (dashboardSignal && dashboardSignal.data) {
									this.signals[signal.i] = dashboardSignal;
									this.layout.push (signal);
								}
							}
						}
						catch(e)
						{
							this.studio.workspace.showError('DASHBOARD_LOAD_DATA_ERROR', {extra: e.message});
						}
					} 
					else
					{
						this.layout = [];
						this.signals = {};
					}
				}
				else
				{
					this.elements = [];
					this.signals = {};
				}				
			},
		},
		layout: {
			deep:true,
			handler: function (/* val, oldVal */){
				this.saveDashboard ();
			}	
		}
	}
};
</script>

<style lang="less">
	@import '../style/dashboard.less';
</style>

<style lang="less" scoped>
.v-list-item {
	padding: 0 10px;
}
</style>
