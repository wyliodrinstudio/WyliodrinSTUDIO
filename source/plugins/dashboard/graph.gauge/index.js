import GaugeGraph from './views/GaugeGraph.vue';
import GaugeDialog from './views/GaugeDialog.vue';

let dashboard_graph_gauge = {};
export default function setup (options, imports, register)
{
	const studio = imports;

	studio.dashboard.registerGraph('GAUGE_GRAPH', 20, 'plugins/dashboard/graph.gauge/data/img/icons/gauge.png', GaugeGraph, {
		setup: (data) => {
			return studio.workspace.showDialog(GaugeDialog,{
				width:600,
				data:data
			});
		}
	});
	register (null, {
		dashboard_graph_gauge: dashboard_graph_gauge
	});
}
