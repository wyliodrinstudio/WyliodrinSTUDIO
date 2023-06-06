/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "imports/" + ({}[chunkId]||chunkId) + "_" + "7aa7f567dc9af9f61eb7" + ".js"
/******/ 	}
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							error.message = 'Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 							error.name = 'ChunkLoadError';
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				document.head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,1]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable no-console */
let architect = __webpack_require__ (1);
let plugins = __webpack_require__ (7);
const cowsay = __webpack_require__ (8);
const jokesData = __webpack_require__ (17);

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/sw.js').then(() => {
			console.log('Service Worker Registered');
		});
	});
}

function getRandomInt(max) {
	return Math.floor(Math.random() * Math.floor(max));
}

function getJoke ()
{
	let str = '';
	let original = jokesData[getRandomInt (jokesData.length)];
	while (original.length >= 50)
	{
		let index = 50;
		while (index > 0 && original[index] !== ' ') index--;
		if (index === 0) 
		{
			str = str + original;
			original = '';
		}
		else
		{
			str = str + original.substring (0, index) + '\n';
			original = original.substring (index);
		}
	}
	str = str + original;
	return str;
}


function progress (name, index, all)
{
	if (index || all)
	{
		document.querySelector('#loading').innerHTML = 'Loading plugin '+name;
		document.querySelector('#loading-progress-bar').setAttribute ('style', 'width: '+Math.round((index/all*100))+'%');
		console.log ('Loading '+name);
	}
	else
	{
		document.querySelector('#loading').innerHTML = name;
		document.querySelector('#loading-progress-bar').setAttribute ('style', 'width: 100%');
		console.log (name);
	}
}

async function main ()
{
	document.querySelector('#loading-progress').style.display='block';
	document.querySelector('#jokes').innerHTML = cowsay.say ({text: getJoke()});
	let setupPlugins = await plugins.loadPlugins (progress);
	architect.createApp(setupPlugins, function (err, app) {
		if (err) 
		{
			document.querySelector('#startuperror').innerHTML = 'Startup Error: '+err.message;
			document.querySelector('#startuperror').style.display= 'block';
			console.error (err);
		}
		else
		{
			console.log('Starting Wyliodrin Studio');
			// console.log (app);
			document.querySelector('#jokes').style.display='none';
			document.querySelector('#loading').style.display='none';
			document.querySelector('#loading-progress').style.display='none';
			app.services.workspace.start (app.services);
			app.services.events.emit ('ready', app.services);
		}
	});
}

main ();


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var DEBUG = typeof location != 'undefined' && location.href.match(/debug=[123]/) ? true : false;

let events = __webpack_require__ (3);
var EventEmitter = events.EventEmitter;
let _ = __webpack_require__ (4);

  
exports.createApp = createApp;
exports.Architect = Architect;

// Check a plugin config list for bad dependencies and throw on error
function checkConfig(config, lookup) {

	// Check for the required fields in each plugin.
	config.forEach(function (plugin) {
		if (plugin.checked) { return; }
		if (!Object.prototype.hasOwnProperty.call (plugin, 'setup')) {
			throw new Error('Plugin is missing the setup function ' + JSON.stringify(plugin.folder+'/'+plugin.name));
		}
		if (!Object.prototype.hasOwnProperty.call (plugin, 'provides')) {
			throw new Error('Plugin is missing the provides array ' + JSON.stringify(plugin.folder+'/'+plugin.name));
		}
		if (!Object.prototype.hasOwnProperty.call (plugin, 'consumes')) {
			throw new Error('Plugin is missing the consumes array ' + JSON.stringify(plugin.folder+'/'+plugin.name));
		}
	});

	return checkCycles(config, lookup);
}

function checkCycles(config, lookup) {
	var plugins = [];
	config.forEach(function(pluginConfig, index) {
		plugins.push({
			packagePath: pluginConfig.packagePath,
			provides: pluginConfig.provides.concat(),
			consumes: pluginConfig.consumes.concat(),
			i: index
		});
	});

	var resolved = {
		hub: true,
		hooks: true
	};
	var changed = true;
	var sorted = [];

	while(plugins.length && changed) {
		changed = false;

		plugins.concat().forEach(function(plugin) {
			var consumes = plugin.consumes.concat();

			var resolvedAll = true;
			for (var i=0; i<consumes.length; i++) {
				var service = consumes[i];
				if (!resolved[service] && (!lookup || !lookup(service))) {
					resolvedAll = false;
				} else {
					plugin.consumes.splice(plugin.consumes.indexOf(service), 1);
				}
			}

			if (!resolvedAll)
				return;

			plugins.splice(plugins.indexOf(plugin), 1);
			plugin.provides.forEach(function(service) {
				resolved[service] = true;
			});
			sorted.push(config[plugin.i]);
			changed = true;
		});
	}

	if (plugins.length) {
		var unresolved = {};
		plugins.forEach(function(plugin) {
			delete plugin.config;
			plugin.consumes.forEach(function(name) {
				if (unresolved[name] === false)
					return;
				if (!unresolved[name])
					unresolved[name] = [];
				unresolved[name].push(plugin.packagePath);
			});
			plugin.provides.forEach(function(name) {
				unresolved[name] = false;
			});
		});
		
		Object.keys(unresolved).forEach(function(name) {
			if (unresolved[name] === false)
				delete unresolved[name];
		});

		var unresolvedList = Object.keys(unresolved);
		var resolvedList = Object.keys(resolved);
		var err  = new Error('Could not resolve dependencies\n'
			+ (unresolvedList.length ? 'Missing services: ' + unresolvedList
				: 'Config contains cyclic dependencies' // TODO print cycles
			));
		err.unresolved = unresolvedList;
		err.resolved = resolvedList;
		throw err;
	}

	return sorted;
}

function Architect(config) {
	var app = this;
	app.config = config;
	app.packages = {};
	app.pluginToPackage = {};

	app.preHookData = {};
	app.postHookData = {};
	
	var isAdditionalMode;
	var services = app.services = {
		hub: {
			on: function (name, callback) {
				app.on(name, callback);
			}
		},

		/**
		 * These objects store the functions to be called for the given services
		 *  -> preHookData contains functions to be called before the original
		 * 	   function, and it may change the flow of the program
		 * 		- it can change the arguments given to the original function
		 * 		- it can stop or modify the logical flow of the program
		 * 
		 * -> postHookData contains functions to be called after or instead the
		 *    original function
		 * 
		 * Both functions are required to know the *name* of the service, 
		 * the *name* of the function that is to be hooked and the function
		 * as a target.
		 * 	
		 * Both functions return a disposable object
		 * 
		 * Example: 
		 * 
		 * 		let destroy = studio.hooks.addPreHook(...); -> creates the object
		 * 		.....
		 * 		destroy(); -> disposes the object
		 */
		hooks: {
			addPreHook (serviceName, serviceFunction, fn)
			{
				if (!app.preHookData[serviceName + '.' + serviceFunction])
					app.preHookData[serviceName + '.' + serviceFunction] = [];
				app.preHookData[serviceName + '.' + serviceFunction].push(fn);
				return () => {
					delete app.preHookData[serviceName + '.' + serviceFunction];
				};
			},
			addPostHook (serviceName, serviceFunction, fn)
			{
				if (!app.postHookData[serviceName + '.' + serviceFunction])
					app.postHookData[serviceName + '.' + serviceFunction] = [];
				app.postHookData[serviceName + '.' + serviceFunction].push(fn);
				return () => {
					delete app.postHookData[serviceName + '.' + serviceFunction];
				};
			},
		}
	};

	// Check the config
	var sortedPlugins = checkConfig(config);

	var destructors = [];
	var recur = 0, callnext, ready;
	function startPlugins(additional) {
		var plugin = sortedPlugins.shift();
		if (!plugin) {
			ready = true;
			return app.emit(additional ? 'ready-additional' : 'ready', app);
		}

		var imports = {};
		if (plugin.consumes) {
			plugin.consumes.forEach(function (name) {
				imports[name] = services[name];
			});
		}
		
		var m = /^plugins\/([^/]+)|\/plugins\/[^/]+\/([^/]+)/.exec(plugin.packagePath);
		var packageName = m && (m[1] || m[2]);
		if (!app.packages[packageName]) app.packages[packageName] = [];
		
		if (DEBUG) {
			recur++;
			plugin.setup(plugin, imports, register);
			
			while (callnext && recur <= 1) {
				callnext = false;
				startPlugins(additional);
			}
			recur--;
		}
		else {
			try {
				recur++;
				plugin.setup(plugin, imports, register);
			} catch (e) {
				e.plugin = plugin;
				app.emit('error', e);
				throw e;
			} finally {
				while (callnext && recur <= 1) {
					callnext = false;
					startPlugins(additional);
				}
				recur--;
			}
		}
		
		function register(err, provided) {
			if (err) { return app.emit('error', err); }
			plugin.provides.forEach(function (name) {
				if (!Object.prototype.hasOwnProperty.call (provided, name)) {
					var err = new Error('Plugin failed to provide ' + name + ' service. ' + JSON.stringify(plugin));
					err.plugin = plugin;
					return app.emit('error', err);
				}
				// PROXY
				provided[name].__name = name;
				for (let prop of Object.keys (provided[name]))
				{
					// make sure it is not a constructor function
					if (_.isFunction (provided[name][prop]) && !provided[name][prop].prototype)
					{
						provided[name]['__'+prop] = provided[name][prop];
						provided[name][prop] = hookFunction.bind (app, provided[name], prop);
					}
				}
				services[name] = provided[name];
				app.pluginToPackage[name] = {
					path: plugin.packagePath,
					package: packageName,
					version: plugin.version,
					isAdditionalMode: isAdditionalMode
				};
				app.packages[packageName].push(name);
				
				app.emit('service', name, services[name], plugin);
			});
			if (provided && Object.prototype.hasOwnProperty.call (provided, 'onDestroy'))
				destructors.push(provided.onDestroy);

			app.emit('plugin', plugin);
			
			if (recur) return (callnext = true);
			startPlugins(additional);
		}
	}
	
	function hookFunction(target, prop, ...args) 
	{ 
		// console.log('[hookFunction]');
		//console.log('\t' + target.__name + '.' + prop);
		let preResult = null;
		let result = {};
		let postResult = {};

		let preHook = app.preHookData[target.__name + '.' + prop];
		let postHook = app.postHookData[target.__name + '.' + prop];
		
		// check if there are preHooks to be called
		if (preHook)
		{
			// set the args for the next call
			preResult = {
				'args': args
			};	

			// iterate through the array of functions
			for (let fn of preHook)
			{
				// run the preHook 
				if (_.isFunction(fn))
				{
					let oldArgs = preResult.args;
					preResult = fn (...oldArgs);

					/**
					 * set the args if the preHook function 
					 * returns undefined || null
					 */ 
					if (!preResult) 
						preResult = {
							args: oldArgs
						};

					// stop if abort is true
					if (preResult.abort)
						break;
				}
			}
		}

		if (!preResult)
			preResult = {
				args: args
			};

		// check if the original function is to be called
		// set the result
		if (_.isFunction(target['__'+prop]) && preResult.abort !== true)
		{
			result = target['__'+prop] (...preResult.args);
		}
		else 
		{
			result = preResult.ret;
		}
		
		// check to see if there is any postHook function to call
		if (postHook)
		{
			postResult = result;

			// iterate through the array
			for (let fn of postHook)
			{
				// run the postHook
				if (_.isFunction(fn)) {
					let oldRes = postResult;
					postResult = fn (oldRes, ...preResult.args);
				}
			}
			result = postResult;
		}
		
		return result;
	}

	// Give createApp some time to subscribe to our 'ready' event
	(typeof process === 'object' ? process.nextTick : setTimeout)(startPlugins);

	this.loadAdditionalPlugins = function(additionalConfig, callback){
		isAdditionalMode = true;
		
		exports.resolveConfig(additionalConfig, function (err, additionalConfig) {
			if (err) return callback(err);
			
			app.once(ready ? 'ready-additional' : 'ready', function(app){
				callback(null, app);
			}); // What about error state?
			
			// Check the config - hopefully this works
			var _sortedPlugins = checkConfig(additionalConfig, function(name){
				return services[name];
			});
			
			if (ready) {
				sortedPlugins = _sortedPlugins;
				// Start Loading additional plugins
				startPlugins(true);
			}
			else {
				_sortedPlugins.forEach(function(item){
					sortedPlugins.push(item);
				});
			}
		});
	};

	this.destroy = function() {
		destructors.forEach(function(destroy) {
			destroy();
		});

		destructors = [];
	};
}
Architect.prototype = Object.create(EventEmitter.prototype, {constructor:{value:Architect}});

Architect.prototype.getService = function(name) {
	if (!this.services[name]) {
		throw new Error('Service \'' + name + '\' not found in architect app!');
	}
	return this.services[name];
};

// Returns an event emitter that represents the app.  It can emit events.
// event: ('service' name, service) emitted when a service is ready to be consumed.
// event: ('plugin', plugin) emitted when a plugin registers.
// event: ('ready', app) emitted when all plugins are ready.
// event: ('error', err) emitted when something goes wrong.
// app.services - a hash of all the services in this app
// app.config - the plugin config that was passed in.
function createApp(config, callback) {
	var app;
	try {
		app = new Architect(config);
	} catch(err) {
		if (!callback) throw err;
		return callback(err, app);
	}
	if (callback) {
		app.on('error', done);
		app.on('ready', onReady);
	}

	function onReady(/*app*/) {
		done();
	}

	function done(err) {
		if (err) {
			app.destroy();
		}
		app.removeListener('error', done);
		app.removeListener('ready', onReady);
		callback(err, app);
	}

	return app;
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)))

/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

async function loadPlugins (progress = () => {}) {
	var plugins = [];
	var index = 0;

	let plugin0 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(2)]).then(__webpack_require__.bind(null, 18)).then ((plugin) => { plugins.push ({folder: 'dashboard', name:'dashboard', consumes:["workspace","projects","console"], provides:["dashboard"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('dashboard/dashboard', index, 62); });
	let plugin1 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(3)]).then(__webpack_require__.bind(null, 56)).then ((plugin) => { plugins.push ({folder: 'dashboard', name:'graph.gauge', consumes:["workspace","dashboard"], provides:["dashboard_graph_gauge"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('dashboard/graph.gauge', index, 62); });
	let plugin2 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(4)]).then(__webpack_require__.bind(null, 208)).then ((plugin) => { plugins.push ({folder: 'dashboard', name:'graph.image', consumes:["workspace","dashboard"], provides:["dashboard_graph_image"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('dashboard/graph.image', index, 62); });
	let plugin3 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(5)]).then(__webpack_require__.bind(null, 254)).then ((plugin) => { plugins.push ({folder: 'dashboard', name:'graph.line', consumes:["workspace","dashboard"], provides:["dashboard_graph_line"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('dashboard/graph.line', index, 62); });
	let plugin4 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(6)]).then(__webpack_require__.bind(null, 265)).then ((plugin) => { plugins.push ({folder: 'devices', name:'mp', consumes:["workspace","projects","events","device_wyapp","console","filesystem","system","shell","notebook","serialport","flash"], provides:[], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('devices/mp', index, 62); });
	let plugin5 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(7)]).then(__webpack_require__.bind(null, 302)).then ((plugin) => { plugins.push ({folder: 'devices', name:'pinlayout', consumes:["workspace"], provides:["pin_layout"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('devices/pinlayout', index, 62); });
	let plugin6 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(8)]).then(__webpack_require__.bind(null, 311)).then ((plugin) => { plugins.push ({folder: 'devices', name:'shell', consumes:["workspace","xterm"], provides:["shell"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('devices/shell', index, 62); });
	let plugin7 = __webpack_require__.e(/* import() */ 9).then(__webpack_require__.bind(null, 317)).then ((plugin) => { plugins.push ({folder: 'devices/wyapp/devices', name:'beagleboneblack', consumes:["device_wyapp","workspace","events","projects"], provides:[], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('devices/wyapp/devices/beagleboneblack', index, 62); });
	let plugin8 = __webpack_require__.e(/* import() */ 10).then(__webpack_require__.bind(null, 318)).then ((plugin) => { plugins.push ({folder: 'devices/wyapp/devices', name:'picopi', consumes:["device_wyapp","workspace","events","editor_visual","projects"], provides:[], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('devices/wyapp/devices/picopi', index, 62); });
	let plugin9 = __webpack_require__.e(/* import() */ 11).then(__webpack_require__.bind(null, 322)).then ((plugin) => { plugins.push ({folder: 'devices/wyapp/devices', name:'raspberrypi', consumes:["device_wyapp","workspace","events","editor_visual","projects"], provides:[], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('devices/wyapp/devices/raspberrypi', index, 62); });
	let plugin10 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(12)]).then(__webpack_require__.bind(null, 328)).then ((plugin) => { plugins.push ({folder: 'devices/wyapp/devices', name:'tockos', consumes:["device_wyapp","workspace","events","editor_visual","projects"], provides:[], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('devices/wyapp/devices/tockos', index, 62); });
	let plugin11 = __webpack_require__.e(/* import() */ 13).then(__webpack_require__.bind(null, 336)).then ((plugin) => { plugins.push ({folder: 'devices/wyapp/devices', name:'udooneo', consumes:["device_wyapp","workspace","events"], provides:[], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('devices/wyapp/devices/udooneo', index, 62); });
	let plugin12 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(14)]).then(__webpack_require__.bind(null, 337)).then ((plugin) => { plugins.push ({folder: 'devices/wyapp', name:'plugin', consumes:["workspace","events","console","projects","shell","notebook","dashboard","filesystem"], provides:["device_wyapp"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('devices/wyapp/plugin', index, 62); });
	let plugin13 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(15)]).then(__webpack_require__.bind(null, 437)).then ((plugin) => { plugins.push ({folder: 'devices/wyapp/transports', name:'websocket', consumes:["workspace","device_wyapp","id"], provides:[], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('devices/wyapp/transports/websocket', index, 62); });
	let plugin14 = __webpack_require__.e(/* import() */ 16).then(__webpack_require__.bind(null, 444)).then ((plugin) => { plugins.push ({folder: 'documentation', name:'readthedocs', consumes:["workspace","system"], provides:["documentation"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('documentation/readthedocs', index, 62); });
	let plugin15 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(17)]).then(__webpack_require__.bind(null, 445)).then ((plugin) => { plugins.push ({folder: 'documentation', name:'resistorcolorcodes', consumes:["workspace"], provides:[], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('documentation/resistorcolorcodes', index, 62); });
	let plugin16 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(18)]).then(__webpack_require__.bind(null, 451)).then ((plugin) => { plugins.push ({folder: '', name:'first.run', consumes:["events","settings","projects","system","workspace"], provides:["firstrun"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('/first.run', index, 62); });
	let plugin17 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(19)]).then(__webpack_require__.bind(null, 457)).then ((plugin) => { plugins.push ({folder: 'flash', name:'flash', consumes:["workspace","serialport","filesystem","system"], provides:["flash"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('flash/flash', index, 62); });
	let plugin18 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(20)]).then(__webpack_require__.bind(null, 458)).then ((plugin) => { plugins.push ({folder: 'flash', name:'flash.esp', consumes:["workspace","serialport","filesystem","system","flash"], provides:[], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('flash/flash.esp', index, 62); });
	let plugin19 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(21)]).then(__webpack_require__.bind(null, 474)).then ((plugin) => { plugins.push ({folder: 'flash', name:'flash.microbit', consumes:["workspace","serialport","filesystem","system","flash"], provides:[], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('flash/flash.microbit', index, 62); });
	let plugin20 = __webpack_require__.e(/* import() */ 22).then(__webpack_require__.bind(null, 481)).then ((plugin) => { plugins.push ({folder: 'languages', name:'c', consumes:["workspace","projects"], provides:["language_c"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('languages/c', index, 62); });
	let plugin21 = __webpack_require__.e(/* import() */ 23).then(__webpack_require__.bind(null, 484)).then ((plugin) => { plugins.push ({folder: 'languages', name:'nodejs', consumes:["workspace","projects"], provides:["language_nodejs"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('languages/nodejs', index, 62); });
	let plugin22 = __webpack_require__.e(/* import() */ 24).then(__webpack_require__.bind(null, 485)).then ((plugin) => { plugins.push ({folder: 'languages', name:'python', consumes:["workspace","projects"], provides:["language_python"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('languages/python', index, 62); });
	let plugin23 = __webpack_require__.e(/* import() */ 25).then(__webpack_require__.bind(null, 486)).then ((plugin) => { plugins.push ({folder: 'languages', name:'rust', consumes:["workspace","projects"], provides:["language_rust"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('languages/rust', index, 62); });
	let plugin24 = __webpack_require__.e(/* import() */ 26).then(__webpack_require__.bind(null, 487)).then ((plugin) => { plugins.push ({folder: 'languages', name:'shell', consumes:["workspace","projects"], provides:["language_shell"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('languages/shell', index, 62); });
	let plugin25 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(27)]).then(__webpack_require__.bind(null, 488)).then ((plugin) => { plugins.push ({folder: 'languages', name:'tockos', consumes:["workspace","projects","github","language_rust","language_c"], provides:[], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('languages/tockos', index, 62); });
	let plugin26 = __webpack_require__.e(/* import() */ 28).then(__webpack_require__.bind(null, 505)).then ((plugin) => { plugins.push ({folder: 'languages/visual', name:'language', consumes:["workspace","projects","language_python","language_nodejs"], provides:["language_visual"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('languages/visual/language', index, 62); });
	let plugin27 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(29)]).then(__webpack_require__.bind(null, 506)).then ((plugin) => { plugins.push ({folder: 'languages/visual/libraries', name:'adafruitdht', consumes:["workspace","projects","editor_visual"], provides:[], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('languages/visual/libraries/adafruitdht', index, 62); });
	let plugin28 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(30)]).then(__webpack_require__.bind(null, 523)).then ((plugin) => { plugins.push ({folder: 'languages/visual/libraries', name:'adafruitlcd', consumes:["workspace","projects","editor_visual"], provides:[], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('languages/visual/libraries/adafruitlcd', index, 62); });
	let plugin29 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(31)]).then(__webpack_require__.bind(null, 527)).then ((plugin) => { plugins.push ({folder: 'languages/visual/libraries', name:'gpiozero', consumes:["workspace","projects","editor_visual"], provides:[], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('languages/visual/libraries/gpiozero', index, 62); });
	let plugin30 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(32)]).then(__webpack_require__.bind(null, 531)).then ((plugin) => { plugins.push ({folder: 'languages/visual/libraries', name:'libwyliodrin', consumes:["workspace","projects","editor_visual"], provides:[], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('languages/visual/libraries/libwyliodrin', index, 62); });
	let plugin31 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(33)]).then(__webpack_require__.bind(null, 537)).then ((plugin) => { plugins.push ({folder: 'languages/visual/libraries', name:'micropython', consumes:["workspace","projects","editor_visual"], provides:[], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('languages/visual/libraries/micropython', index, 62); });
	let plugin32 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(34)]).then(__webpack_require__.bind(null, 541)).then ((plugin) => { plugins.push ({folder: 'languages/visual/libraries', name:'rpk', consumes:["workspace","projects","editor_visual"], provides:[], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('languages/visual/libraries/rpk', index, 62); });
	let plugin33 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(35)]).then(__webpack_require__.bind(null, 545)).then ((plugin) => { plugins.push ({folder: 'languages/visual/libraries', name:'signal', consumes:["editor_visual"], provides:[], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('languages/visual/libraries/signal', index, 62); });
	let plugin34 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(36)]).then(__webpack_require__.bind(null, 550)).then ((plugin) => { plugins.push ({folder: 'languages/visual/libraries', name:'social', consumes:["workspace","projects","editor_visual"], provides:[], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('languages/visual/libraries/social', index, 62); });
	let plugin35 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(37)]).then(__webpack_require__.bind(null, 554)).then ((plugin) => { plugins.push ({folder: 'languages/visual/libraries', name:'wyapp', consumes:["editor_visual"], provides:[], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('languages/visual/libraries/wyapp', index, 62); });
	let plugin36 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(38)]).then(__webpack_require__.bind(null, 562)).then ((plugin) => { plugins.push ({folder: 'languages/visual/libraries', name:'wyliozero', consumes:["workspace","projects","editor_visual"], provides:[], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('languages/visual/libraries/wyliozero', index, 62); });
	let plugin37 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(39)]).then(__webpack_require__.bind(null, 566)).then ((plugin) => { plugins.push ({folder: 'libs', name:'github', consumes:[], provides:["github"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('libs/github', index, 62); });
	let plugin38 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(40)]).then(__webpack_require__.bind(null, 567)).then ((plugin) => { plugins.push ({folder: 'libs', name:'gitlab', consumes:[], provides:["gitlab"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('libs/gitlab', index, 62); });
	let plugin39 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(41)]).then(__webpack_require__.bind(null, 568)).then ((plugin) => { plugins.push ({folder: 'libs', name:'serialport', consumes:["system","workspace"], provides:["serialport"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('libs/serialport', index, 62); });
	let plugin40 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(42)]).then(__webpack_require__.bind(null, 569)).then ((plugin) => { plugins.push ({folder: '', name:'patreon', consumes:["events","workspace"], provides:[], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('/patreon', index, 62); });
	let plugin41 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(43)]).then(__webpack_require__.bind(null, 578)).then ((plugin) => { plugins.push ({folder: 'projects', name:'editor.ace', consumes:["workspace","projects"], provides:[], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('projects/editor.ace', index, 62); });
	let plugin42 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(44)]).then(__webpack_require__.bind(null, 627)).then ((plugin) => { plugins.push ({folder: 'projects', name:'editor.images', consumes:["workspace","projects"], provides:[], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('projects/editor.images', index, 62); });
	let plugin43 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(45)]).then(__webpack_require__.bind(null, 636)).then ((plugin) => { plugins.push ({folder: 'projects', name:'editor.monaco', consumes:["workspace","projects"], provides:[], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('projects/editor.monaco', index, 62); });
	let plugin44 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(46)]).then(__webpack_require__.bind(null, 1326)).then ((plugin) => { plugins.push ({folder: 'projects', name:'editor.opcuamodel', consumes:["workspace","projects","editor_visual"], provides:["editor_opcuamodel"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('projects/editor.opcuamodel', index, 62); });
	let plugin45 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(47)]).then(__webpack_require__.bind(null, 1347)).then ((plugin) => { plugins.push ({folder: 'projects', name:'editor.visual', consumes:["workspace","projects"], provides:["editor_visual"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('projects/editor.visual', index, 62); });
	let plugin46 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(48)]).then(__webpack_require__.bind(null, 1365)).then ((plugin) => { plugins.push ({folder: 'projects', name:'notebook', consumes:["workspace","projects","filesystem"], provides:["notebook"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('projects/notebook', index, 62); });
	let plugin47 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(49)]).then(__webpack_require__.bind(null, 1581)).then ((plugin) => { plugins.push ({folder: 'projects', name:'projects', consumes:["workspace","xterm","filesystem","settings"], provides:["projects"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('projects/projects', index, 62); });
	let plugin48 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(50)]).then(__webpack_require__.bind(null, 1616)).then ((plugin) => { plugins.push ({folder: 'projects', name:'schematics', consumes:["workspace","projects"], provides:["schematics"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('projects/schematics', index, 62); });
	let plugin49 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(51)]).then(__webpack_require__.bind(null, 1625)).then ((plugin) => { plugins.push ({folder: 'simulators', name:'raspberrypi', consumes:["workspace","console","projects"], provides:["device_simulator_raspberrypi"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('simulators/raspberrypi', index, 62); });
	let plugin50 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(52)]).then(__webpack_require__.bind(null, 1653)).then ((plugin) => { plugins.push ({folder: 'studio', name:'console', consumes:["workspace","xterm"], provides:["console"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('studio/console', index, 62); });
	let plugin51 = __webpack_require__.e(/* import() */ 53).then(__webpack_require__.bind(null, 1662)).then ((plugin) => { plugins.push ({folder: 'studio', name:'events', consumes:[], provides:["events"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('studio/events', index, 62); });
	let plugin52 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(54)]).then(__webpack_require__.bind(null, 1663)).then ((plugin) => { plugins.push ({folder: 'studio', name:'filesystem.web', consumes:[], provides:["filesystem"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('studio/filesystem.web', index, 62); });
	let plugin53 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(55)]).then(__webpack_require__.bind(null, 1665)).then ((plugin) => { plugins.push ({folder: 'studio', name:'id', consumes:["settings","workspace"], provides:["id"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('studio/id', index, 62); });
	let plugin54 = __webpack_require__.e(/* import() */ 56).then(__webpack_require__.bind(null, 1744)).then ((plugin) => { plugins.push ({folder: 'studio', name:'migration', consumes:["workspace","system","events","settings"], provides:[], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('studio/migration', index, 62); });
	let plugin55 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(57)]).then(__webpack_require__.bind(null, 1745)).then ((plugin) => { plugins.push ({folder: 'studio', name:'settings', consumes:["filesystem"], provides:["settings"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('studio/settings', index, 62); });
	let plugin56 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(58)]).then(__webpack_require__.bind(null, 1746)).then ((plugin) => { plugins.push ({folder: 'studio', name:'statistics', consumes:["workspace","hooks","events","projects","settings","firstrun"], provides:[], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('studio/statistics', index, 62); });
	let plugin57 = __webpack_require__.e(/* import() */ 59).then(__webpack_require__.bind(null, 1748)).then ((plugin) => { plugins.push ({folder: 'studio', name:'system.browser', consumes:[], provides:["system"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('studio/system.browser', index, 62); });
	let plugin58 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(60)]).then(__webpack_require__.bind(null, 1749)).then ((plugin) => { plugins.push ({folder: 'studio', name:'update', consumes:["system","events","workspace"], provides:["update"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('studio/update', index, 62); });
	let plugin59 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(61)]).then(__webpack_require__.bind(null, 1763)).then ((plugin) => { plugins.push ({folder: 'studio', name:'workspace', consumes:["system","settings","hooks"], provides:["workspace"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('studio/workspace', index, 62); });
	let plugin60 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(62)]).then(__webpack_require__.bind(null, 1864)).then ((plugin) => { plugins.push ({folder: 'studio', name:'xterm', consumes:["workspace"], provides:["xterm"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('studio/xterm', index, 62); });
	let plugin61 = Promise.all(/* import() */[__webpack_require__.e(1), __webpack_require__.e(63)]).then(__webpack_require__.bind(null, 1878)).then ((plugin) => { plugins.push ({folder: '', name:'tutorials', consumes:["workspace","projects","github","gitlab"], provides:["tutorials"], setup: plugin.setup || plugin.default || plugin}); index=index+1; progress ('/tutorials', index, 62); });
	await Promise.all ([plugin0, plugin1, plugin2, plugin3, plugin4, plugin5, plugin6, plugin7, plugin8, plugin9, plugin10, plugin11, plugin12, plugin13, plugin14, plugin15, plugin16, plugin17, plugin18, plugin19, plugin20, plugin21, plugin22, plugin23, plugin24, plugin25, plugin26, plugin27, plugin28, plugin29, plugin30, plugin31, plugin32, plugin33, plugin34, plugin35, plugin36, plugin37, plugin38, plugin39, plugin40, plugin41, plugin42, plugin43, plugin44, plugin45, plugin46, plugin47, plugin48, plugin49, plugin50, plugin51, plugin52, plugin53, plugin54, plugin55, plugin56, plugin57, plugin58, plugin59, plugin60, plugin61, ])
	progress ('Your workspace is almost ready ...');
	return plugins;
}
module.exports.loadPlugins = loadPlugins;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var baloon = __webpack_require__(9);
var cows = __webpack_require__(14);
var faces = __webpack_require__(16);

exports.say = function (options) {
	return doIt(options, true);
};

exports.think = function (options) {
	return doIt(options, false);
};

exports.list = cows.list;

function doIt (options, sayAloud) {
	var cowFile;

	if (options.r) {
		var cowsList = cows.listSync();
		cowFile = cowsList[Math.floor(Math.random() * cowsList.length)];
	} else {
		cowFile = options.f || 'default';
	}

	var cow = cows.get(cowFile);
	var face = faces(options);
	face.thoughts = sayAloud ? '\\' : 'o';

	var action = sayAloud ? 'say' : 'think';
	return baloon[action](options.text || options._.join(' '), options.n ? null : options.W) + '\n' + cow(face);
}


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var stringWidth = __webpack_require__(10);

exports.say = function (text, wrap) {
	var delimiters = {
		first : ['/', '\\'],
		middle : ['|', '|'],
		last : ['\\', '/'],
		only : ['<', '>']
	};

	return format(text, wrap, delimiters);
};

exports.think = function (text, wrap) {
	var delimiters = {
		first : ['(', ')'],
		middle : ['(', ')'],
		last : ['(', ')'],
		only : ['(', ')']
	};

	return format(text, wrap, delimiters);
};

function format (text, wrap, delimiters) {
	var lines = split(text, wrap);
	var maxLength = max(lines);

	var balloon;
	if (lines.length === 1) {
		balloon = [
			' ' + top(maxLength),
			delimiters.only[0] + ' ' + lines[0] + ' ' + delimiters.only[1],
			' ' + bottom(maxLength)
		];
	} else {
		balloon = [' ' + top(maxLength)];

		for (var i = 0, len = lines.length; i < len; i += 1) {
			var delimiter;

			if (i === 0) {
				delimiter = delimiters.first;
			} else if (i === len - 1) {
				delimiter = delimiters.last;
			} else {
				delimiter = delimiters.middle;
			}

			balloon.push(delimiter[0] + ' ' + pad(lines[i], maxLength) + ' ' + delimiter[1]);
		}

		balloon.push(' ' + bottom(maxLength));
	}

	return balloon.join('\n');
}

function split (text, wrap) {
	text = text.replace(/\r\n?|[\n\u2028\u2029]/g, '\n').replace(/^\uFEFF/, '').replace(/\t/g, '        ');

	var lines = [];
	if (!wrap) {
		lines = text.split('\n');
	} else {
		var start = 0;
		while (start < text.length) {
			var nextNewLine = text.indexOf('\n', start);

			var wrapAt = Math.min(start + wrap, nextNewLine === -1 ? text.length : nextNewLine);

			lines.push(text.substring(start, wrapAt));
			start = wrapAt;

			// Ignore next new line
			if (text.charAt(start) === '\n') {
				start += 1;
			}
		}
	}

	return lines;
}

function max (lines) {
	var max = 0;
	for (var i = 0, len = lines.length; i < len; i += 1) {
		if (stringWidth(lines[i]) > max) {
			max = stringWidth(lines[i]);
		}
	}

	return max;
}

function pad (text, length) {
	return text + (new Array(length - stringWidth(text) + 1)).join(' ');
}

function top (length) {
	return new Array(length + 3).join('_');
}

function bottom (length) {
	return new Array(length + 3).join('-');
}


/***/ }),
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var replacer = __webpack_require__(15);

var textCache = {
	default: `$the_cow = <<"EOC";
        $thoughts   ^__^
         $thoughts  ($eyes)\\_______
            (__)\\       )\\/\\
             $tongue ||----w |
                ||     ||
EOC
`
};

exports.get = function (cow) {
	var text = textCache[cow];

	return function (options) {
		return replacer(text, options);
	};
};


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = function (cow, variables) {
	var eyes = escapeRe(variables.eyes);
	var eyeL = eyes.charAt(0);
	var eyeR = eyes.charAt(1);
	var tongue = escapeRe(variables.tongue);

	if (cow.indexOf('$the_cow') !== -1) {
		cow = extractTheCow(cow);
	}

	return cow
		.replace(/\$thoughts/g, variables.thoughts)
		.replace(/\$eyes/g, eyes)
		.replace(/\$tongue/g, tongue)
		.replace(/\$\{eyes\}/g, eyes)
		.replace(/\$eye/, eyeL)
		.replace(/\$eye/, eyeR)
		.replace(/\$\{tongue\}/g, tongue)
	;
};

/*
 * "$" dollar signs must be doubled before being used in a regex replace
 * This can occur in eyes or tongue.
 * For example:
 *
 * cowsay -g Moo!
 *
 * cowsay -e "\$\$" Moo!
 */
function escapeRe (s) {
	if (s && s.replace) {
		return s.replace(/\$/g, '$$$$');
	}
	return s;
}

function extractTheCow (cow) {
	cow = cow.replace(/\r\n?|[\n\u2028\u2029]/g, '\n').replace(/^\uFEFF/, '');
	var match = /\$the_cow\s*=\s*<<"*EOC"*;*\n([\s\S]+)\nEOC\n/.exec(cow);

	if (!match) {
		/* eslint-disable-next-line no-console */
		console.error('Cannot parse cow file\n', cow);
		return cow;
	} else {
		return match[1].replace(/\\{2}/g, '\\').replace(/\\@/g, '@').replace(/\\\$/g, '$');
	}
}

/***/ }),
/* 16 */
/***/ (function(module, exports) {

var modes = {
	'b' : {
		eyes : '==',
		tongue : '  '
	},
	'd' : {
		eyes : 'xx',
		tongue : 'U '
	},
	'g' : {
		eyes : '$$',
		tongue : '  '
	},
	'p' : {
		eyes : '@@',
		tongue : '  '
	},
	's' : {
		eyes : '**',
		tongue : 'U '
	},
	't' : {
		eyes : '--',
		tongue : '  '
	},
	'w' : {
		eyes : 'OO',
		tongue : '  '
	},
	'y' : {
		eyes : '..',
		tongue : '  '
	}
};

module.exports = function (options) {
	for (var mode in modes) {
		if (options[mode] === true) {
			return modes[mode];
		}
	}

	return {
		eyes : options.e || 'oo',
		tongue : options.T || '  '
	};
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = [
	'I think my neighbor is stalking me as she\'s been googling my name on her computer. I saw it through my telescope last night.',
	'I changed my password to "incorrect". So whenever I forget what it is the computer will say "Your password is incorrect".',
	'Entered what I ate today into my new fitness app and it just sent an ambulance to my house.',
	'A clean house is the sign of a broken computer.',
	'Wifi went down during family dinner tonight. One kid started talking and I didn\'t know who he was.',
	'A TV can insult your intelligence, but nothing rubs it in like a computer.',
	'A computer once beat me at chess, but it was no match for me at kick boxing.',
	'Any room is a panic room if you\'ve lost your phone in it.',
	'My internet is so slow, it\'s just faster to drive to the Google headquarters and ask them things in person.',
	'Autocorrect just changed &quot;I have so much anxiety I can barely breathe&quot; to &quot;I\'m fine.&quot;',
	'What was Forrest Gump\'s email password? "1forrest1"',
	'I would like to thank everybody that stuck by my side for those five long minutes my house didn\'t have internet.',
	'Waitress: \'Do u have any questions about the menu?\' Me: \'What kind of font is this?\'',
	'Are you a computer whiz? it seems you know how to turn my software to hardware.',
	'Failure is not an option—it comes bundled with the software.',
	'It\'s ok computer, I go to sleep after 20 minutes of inactivity too.',
	'I just want to live in a world where people come with on/off switches.',
	'You\'d think that with NSA reading our tweets all the time, they could star or retweet some of the good ones.',
	'Is your name Wi-Fi? Because I\'m feeling a connection.',
	'What does a baby computer call its father? Data.',
	'It\'s okay Microsoft Excel even my love life is not responding.',
	'Are you a keyboard? Because you\'re my type!',
	'I used to think love() was abstract, until you implemented it in MyHeart.',
	'Smartphones are pacifiers for adults.',
	'Every function without you will always be void of love.',
	'I buy a lot of ringtones for someone who hasn\'t answered a phone call since 2008.',
	'We just got a fax. At work. We didn\'t know we had a fax machine. The entire department just stared at it. I poked it with a stick.',
	'I love the F5 key. It´s just so refreshing.',
	'HOW DO I TURN OFF CAPS LOCK? I ACCIDENTALLY TURNED IT ON YESTERDAY AND I DON\'T KNOW HOW TO TURN IT BACK OFF. ALL MY FRIENDS ARE MAD BECAUSE THEY THINK I AM SHOUTING AT THEM OVER INTERNET. PLEASE HELP!!!',
	'This must be the 8th castle because I just found my princess.',
	'Roses are #FF0000, violets are #0000FF. All my base are belong to you.',
	'I downloaded the Pinterest app and now my phone is stuck in a mason jar.',
	'The first time I got a universal remote control, I thought to myself &quot;This changes everything&quot;.',
	'My New Years resolution is 1080p.',
	'If Bill Gates had a penny for every time I had to reboot my computer ...oh wait, he does.',
	'My voicemail message is just instructions on how to send a text message with brief pauses filled with heavy sighing.',
	'How do we not know what women want yet? There are tons of conflicting lists all over the internet.',
	'Baby you\'re so cute you made my page 404.',
	'If you were a browser, you\'d be called FireFoxy.',
	'Getting a red heart instead of a yellow star makes me feel like things are moving a little too fast between us.',
	'Facebook is telling me to &quot;reconnect&quot; with my brother...hmmm, I see him everyday',
	'Twitter is just LinkedIn for the chronically unemployed.',
	'You have the nicest syntax I\'ve ever seen.',
	'*Puts down phone* OH MY GOD I HAVE ANOTHER HAND!',
	'You are one well-defined function!',
	'Wow, this article looks awesome.    *clicks link*    *finds out it\'s a slideshow*    *throws computer out the window*',
	'If I was an operating system, your process would have top priority.',
	'Computer does what you command him to do but not what you want from him.',
	'You are my methods. I am nothing without you.',
	'I need more than 140 characters to tell you how beautiful you are.',
	'How good are you at powerpoint? I Excel at it!',
	'If I freeze, it\'s not a computer virus. I was just stunned by your beauty.',
	'Ready for the only way to enjoy Instagram? Follow zero people. Follow every dog.',
	'If I can\'t buy you a drink, at least let me fix your laptop.',
	'Are you an exception? I bet I can catch you.'
];

/***/ })
/******/ ]);