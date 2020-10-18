export const NO_CONFIG = {};

export default {
	namespaced: true,
	state: 
	{
		activeClassroom: null,
		config: NO_CONFIG,
	},
	getters: 
	{
		activeClassroom: (state) => state.activeClassroom,
		isConnected: (state) => state.config !== NO_CONFIG,
		role: (state) => state.config.role,
		name: (state) => state.config.name,
		server: (state) => state.config.server,
	},
	actions:
	{
		activeClassroom: ({commit}, activeClassroom) => commit('activeClassroom', activeClassroom),
		config: ({commit}, config) => commit('config', config),
	},
	mutations:
	{
		activeClassroom: (state, value) => state.activeClassroom = value,
		config: (state, value) => state.config = value,
	}
};