import SwitchGraph from './views/SwitchGraph.vue';
import SwitchDialog from './views/SwitchDialog.vue';

// let dashboard_graph_switch = {};
export default function setup (options, imports, register)
{
	const studio = imports;
	// console.log(studio);
	studio.dashboard.registerGraph('SWITCH_GRAPH', 30, 'plugins/dashboard.graph.switch/data/img/icons/switch.png', SwitchGraph, {
		setup: (data) => {
			return studio.workspace.showDialog(SwitchDialog,{
				width:1500,
				data:data
			});
		}
	});
	
	register (null, {
		// dashboard_graph_switch: dashboard_graph_switch
	});
}
