import _ from 'lodash';

/* the non connected device */
export const NoneDevice = {
	id: 'none',
	type: 'none',
	name: '',
	board: 'none',
	languages: {},
};

export default {
	namespaced: true,
	state:
	{
		menuItems: [],
		toolbarButtons: [],
		deviceToolButtons: [],
		tabs: [],
		activeTab: 0,
		title: '',
		devices: [],
		device: NoneDevice,
		status: 'DISCONNECTED',
		currentProject: '',
		currentFile: '',
		mode:'simple',
		statusButtons: [],
		activeStatusButton: '',
	},
	getters:
	{
		menuItems: (state) => state.menuItems,
		toolbarButtons: (state) => state.toolbarButtons,
		deviceToolButtons: (state) => state.deviceToolButtons,
		tabs: (state) => state.tabs,
		activeTab: (state) => state.activeTab,
		title: (state) => state.title,
		devices: (state) => state.devices,
		device: (state) => state.device,
		status: (state) => state.status,
		mode: (state) => state.mode,
		statusButtons: (state) => state.statusButtons,
		activeStatusButton: (state) => state.activeStatusButton,
		// currentProject: (state) => state.currentProject,
		// currentFile: (state) => state.currentFile
	},
	actions:
	{
		menuItems: ({commit}, menuItems) => commit ('menuItems', [...menuItems]),
		toolbarButtons: ({commit}, toolbarButtons) => commit ('toolbarButtons', [...toolbarButtons]),
		deviceToolButtons: ({commit}, deviceToolButtons) => commit ('deviceToolButtons', [...deviceToolButtons]),
		tabs: ({commit}, tabs) => commit('tabs', [...tabs]),
		activeTab: ({commit}, activeTab) => commit ('activeTab', activeTab),
		title: ({commit}, title) => commit ('title', title),
		devices: ({commit}, devices) => commit ('devices', devices),
		device: ({commit}, device) => 
		{
			if (!device || !device.type) device = NoneDevice;
			else device = _.assign ({}, device);
			commit ('device', device);
			return device;
		},
		status: ({commit}, status) => commit ('status', status),
		mode: ({commit}, mode) => {
			commit ('mode', mode);
		},
		statusButtons: ({commit}, statusButtons) => commit ('statusButtons', [...statusButtons]),
		activeStatusButton: ({commit}, activeStatusButton) => commit ('activeStatusButton', activeStatusButton),
		// currentProject: ({commit}, currentProject) => commit ('currentProject', currentProject),
		// currentFile: ({commit}, currentFile) => commit ('currentFile', currentFile)
	},
	mutations:
	{
		menuItems: (state, value) => state.menuItems = value,
		toolbarButtons: (state, value) => state.toolbarButtons = value,
		deviceToolButtons: (state, value) => state.deviceToolButtons = value,
		tabs: (state, value) => state.tabs = value,
		activeTab: (state, value) => state.activeTab = value,
		title: (state, value) => state.title = value,
		devices: (state, value) => state.devices = value,
		device: (state, value) => state.device = value,
		status: (state, value) => state.status = value,
		mode: (state, value) => state.mode = value,
		statusButtons: (state, value) => state.statusButtons = value,
		activeStatusButton: (state, value) => state.activeStatusButton = value,
		// currentProject: (state, value) => state.currentProject = value,
		// currentFile: (state, value) => state.currentFile = value
	}
};