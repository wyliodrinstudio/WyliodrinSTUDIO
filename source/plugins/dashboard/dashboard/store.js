export default {
	namespaced: true,
	state: 
	{
		graphs: []
	},
	getters: 
	{
		graphs: (state) => state.graphs,
	},
	actions:
	{
		graphs: ({commit}, graphs) => commit('graphs', [...graphs]),
	},
	mutations:
	{
		graphs: (state, value) => state.graphs = value,
	}
};