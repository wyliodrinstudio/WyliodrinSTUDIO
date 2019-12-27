import VumeterGraph from './views/VumeterGraph.vue';
import VumeterDialog from './views/VumeterDialog.vue';

// let dashboard_graph_vumeter = {};
export default function setup (options, imports, register)
{
	const studio = imports;
	// console.log(studio);
	studio.dashboard.registerGraph('VUMETER_GRAPH', 30, 'plugins/dashboard/graph.vumeter/data/img/icons/vumeter.png', VumeterGraph, {
		setup: (data) => {
			return studio.workspace.showDialog(VumeterDialog,{
				width:600,
				data:data
			});
		}
	});
	
	register (null, {
		// dashboard_graph_vumeter: dashboard_graph_vumeter
	});
}
