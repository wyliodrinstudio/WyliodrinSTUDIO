<template>
	<div style="position:relative;">
		<div class="terminal-btns">
			<v-tooltip top>
				<template v-slot:activator="{ on }">
					<v-btn small @click="close" v-on="on">
						<v-img src="plugins/console/data/img/icons/close-icon.svg"></v-img>
					</v-btn>
				</template>
				<span>{{$t('CLOSE')}}</span>
			</v-tooltip>
		</div>
		<Xterm no-shell='CONSOLE_NO_SHELL' ref="shell" @data="data" @update="update" @resize="resize" :active="active"></Xterm>
	</div>
</template>

<style lang="less" scoped>
	@import '../style/console.less';
</style>

<script>
import { EventEmitter } from 'events';
export let events = new EventEmitter ();

let shell = null;

export function getConsole ()
{
	return shell;
}

export default {
	name: 'Console',
	props: ['active'],
	methods: {
		close ()
		{
			this.studio.workspace.closeStatusButton ()
		},
		data: events.emit.bind (events, 'data'),
		update: events.emit.bind (events, 'update'),
		resize: events.emit.bind (events, 'resize'),
		esc ()
		{
			this.close ();
		}
	},
	mounted ()
	{
		shell = this.$refs.shell;
	}
}
</script>

