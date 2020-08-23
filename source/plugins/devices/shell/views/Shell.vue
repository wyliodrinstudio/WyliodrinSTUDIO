<template>
	<div class="fill-height">
		<Xterm :active="active" no-shell='SHELL_NO_SHELL' ref="shell" @data="data" @update="update" @resize="resize" class="shell-box"></Xterm>
	</div>
</template>

<script>
import { EventEmitter } from 'events';
export let events = new EventEmitter ();
let shell = null;

export function getShell ()
{
	return shell;
}

export default {
	name: 'Shell',
	props: ['active'],
	data ()
	{
		return {
			events: events
		};
	},
	mounted ()
	{
		shell = this.$refs.shell;
	},
	methods: {
		data: events.emit.bind (events, 'data'), // (...args) => { events.emit ('data', ...args);}
		update: events.emit.bind (events, 'update'),
		resize: events.emit.bind (events, 'resize')
	}
};
</script>

