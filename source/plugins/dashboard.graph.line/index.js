import LineGraph from './views/LineGraph.vue';
import LineDialog from './views/LineDialog.vue';

let dashboard_graph_line = {};
export default function setup (options, imports, register)
{
	const studio = imports;
	// console.log(studio);
	studio.dashboard.registerGraph('LINE_GRAPH', 30, 'plugins/dashboard.graph.line/data/img/icons/line.png', LineGraph, {
		setup: (data) => {
			return studio.workspace.showDialog(LineDialog,{
				width:1500,
				data:data
			});
		},
		width: 4
	});
	
	register (null, {
		dashboard_graph_line: dashboard_graph_line
	});
}
