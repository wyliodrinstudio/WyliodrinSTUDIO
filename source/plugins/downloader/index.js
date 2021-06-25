let studio = null;
let platform = null;

let downloader = {
	changePlatform(newPlatform) {
		studio.settings.storeValue('downloader', 'platform', newPlatform);
		if(newPlatform == 'github')
			platform = studio.github;
		else if(newPlatform == 'gitlab')
			platform = studio.gitlab;
	},
	async getDirListOfFiles (path, fileHierarchy, owner, repo, ref) {
		await platform.getDirListOfFiles(path, fileHierarchy, owner, repo, ref);
	},
	async getContentOfDir(path, owner, repo, ref) {
		return await platform.getContentOfDir(path, owner, repo, ref);
	},
	async getRepoFileHierarchy (root, owner, repo, ref = undefined) {
		return await platform.getRepoFileHierarchy(root, owner, repo, ref);
	},
	async downloadFile (filePath, owner, repo, ref, responseType = 'json') {
		return await platform.downloadFile(filePath, owner, repo, ref, responseType);
	}
};

export function setup(options, imports, register)
{
	studio = imports; 
	let loadPlatform = studio.settings.loadValue('downloader', 'platform', 'github');

	if(loadPlatform == 'github') platform = studio.github;
	else if(loadPlatform == 'gitlab') platform = studio.gitlab;
			
	register(null, {
		downloader: downloader
	});
}