<template>
	<v-app>
		<Toolbar></Toolbar>		
		<Workspace></Workspace>
		<Status></Status>
	</v-app>
</template>

<script>
import Vue from 'vue';
import Toolbar from './Toolbar.vue';
import Workspace from './Workspace.vue';
import AboutDialog from './AboutDialog.vue';
import Status from './Status.vue';

console.log ('Loading Studio');
export default Vue.extend ({
	name: 'Studio',
	components: {
		Toolbar,
		Workspace,
		Status
	},
	data()
	{
		return {
			
		};
	},
	created ()
	{
		
	},
	methods: {
		
	}
});
</script>

<style lang="less">
@import '../style/vendor.less';
@import '../style/studio.less';
</style>

