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
	let signalRegex = /^@([A-Za-z0-9_]+):\s*([^/]+)(?:\/([0-9]+))?\r?\n$/;

	let possible = false;

	let newLine = true;

	const filterSignal = (data) => {
		let signals = [];
		let output = '';

		for (let s of data) 
		{
			if (s === '\n') {
				newLine = true;
				signalsBuffer = signalsBuffer + s;
				let signal = signalsBuffer.match (signalRegex);
				if (signal) 
				{
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
					output = output + signalsBuffer;
				}
				signalsBuffer = '';
			}
			else
			{
				if (newLine)
				{
					if (s === '@')
					{
						possible = true;
						signalsBuffer = signalsBuffer + s;
					}
					else 
					{
						possible = false;
						output = output + s;
					}
				}
				else
				if (possible)
				{
					signalsBuffer = signalsBuffer + s;
				}
				else
				{
					output = output + s;
				}
				newLine = false;
			}
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