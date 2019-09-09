// import ButtonDialog from './views/ButtonDialog.vue'; 

let studio = null;
let button_example = {};

export function setup(options, imports, register) 
{
	studio = imports;

	studio.workspace.registerToolbarButton ('BUTTON_EXAMPLE_NAME', 20, 
		() => studio.workspace.showNotification ('BUTTON_EXAMPLE_NOTIFICATION_TEXT', 'success'),
		'plugins/button.example/data/img/button.png');
		
	/* studio.workspace.registerToolbarButton ('BUTTON_EXAMPLE_NAME', 20, 
		() => studio.workspace.showDialog ('BUTTON_EXAMPLE_DIALOG_TITLE', ButtonDialog),
		'plugins/button.example/data/img/button.png'); */
	
	register(null, {
		button_example: button_example
	});
}