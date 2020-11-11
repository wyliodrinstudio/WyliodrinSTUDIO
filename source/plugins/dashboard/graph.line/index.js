import LineGraph from './views/LineGraph.vue';
import LineDialog from './views/LineDialog.vue';

let dashboard_graph_line = {};
export default function setup (options, imports, register)
{
	const studio = imports;
	studio.dashboard.registerGraph('LINE_GRAPH', 10, 'plugins/dashboard/graph.line/data/img/icons/line.png', LineGraph, {
		width: 6,
		height: 6,
		setup: (data) => {
			return studio.workspace.showDialog(LineDialog,{
				width:600,
				data:data
			});
		},
	});
	
	register (null, {
		dashboard_graph_line: dashboard_graph_line
	});
}
