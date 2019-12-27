import SliderDialog from './views/SliderDialog.vue';
import SliderGraph from './views/SliderGraph.vue';
let dashboard_graph_slider = {};
export default function setup (options, imports, register)
{
	const studio = imports;
	// console.log(studio);
	studio.dashboard.registerGraph('SLIDER_GRAPH', 30, 'plugins/dashboard/graph.slider/data/img/icons/slider.png', SliderGraph, {
		setup: (data) => {
			return studio.workspace.showDialog(SliderDialog,{
				width:600,
				data:data
			});
		}
	});	
	register (null, {
		dashboard_graph_slider: dashboard_graph_slider
	});
}
