export default {
	namespaced: true,
	state:
	{
		currentProject: '',
		currentFile: '',
		editors:[],
		currentEditor:'',
	},
	getters:
	{
		currentProject: (state) => state.currentProject,
		currentFile: (state) => state.currentFile,
		editors: (state) => state.editors,
		currentEditor: (state) => state.currentEditor
	},
	actions:
	{
		currentProject: ({commit}, currentProject) => commit ('currentProject', currentProject),
		currentFile: ({commit}, currentFile) => commit ('currentFile', currentFile),
		editors: ({commit}, editors) => commit ('editors', [...editors]),
		currentEditor: ({commit}, currentEditor) => commit ('currentEditor', currentEditor)
	},
	mutations:
	{
		currentProject: (state, value) => state.currentProject = value,
		currentFile: (state, value) => state.currentFile = value,
		editors: (state, value) => state.editors = value,
		currentEditor: (state, value) => state.currentEditor = value
	}
};