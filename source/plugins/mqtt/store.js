import _ from 'lodash';

export default {
	namespaced: true,
	state:
	{
		status:'stopped',
	},
	getters:
	{
		status: (state) => state.status,
	},
	actions:
	{
		status: ({commit}, status) => commit ('status', status),
	},
	mutations:
	{
		status: (state, value) => state.status = value,
	}
};