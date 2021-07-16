import FlashSelectDevice from './views/FlashSelectDevice.vue';
import EdgeOrChrome from '../devices/mp/views/EdgeOrChrome.vue';
import UpgradeToHttps from '../devices/mp/views/UpgradeToHttps.vue';

let studio = null;
let serialport = null;

let flash = {
	
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
