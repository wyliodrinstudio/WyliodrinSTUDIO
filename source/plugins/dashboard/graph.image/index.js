import ImageGraph from './views/ImageGraph.vue';
import ImageDialog from './views/ImageDialog.vue';

let dashboard_graph_image = {};
export default function setup (options, imports, register)
{
	const studio = imports;

	studio.dashboard.registerGraph('IMAGE_GRAPH', 30, 'plugins/dashboard/graph.image/data/img/icons/image.png', ImageGraph, {
		setup: (data) => {
			return studio.workspace.showDialog(ImageDialog,{
				width:600,
				data:data
			});
		}
	});
	
	register (null, {
		dashboard_graph_image: dashboard_graph_image
	});
}
