import ButtonDialog from './views/ButtonDialog.vue'; 
let studio = null;
let button_example = {};

export function setup(options, imports, register) 
{
	studio = imports;
	studio.workspace.registerToolbarButton ('EXAMPLE_BUTTON_NAME', 20, 
		() => studio.workspace.showDialog ('EXAMPLE_BUTTON_NOTIFICATION_TEXT', ButtonDialog),
		'plugins/button.example/data/img/button.png');
	
	register(null, {
		button_example: button_example
	});
}