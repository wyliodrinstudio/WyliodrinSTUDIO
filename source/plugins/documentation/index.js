let studio = null;

//import WyliodrinDocumentation from './views/WyliodrinDocumentation.vue';
import electron from 'electron';
const remote = electron.remote;

let documentation = {
	openDocumentation() {
		let child = new remote.BrowserWindow({
		  width: 1180,
		  height: 800,
		  minWidth: 1150,
		  minHeight: 700
		});
		child.loadFile("plugins/documentation/data/documentation/index.html");
  
		//console.log('file://'+path.join('source','ui','js','documentation','index.html'));
		//child.loadURL('file://'+path.join('source','ui','js','documentation','index.html'));
	  }
};
export default function setup (options, imports, register)
{
	studio = imports;

	studio.workspace.registerMenuItem ('WYLIODRIN_API', 10, () => documentation.openDocumentation());
	
	register (null, {
		documentation: documentation
	});
}
