<template>
	<v-card>
		<v-card-title primary-title>
			<h3 class="headline mb-0">{{$t('DEVICE_SIMULATOR_RASPBERRY_PI_LOAD_PROJECT')}}</h3>
		</v-card-title>

		<v-card-text>
			<v-text-field v-model="nameOwnProject" :label="$t('DEVICE_SIMULATOR_RASPBERRY_PI_PROJECT_DIALOG_NAME_LABEL')"></v-text-field>

			<v-btn class="ma-2" tile @click="addSvg()">
				<v-icon left v-if="svgNotLoaded" @click="addSvg()">mdi-file-plus</v-icon>
				<v-icon left v-if="!svgNotLoaded && !svgLoading">mdi-checkbox-marked-circle</v-icon>
				<v-progress-circular v-if="svgLoading" indeterminate></v-progress-circular>
				{{$t('DEVICE_SIMULATOR_RASPBERRY_PI_PROJECT_DIALOG_ADD_SVG')}}
			</v-btn>
			<v-btn v-if="!svgNotLoaded && !svgLoading" @click="removeSvg()"><v-icon>mdi-delete</v-icon></v-btn>
			<v-text-field v-if="!svgNotLoaded && !svgLoading" :value="svgPath" label="SVG path" readonly></v-text-field>

			<v-btn class="ma-2" tile @click="addXml()">
				<v-icon left v-if="xmlNotLoaded" @click="addXml()">mdi-file-plus</v-icon>
				<v-icon left v-if="!xmlNotLoaded && !xmlLoading">mdi-checkbox-marked-circle</v-icon>
				<v-progress-circular v-if="xmlLoading" indeterminate></v-progress-circular>
				{{$t('DEVICE_SIMULATOR_RASPBERRY_PI_PROJECT_DIALOG_ADD_XML')}}
			</v-btn>
			<v-btn class="ma-2" tile v-if="!xmlNotLoaded && !xmlLoading" @click="removeXml()"><v-icon left>mdi-delete</v-icon></v-btn>
			<v-text-field v-if="!xmlNotLoaded && !xmlLoading" :value="xmlPath" label="XML path" readonly></v-text-field>

			<v-alert v-if="showWarning" type="warning">{{ warning }}</v-alert>
			<v-alert v-if="showError" type="error">{{ error }}</v-alert>
		</v-card-text>

		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn text :disabled="showError" @click="loadProject()">{{$t('DEVICE_SIMULATOR_RASPBERRY_PI_PROJECT_DIALOG_UPLOAD')}}</v-btn>
			<v-btn text @click="close()">{{$t('DEVICE_SIMULATOR_RASPBERRY_PI_PROJECT_DIALOG_CLOSE')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import $ from 'jquery';

import generic_raspberrypi from './../../libraries/utils/generic_raspberrypi.js';
import generate_project_json from './../../libraries/utils/generate_project_json.js';

export default {
	name: 'LoadProject',

	data() {
		return {
			nameOwnProject: null,
			svgOwnProjectString: null,
			xmlOwnProjectString: null,

			svgPath: null,
			xmlPath: null,

			svgDocument: null,
			xmlParsed: null,
			showWarning: false,
			warning: null,
			showError: false,
			error: null,

			svgNotLoaded: true,
			svgLoading: false,

			xmlNotLoaded: true,
			xmlLoading: false
		};
	},

	methods: {
		/**
		 * Load the SVG file from local disk
		 */
		async addSvg() {
			let files = await this.studio.filesystem.openImportDialog({
				title:'Import SVG',
				filetypes:['svg']
			});

			if (files) {
				this.svgLoading = true;
				this.svgNotLoaded = false;

				this.svgPath = files[0].name;

				let fileData = await this.studio.filesystem.readImportFile (files[0]);

				this.svgOwnProjectString = fileData.toString();

				this.svgLoading = false;

				if (this.xmlOwnProjectString) {
					this.checkXmlAndSvg();
				}
			}
		},

		/**
		 * Remove the SVG file loaded
		 */
		removeSvg() {
			this.svgOwnProjectString = null;
			this.svgDocument = null;

			this.svgNotLoaded = true;
			this.svgLoading = false;
		},

		/**
		 * Load the XML file from local disk
		 */
		async addXml() {
			let files = await this.studio.filesystem.openImportDialog({
				title:'Import XML',
				filetypes:['xml']
			});

			if (files.length) {
				this.xmlLoading = true;
				this.xmlNotLoaded = false;

				this.xmlPath = files[0].name;

				let fileData = await this.studio.filesystem.readImportFile (files[0]);

				this.xmlOwnProjectString = fileData.toString();

				this.xmlLoading = false;

				if (this.svgOwnProjectString) {
					this.checkXmlAndSvg();
				}
			}
		},

		/**
		 * Remove the XML file loaded
		 */
		removeXml() {
			this.xmlOwnProjectString = null;
			this.xmlDocument = null;

			this.xmlNotLoaded = true;
			this.xmlLoading = false;
		},

		/**
		 * Check the SVG and the XML match
		 */
		checkXmlAndSvg() {
			this.warning = null;
			this.showWarning = false;
			this.error = null;
			this.showError = false;

			let dom = new DOMParser;
			this.svgDocument = dom.parseFromString(this.svgOwnProjectString, 'image/svg+xml').documentElement;
			let xmlDocument = dom.parseFromString(this.xmlOwnProjectString, 'image/svg+xml').documentElement;
			this.xmlParsed = generate_project_json(xmlDocument);

			let svgMatchXml = true;
			for (let component of Object.keys(this.xmlParsed.components)) {
				if ($(this.svgDocument).find('g[partID="' + component + '"]').length === 0) {
					svgMatchXml = false;
				}
			}
			
			if (svgMatchXml === false) {
				this.error = 'The SVG file does not match the XML file!';
				this.showError = true;
			} else if (this.xmlParsed.warning === 'incomplete') {
				this.warning = 'Your circuit is NOT complete! Some components might not work, so please check again your circuit!';
				this.showWarning = true;
			} else {
				this.warning = null;
				this.showWarning = false;
			}
		},

		/**
		 * Save the name, the SVG and the XML files in the project data
		 */
		loadProject() {
			if (this.xmlParsed === null) {
				this.showWarning = false;
				this.warning = 'The XML file is not loaded!';
				this.showWarning = true;
			} else if (this.svgDocument === null) {
				this.showWarning = false;
				this.warning = 'The SVG file is not loaded!';
				this.showWarning = true;
			} else {
				if (this.nameOwnProject === '' || this.nameOwnProject === null) {
					this.nameOwnProject = 'My Project';
				}

				generic_raspberrypi.ownProject.name = this.nameOwnProject;
				generic_raspberrypi.ownProject.svg = this.svgDocument;
				generic_raspberrypi.ownProject.xml = this.xmlParsed;

				this.close('load');
			}
		},

		/**
		 * Close the dialog
		 */
		close(object) {
			this.$root.$emit ('submit', object);
		}
	}
};
</script>