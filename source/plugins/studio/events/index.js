import EventEmitter from 'events';

export function setup (options, imports, register)
{
	register (null, {
		events: new EventEmitter()
	});
}
