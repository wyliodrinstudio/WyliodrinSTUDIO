import FlashSelectDevice from './views/FlashSelectDevice.vue';
import EdgeOrChrome from '../../devices/mp/views/EdgeOrChrome.vue';
import UpgradeToHttps from '../../devices/mp/views/UpgradeToHttps.vue';

let studio = null;
let serialport = null;

let flash = {
	flashers: [],
	
	/**
	 * This function registers a flasher object by updating the list of all flashers with a new flasher having its 
	 * own specifications and functions. 
	 * 
	 * Every new flasher has an *id*, its unique identifier, a *name*, which is the actual 
	 * name of the board it's used to flash, a characteristic *logo*, a *dialogVue* that has the flashing logic,
	 * a *vendorId* used to identify the vendor of the board, and *productId* used to identify the exact board.
	 * 
	 * @param {string} id - flasher id
	 * @param {string} name - boards it can flash
	 * @param {string} boardLogo - Location of the board logo
	 * @param {string} dialogVue - Location of the flasher dialog
	 * @param {string} vendorId - Vendor ID
	 * @param {string} productId - Product ID
	 * 
	 * 
	 * @example
	 * 
	 * registerFlasher('esp', 'ESP8266/32', 'plugins/flash/flash.esp/data/img/ESP.png', FlashDialog, '1a86');
	 */
	registerFlasher(id, name, boardLogo, dialogVue, vendorId, productId) {
		if(id !== null && name !== null && boardLogo !== null && dialogVue !== null && vendorId !== null) {
			this.flashers.push({
				id: id,
				name: name,
				boardLogo: boardLogo,
				dialogVue: dialogVue,
				vendorId: vendorId,
				productId: productId
			});
		} else {
			studio.workspace.warn('FLASH_NULL');
		}
	},

	/**
	 * This function returns a flasher object by its id.
	 * 
	 * @param {string} id - flasher id
	*/
	getFlasher(id) {
		if(id !== null) {
			for(let flasher of this.flashers)
				if(flasher.id == id) return flasher;
			return null;
		} else {
			studio.workspace.warn('FLASH_NULL');
			return null;
		}
	}
};

export default function setup (options, imports, register)
{
	studio = imports;
	serialport = imports.serialport;

	studio.workspace.registerMenuItem ('TOOLBAR_FLASH', 20, () => {
		if(serialport.isAvailable ())
			studio.workspace.showDialog(FlashSelectDevice, {
				fromBurger: true,
				width:500
			});
		else {
			let chrome = !!window.chrome;
			let https = (location.protocol === 'https:');

			if(chrome == false) 
			{
				studio.workspace.showDialog (EdgeOrChrome, {
					width: '500px'
				});
			} else if(https == false) 
			{
				studio.workspace.showDialog (UpgradeToHttps, {
					width: '500px'
				});
			} else 
			{			
				studio.workspace.showDialog (EdgeOrChrome, {
					width: '500px'
				});
			}
		}
	});
	
	register (null, {
		flash: flash
	});
}
