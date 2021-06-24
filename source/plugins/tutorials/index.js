import Tutorials from './views/Tutorials.vue';

let studio = null;

export function setup(options, imports, register) 
{
	studio = imports;

	let tutorials = {
		/**
		 * Show a list for tutorials from a github repository
		 * 
		 * @param {String} githubRepository - username/repository
		 */
		async showTutorials (repository) {
			let tutorialsList = await studio.downloader.getTutorials(repository);
			studio.workspace.showDialog (Tutorials, {
				repository: repository,
				tutorials: tutorialsList,
				width: 600
			});
		}
	};

	studio.workspace.registerToolbarButton ('TUTORIALS_NAME', 20, 
		() => { 
			tutorials.showTutorials ('wyliodrinstudio/tutorials');
		},

		'plugins/tutorials/data/img/toque.png');
		
	register(null, {
		tutorials: tutorials
	});
	
}