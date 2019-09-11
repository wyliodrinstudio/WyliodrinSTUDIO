import ExtraGraph from './views/ExtraGraph.vue';
import ExtraDialog from './views/ExtraDialog.vue';

let dashboard_graph_extra = {};
export default function setup (options, imports, register)
{
	const studio = imports;

	studio.dashboard.registerGraph('EXTRA_GRAPH', 10, 'plugins/dashboard.graph.extra/data/img/icons/extra.png', ExtraGraph, {
		setup: (data) => {
			return studio.workspace.showDialog(ExtraDialog,{
				width:600,
				data:data
			});
		}
	});
	
	register (null, {
		dashboard_graph_extra: dashboard_graph_extra
	});
}
