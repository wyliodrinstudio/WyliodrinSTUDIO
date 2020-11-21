import Schematics from './views/Schematics.vue';

let studio = null;

export default function setup (options, imports, register)
{
	studio = imports;

	let schematics = {
		/**
		 * Set project schematics
		 * 
		 * @param {Project} project - the project
		 * @param {Buffer} data - schematics data
		 */
		setSchematics (project, data) {
			return studio.projects.saveSpecialFile (project, 'schematics.svg', data);
		},

		/**
		 * Delete project schematics
		 * 
		 * @param {Project} project - the project
		 */
		deleteSchematics (project) {
			return studio.projects.deleteSpecialFile (project, 'schematics.svg');
		},

		/**
		 * Get project schematics
		 * 
		 * @param {Project} project - the project
		 * 
		 * @returns {Buffer} - the project schmeatics
		 */
		getSchematics (project) {
			return studio.projects.loadSpecialFile (project, 'schematics.svg');
		}
	};

	studio.workspace.registerTab('SCHEMATICS', 400, Schematics, {
		enabled ()
		{
			return !!studio.projects.getCurrentProject();
		}
	});
	
	register (null, {
		schematics: schematics
	});
}
