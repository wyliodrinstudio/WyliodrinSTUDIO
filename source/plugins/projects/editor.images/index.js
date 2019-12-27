import ImageEditor from './views/ImageEditor.vue';

export default function setup (options, imports, register)
{
	const studio = imports;
	studio.projects.registerEditor('EDITOR_IMAGE',['png', 'jpg', 'jpeg', 'gif', 'svg', 'tiff', 'bmp', 'ppm', 'pgm', 'pbm', 'pnm', 'bat', 'bpg'], ImageEditor);
	
	register (null, {});
}
