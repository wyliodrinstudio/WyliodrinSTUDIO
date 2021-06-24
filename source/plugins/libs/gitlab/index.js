import Axios from 'axios';

let gitlab = {
	async getDirListOfFiles (path, fileHierarchy, owner, repo, ref) {
		let gitURL = `https://gitlab.com/api/v4/projects/${owner}%2F${repo}/repository/tree?path=${path}`;
		if (ref) {
			gitURL += `&ref=${ref}`;
		}
		let response = await Axios.get(gitURL);

		for(let item of response.data) {
			if (item.type === 'blob') {
				if (fileHierarchy[path] === undefined) {
					fileHierarchy[path] = [];
				}
				fileHierarchy[path].push(item.path);
			}
			else if (item.type === 'tree') {
				await this.getDirListOfFiles(item.path, fileHierarchy, owner, repo, ref);
			}
		}
	},
	async getRepoFileHierarchy (root, owner, repo, ref = undefined) {
		let fileHierarchy = {};
	
		await this.getDirListOfFiles(root, fileHierarchy, owner, repo, ref);
	
		return fileHierarchy;
	},
	async downloadFile (filePath, owner, repo, ref) {
		let response = await Axios.get(`https://gitlab.com/${owner}/${repo}/-/raw/${ref}/${filePath}`);
		return response.data;
	}
};

export function setup (options, imports, register) {
	register (null, {
		gitlab: gitlab
	});
}
