import Tutorials from './views/Tutorials.vue';

let studio = null;

export function setup(options, imports, register) 
{
	studio = imports;
	let platformData = 'github';
	let token = null;

	let tutorials = {
		/**
		 * Show a list for tutorials from a repository
		 * 
		 * @param {String} repository - username/repository
		 */
		showTutorials (repository) {
			let owner = repository.split('/')[0];
			repository = repository.split('/')[1];
			studio.workspace.showDialog (Tutorials, {
				owner: owner,
				repository: repository,
				platformData: platformData,
				token: token,
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