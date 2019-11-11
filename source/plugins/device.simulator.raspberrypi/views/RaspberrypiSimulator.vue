<template>
	<div>
		
		<v-toolbar text color="grey lighten-4">
			<v-app-bar-nav-icon @click.stop="projectsListShow = !projectsListShow" style="margin-left:15px;"></v-app-bar-nav-icon>
			<v-toolbar-title>{{ projectNameToBeShown }}</v-toolbar-title>
		</v-toolbar>

		<v-navigation-drawer v-if="projectsList" v-model="projectsListShow" absolute temporary width="300" dark>
			<v-list>
				<v-btn text color="secondary" dark @click="projectsListShow = !projectsListShow">{{$t('DEVICE_SIMULATOR_RASPBERRY_PI_CLOSE_PROJECT_LIST')}}</v-btn>
				<v-btn text color="secondary" dark @click="uploadOwnProject(); projectsListShow = !projectsListShow">{{$t('DEVICE_SIMULATOR_RASPBERRY_PI_LOAD_PROJECT')}}</v-btn>

				<v-list-item v-for="(project, index) in projectsList" :key="index" @click="projectName = project.originalName; projectsListShow = !projectsListShow">
					<v-list-item-title>{{ project.name }}</v-list-item-title>
					<v-list-item-avatar size=100>
						<v-img :src="svgGenericPath + project.svgPath + '.svg'"></v-img>
					</v-list-item-avatar>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		
		<div class="row">
			<div class="col-md-5 sim-box">
				<div class="rpi-sim">
					<div id="raspberrypi_svg"></div>
					<div id="lcd_display"></div>
				</div>
			</div>
			<div class="col-md-7 row val-container">
				<v-data-table v-show="componentsTable.length !== 0" hide-default-footer :headers="headerTable" :items="componentsTable" item-key="pin" class="elevation-1"></v-data-table>
			</div>
		</div>
	</div>
</template>

<script>
import $ from 'jquery';

import LoadProject from './dialogs/LoadProject.vue';
import generic_raspberrypi from './../libraries/utils/generic_raspberrypi.js';

export default {
	name: 'RaspberrypiSimulator',

	props: ['active'],

	data() {
		return {
			projectsListShow: null,
			projectsList: null,
			svgGenericPath: null,

			componentsTable: [],
			headerTable: [{
				text: null,
				align: 'left',
				sortable: false,
				value: 'pins'
			}, {
				text: null,
				value: 'name'
			}, {
				text: null,
				value: 'color'
			}],

			projectNameToBeShown: null,
			projectName: null,
			projectData: null,
			lcdComponents: null
		}
	},


	/**
	 * Read and create the list of projects, as well as load the initial project
	 */
	async created() {

		// Update virtual LCD position
		let that = this;
		console.log(that);
		$(window).resize(function() {
			that.loadLcdDisplay();
		})

		// Load the tutorials list of projects
		this.svgGenericPath = generic_raspberrypi.svgGenericPath;

		let svgList = await this.studio.filesystem.readdir('./source' + this.svgGenericPath.substr(1));
		let projectsList = [];

		for (let i = 0; i < svgList.length; i ++) {
			// The name for the SVG path
			svgList[i] = svgList[i].split('.svg')[0];

			// The name to be shown in the list
			let name = svgList[i].split(generic_raspberrypi.startingNameForTutorials)[1];
			name = name.replace(/([0-9A-Z])/g, ' $1').trim();

			projectsList.push({
				name: name,
				originalName: svgList[i],
				svgPath: svgList[i]
			});
		}

		this.projectsList = projectsList;
		this.projectsListShow = false;

		// Save the current project name
		this.projectName = generic_raspberrypi.nameStartingProject;
	},

	watch: {
		/**
		 * Load a new project for every change of the variable 'projectName'
		 * @param  {String} name The name of the project to be loaded
		 */
		projectName(name) {
			// Load the new project data
			this.loadProject(name);
		},

		active() {
			if (this.active) {
				setTimeout (() => {
					this.loadLcdDisplay();

					// Name the header titles of the table
					this.headerTable[0].text = this.$t('DEVICE_SIMULATOR_RASPBERRY_PI_TABLE_PIN');
					this.headerTable[1].text = this.$t('DEVICE_SIMULATOR_RASPBERRY_PI_TABLE_NAME');
					this.headerTable[2].text = this.$t('DEVICE_SIMULATOR_RASPBERRY_PI_TABLE_COLOR');
				}, 250);
			}
		}
	},

	methods: {
		/**
		 * Load a new project with the SVG and the data required
		 * @param  {String} name The name of the project to be loaded
		 */
		loadProject(name) {

			// Parse the name to be shown on the screen if needed
			this.projectNameToBeShown = name;
			if (this.projectNameToBeShown.indexOf(generic_raspberrypi.startingNameForTutorials) === 0) {
				this.projectNameToBeShown = this.projectNameToBeShown.split(generic_raspberrypi.startingNameForTutorials)[1];
				this.projectNameToBeShown = this.projectNameToBeShown.replace(/([0-9A-Z])/g, ' $1').trim();
			}

			generic_raspberrypi.loadProject(name);
			this.projectData = generic_raspberrypi.dataLoaded;

			this.componentsTable = [];
			while (document.getElementById('lcd_display').firstChild) {
				document.getElementById('lcd_display').removeChild(document.getElementById('lcd_display').firstChild);
			}

			// Create the list needed for the table of components
			for (let component of Object.keys(this.projectData.components)) {
				let newComponent = {
					pins: null,
					name: null,
					color: null
				};

				// Set the attribute 'pins' of each component
				let pins = '';
				for (let pin of Object.keys(this.projectData.pins)) {
					if (this.projectData.pins[pin].id !== 'gnd' && this.projectData.pins[pin].components.includes(component)) {
						if (pins !== '') {
							pins += ', ';
						}

						if (pin !== '3v3' && pin !== '5v') {
							pins += generic_raspberrypi.parsePinToGpio(pin);
						} else {
							pins += pin;
						}
					}
				}
				newComponent.pins = pins.toUpperCase();

				// Set the attribute 'name' of each component
				newComponent.name = this.projectData.components[component].name.toUpperCase();

				// Set the attribute 'color' of each component
				if (this.projectData.components[component].color) {
					newComponent.color = this.projectData.components[component].color.toUpperCase();
				} else {
					newComponent.color = '-';
				}

				// Add the component to the table
				this.componentsTable.push(newComponent);

				// Create the LCD segments simulation and add them to the HTML
				this.lcdComponents = [];
				if (this.projectData.components[component].name === 'lcd') {
					this.lcdComponents.push(component);
				}
			}

			if (this.active) {
				setTimeout (() => {
					this.loadLcdDisplay();
				}, 250);
			}
		},

		/**
		 * Upload files for a new project and then load it
		 */
		async uploadOwnProject() {
			let state = await this.studio.workspace.showDialog(LoadProject, {
				width: 500
			});

			if (state) {
				this.loadProject(generic_raspberrypi.ownProject.name);
			}
		},

		loadLcdDisplay() {
			for (let component of this.lcdComponents) {
				let elementLcd = $(document.querySelector('#raspberrypi_svg').firstElementChild).find('g[partID="' + component + '"]');

				if (elementLcd[0]) {
					while (document.getElementById('lcd_display').hasChildNodes()) {
						document.getElementById('lcd_display').removeChild(document.getElementById('lcd_display').firstElementChild);
					}

					let position = elementLcd[0].getBoundingClientRect();
					console.log('BUNA\n\n\n');
					console.log(position);
					let svgLeftPosition = position.left;
					let svgTopPosition = position.top - 185.5;
					
					let lcd = document.createElement('g');
					lcd.style.cssText = 'position: absolute; left:' + svgLeftPosition + 'px; top: ' + svgTopPosition + 'px;';
					lcd.id = component;

					let leftPosition = 0;
					let topPosition = 0;
					for (let i = 0; i < 2; i ++) {
						for (let j = 0; j < 16; j ++) {
							let lcdSegment = document.createElement('g');

							if (j === 0 && i !== 0) {
								leftPosition = 0;
								topPosition += 22;
							}

							lcdSegment.style.cssText = 'position: absolute; left: ' + leftPosition + 'px; top: ' + topPosition + 'px; width: 13.3px; height: 21px; text-align: center; font-size: 15px; background: #009628';
							lcdSegment.id = 'segment ' + i + '-' + j;
							lcd.appendChild(lcdSegment);

							leftPosition += 14.3;
						}
					}

					document.getElementById('lcd_display').appendChild(lcd);
				}
			}
		}
	}
}
</script>

<style lang="less" scoped>
	@import '../style/devicesim.less';
</style>