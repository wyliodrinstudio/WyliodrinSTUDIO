import _ from 'lodash';
import generic_raspberrypi from './generic_raspberrypi.js';

export default function update_components() {
	for (let pin of Object.keys(generic_raspberrypi.dataLoaded.pins)) {
		if (generic_raspberrypi.dataLoaded.pins[pin].state === 'out') {
			let validCircuit = true;
			for (let component of generic_raspberrypi.dataLoaded.pins[pin].components) {
				if (generic_raspberrypi.dataLoaded.components[component].valid === false) {
					validCircuit = false;
					break;
				}
			}

			if (validCircuit) {
				let closedCircuit = true;
				for (let component of generic_raspberrypi.dataLoaded.pins[pin].components) {
					if (generic_raspberrypi.dataLoaded.components[component].active === false &&
						generic_raspberrypi.dataLoaded.components[component].name === 'button') {
						closedCircuit = false;
					}
				}

				if (closedCircuit) {
					for (let component of generic_raspberrypi.dataLoaded.pins[pin].components) {
						if (generic_raspberrypi.dataLoaded.components[component].name === 'led') {
							generic_raspberrypi.setLed(component, generic_raspberrypi.dataLoaded.pins[pin].value);
						}
					}
				} else {
					for (let component of generic_raspberrypi.dataLoaded.pins[pin].components) {
						if (generic_raspberrypi.dataLoaded.components[component].name === 'led') {
							generic_raspberrypi.setLed(component, 0);
						}
					}
				}
			}
		}
	}

	for (let component of Object.keys(generic_raspberrypi.dataLoaded.components)) {
		if (generic_raspberrypi.dataLoaded.components[component].name === 'lcd' && generic_raspberrypi.dataLoaded.components[component].active) {
			for (let i = 0; i < 16; i ++) {
				if (generic_raspberrypi.dataLoaded.components[component].segments[0][i + generic_raspberrypi.dataLoaded.components[component].shift] === undefined) {
					document.getElementById('segment ' + 0 + '-' + i).innerHTML = '';
				} else {
					document.getElementById('segment ' + 0 + '-' + i).innerHTML = generic_raspberrypi.dataLoaded.components[component].segments[0][i + generic_raspberrypi.dataLoaded.components[component].shift];
				}

				if (generic_raspberrypi.dataLoaded.components[component].segments[1][i + generic_raspberrypi.dataLoaded.components[component].shift] === undefined) {
					document.getElementById('segment ' + 1 + '-' + i).innerHTML = '';
				} else {
					document.getElementById('segment ' + 1 + '-' + i).innerHTML = generic_raspberrypi.dataLoaded.components[component].segments[1][i + generic_raspberrypi.dataLoaded.components[component].shift];
				}
			}
		}
	}
}