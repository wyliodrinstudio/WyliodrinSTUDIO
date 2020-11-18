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
				width: options.width || 1,
				height: options.height || 1
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

	let signalsBuffer = '';
	let signalRegex = /^@([A-Za-z0-9_]+):\s*([^/]+)(?:\/([0-9]+))?$/;
	let newLine = true;

	const filterSignal = (data) => {
		let signals = [];
		let output = '';
		let signalParts = data.split (/\r?\n/);
		if (signalParts.length > 1) {
			newLine = true;
			signalParts[0] = signalsBuffer + signalParts[0];
			let actualSignals = signalParts.slice (0, signalParts.length-1);
			for (let signalFormat of actualSignals) {
				let signal = signalFormat.match (signalRegex);
				if (signal) {
					let timestamp = new Date ();
					if (signal[3]) {
						let t = parseFloat (signal[3]);
						if (!isNaN (t))
						{
							timestamp = new Date (t);
						}
						else
						{
							timestamp = new Date (signal[3]);
						}
					}
					signals.push ({
						name: signal[1],
						value: signal[2],
						timestamp: timestamp
					});
				}
				else
				{
					output = output + signalFormat + '\r\n';
				}
			}
		}
		signalsBuffer = signalsBuffer + signalParts[signalParts.length-1];
		if (!newLine || signalsBuffer[0] !== '@') {
			output = output + signalsBuffer;
			signalsBuffer = '';
			newLine = false;
		}
		return {
			signals,
			output
		};
	};

	studio.console.registerFilter ((id, data) => {
		let {signals, output} = filterSignal (data);
			
		for (let signal of signals) {
			dashboard.emitSignal (signal.name, signal.value, signal.timestamp);
		}

		return output;
	});

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