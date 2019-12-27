import SpeedometerGraph from './views/SpeedometerGraph.vue';
import SpeedometerDialog from './views/SpeedometerDialog.vue';

// let dashboard_graph_speedometer = {};
export default function setup (options, imports, register)
{
	const studio = imports;
	// console.log(studio);
	studio.dashboard.registerGraph('SPEEDOMETER_GRAPH', 30, 'plugins/dashboard/graph.speedometer/data/img/icons/speedometer.png', SpeedometerGraph, {
		setup: (data) => {
			return studio.workspace.showDialog(SpeedometerDialog,{
				width:600,
				data:data
			});
		}
	});
	
	register (null, {
		// dashboard_graph_speedometer: dashboard_graph_speedometer
	});
}
