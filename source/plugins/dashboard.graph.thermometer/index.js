import ThermometerGraph from './views/ThermometerGraph.vue';
import ThermometerDialog from './views/ThermometerDialog.vue';

// let dashboard_graph_thermometer = {};
export default function setup (options, imports, register)
{
	const studio = imports;
	// console.log(studio);
	studio.dashboard.registerGraph('THERMOMETER_GRAPH', 30, 'plugins/dashboard.graph.thermometer/data/img/icons/thermometer.png', ThermometerGraph, {
		setup: (data) => {
			return studio.workspace.showDialog(ThermometerDialog,{
				width:1500,
				data:data
			});
		}
	});
	
	register (null, {
		// dashboard_graph_thermometer: dashboard_graph_thermometer
	});
}
