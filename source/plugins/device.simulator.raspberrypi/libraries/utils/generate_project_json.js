import xml2json from './xml2json.js';
import generic_raspberrypi from './generic_raspberrypi.js';

/**
 * Parse the XML file, and generate the JSON associated
 * @param  {String} xml The XML file to be parsed
 * @param  {String} name The name of the project to load
 */
export default function generate_project_json(xml) {
	let projectJson = {};
	let nrOfComponents = 0;
	let netArray = xml2json(xml).net;

	// Array of the connections, with the first position taken by the connections that
	// don't include directly the RaspberryPi
	let connections = [{
		name: 'wire',
		components: []
	}];

	// The object that includes the components list
	let components = {};

	// Create the list of the components and the connections list
	for (let net of netArray) {
		if (net.connector.length > 1) {
			let connection = {
				name: null,
				components: []
			};

			// Take every connection one by one
			for (let connector of net.connector) {

				// If the title is 'Raspberry Pi 3', it means it is a direct connection to the Pi
				if (connector.part.attributes.title === 'Raspberry Pi 3') {
					connection.name = connector.attributes.name;
				} else {
					
					// Add the component to the list of components for every connection
					if (connection.components.indexOf(connector.part.attributes.id) === -1) {
						connection.components.push(connector.part.attributes.id);
					}

					// Check if the component already exist in the general list of components
					if (Object.keys(components).indexOf(connector.part.attributes.id) === -1) {

						// Add a component to the general list of components
						let component = {
							name: null,
							active: null,
							valid: null
						}

						component.active = false;
						component.valid = true;

						if (connector.part.attributes.title.toLowerCase().includes('led')) {
							component.name = 'led';
							component.color = connector.part.attributes.title.toLowerCase().split(' ')[0];
						} else if (connector.part.attributes.title.toLowerCase().includes('button')) {
							component.name = 'button';
						} else if (connector.part.attributes.title.toLowerCase().includes('pot')) {
							component.name = 'potentiometer';
						} else if (connector.part.attributes.title.toLowerCase().includes('lcd')) {
							component.name = 'lcd';
							component.segments = [['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''], ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '']];
							component.cursor = true;
							component.blink = true;
							component.curCol = 0;
							component.curRow = 0;
							component.shift = 0;
						}

						components[connector.part.attributes.id] = component;

						nrOfComponents ++;
					}
				}
			}

			// Set a name for the connections not directly attached to the Raspberry Pi
			if (connection.name === null) {
				connections[0].components.push({
					start: connection.components[0],
					finish: connection.components[1]
				})
			} else {
				connections.push(connection);
			}
		}
	}

	// Create RaspberryPi pins JSON with the first component associated
	for (let connection of connections) {
		let newPinObject = {
			id: null,
			value: null,
			edge: null,
			state: null,
			activeLow: null,
			circuitInterruption: null,
			components: []
		};

		// Case for connections that are attached to a GPIO pin
		if (connection.name.toLowerCase().includes('gipo') &&
			connection.components.length > 0) {
			newPinObject.value = 0;
			newPinObject.edge = 'none';
			newPinObject.state = 'in';
			newPinObject.activeLow = false;
			newPinObject.circuitInterruption = false;
			newPinObject.components.push(connection.components[0]);

			// Find the number of the pin with the given name 
			// GPIOx where 'x' is replaced by a number
			for (let pin of Object.keys(generic_raspberrypi.pins)) {
				if (generic_raspberrypi.pins[pin].name === connection.name) {
					newPinObject.id = pin;
					projectJson[pin] = newPinObject;
					break;
				}
			}

		// Case for connections that are attached to a 3V3 pin
		} else if (connection.name.toLowerCase().includes('3v3') &&
					connection.components.length > 0) {
			newPinObject.id = '3v3';
			newPinObject.value = 1;
			newPinObject.state = 'out';
			newPinObject.circuitInterruption = false;

			// Make a list with all the components associated to the 3V3 pin
			for (let component of connection.components) {
				newPinObject.components.push(component);
			}

			// Save the new pin in the JSON for all the pins
			projectJson[newPinObject.id] = newPinObject;

		// Case for connections that are attached to a 5V pin
		} else if (connection.name.toLowerCase().includes('5v') &&
					connection.components.length > 0) {
			newPinObject.id = '5v';
			newPinObject.value = 1;
			newPinObject.state = 'out';
			newPinObject.circuitInterruption = false;

			// Make a list with all the components associated to the 5V pin
			for (let component of connection.components) {
				newPinObject.components.push(component);
			}

			// Save the new pin in the JSON for all the pins
			projectJson[newPinObject.id] = newPinObject;

		// Case for connections that are attached to a GND pin
		} else if (connection.name.toLowerCase().includes('gnd') &&
					connection.components.length > 0) {
			newPinObject.id = 'gnd';
			newPinObject.value = 0;
			newPinObject.state = 'in';
			newPinObject.circuitInterruption = false;

			// Make a list with all the components associated to the GND pin
			for (let component of connection.components) {
				newPinObject.components.push(component);
			}

			// Save the new pin in the JSON for all the pins
			projectJson[newPinObject.id] = newPinObject;
		}
	}

	// Add the rest of the components, the ones that are not directly connected to the RaspberryPi
	let i = 0;
	while (connections[0].components.length > 0 && i < nrOfComponents) {
		for (let component of connections[0].components) {
			for (let pin of Object.keys(projectJson)) {

				// Check if there is a component from the pair (<start>, <finish>) that is attached
				// to this pin. If so, add the other component, the one that is not attached
				if (projectJson[pin].components.indexOf(component.start) !== -1) {
					if (components[component.finish].name === 'button') {
						projectJson[pin].circuitInterruption = true;
					}

					projectJson[pin].components.push(component.finish);
					connections[0].components.splice(connections[0].components.indexOf(component), 1);
				} else if (projectJson[pin].components.indexOf(component.finish) !== -1) {
					if (components[component.start].name === 'button') {
						projectJson[pin].circuitInterruption = true;
					}

					projectJson[pin].components.push(component.start);
					connections[0].components.splice(connections[0].components.indexOf(component), 1);
				}
			}
		}

		i ++;
	}
	
	// Check if all the components have at least 2 pins connected to the RaspberryPi
	let warning = null;
	for (let component of Object.keys(components)) {

		// Find the numbers of occurences of the component
		let pins = [];
		for (let pin of Object.keys(projectJson)) {
			if (projectJson[pin].components.indexOf(component) !== -1) {
				pins.push(pin);
			}
		}

		// The number of occurences has to be at least 2
		if (components[component].name !== 'lcd') {
			if (pins.length < 2) {
				components[component].valid = false;
				warning = 'incomplete';
			}
		} else {
			if (pins.length < 6) {
				components[component].valid = false;
				warning = 'incomplete';
			}
		}
	}

	return {
		components: components,
		pins: projectJson,
		assignedPins: [],
		warning: warning
	};
}