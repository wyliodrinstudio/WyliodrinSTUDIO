import Dashboard from './views/Dashboard.vue';
import _ from 'lodash';
import { EventEmitter } from 'events';
import dashboardStore from './store';

let studio = null;
let graphs =[];
let signalEmitter = new EventEmitter ();

let dashboard = {
	store: null,
	registerGraph(name, priority, iconURL, component, options = {})
	{
		if (!_.isObject (options)) options = {};
		studio.workspace.registerComponent (component);
		let sameGraph = graphs.find((graph) => graph.name === name);
		if(!sameGraph)
		{
			let item = {
				name,
				priority,
				iconURL,
				component: component.name,
				setup: options.setup,
				width: options.width || 1
			};
			graphs.push(item);
			graphs = graphs.sort((graph1, graph2)=>graph1.priority - graph2.priority);
			studio.workspace.dispatchToStore('dashboard','graphs', graphs);
		}
		else
		{
			this.warn ('Graph '+name+' already exists in the dashboard');
		}
	},
	registerStore (namespace, store)
	{
		if (studio.workspace.store)
		{
			studio.workspace.store.registerModule (namespace, store);
		}
		else
		{
			this.error ('Unable to register store module '+namespace+', store has not been already started');
		}
	},
	registerForSignal (signalName, fn)
	{
		signalEmitter.on (signalName, fn);
		return () => {
			signalEmitter.removeListener (signalName, fn);
		};	
	},
	emitSignal(signalName,v,t)
	{
		signalEmitter.emit(signalName, {
			v:v, 
			t: t?new Date(t):new Date()
		});
	}
};

export function setup (options, imports, register)
{
	studio = imports;
	
	studio.workspace.registerStore ('dashboard', dashboardStore);

	studio.workspace.registerTab('PROJECT_DASHBOARD', 200, Dashboard, {
		enabled ()
		{
			return !!studio.projects.getCurrentProject();
		}
	});
	register (null,
		{
			dashboard: dashboard
		}
	);
}