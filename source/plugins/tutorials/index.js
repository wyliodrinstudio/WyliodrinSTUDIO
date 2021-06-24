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
		async showTutorials (githubRepository) {
			let tutorialsList = await studio.githubdownloader.getTutorials(githubRepository);
			studio.workspace.showDialog (Tutorials, {
				repository: githubRepository,
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