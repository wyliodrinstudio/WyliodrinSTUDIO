import Axios from 'axios';

let github = {
	async getDirListOfFiles (path, fileHierarchy, owner, repo, ref) {
		let gitURL = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
		if (ref) {
			gitURL += `?ref=${ref}`;
		}
		let response = await Axios.get(gitURL);

		for(let item of response.data) {
			if (item.type === 'file') {
				if (fileHierarchy[path] === undefined) {
					fileHierarchy[path] = [];
				}
				fileHierarchy[path].push(item.path);
			}
			else if (item.type === 'dir') {
				await this.getDirListOfFiles(item.path, fileHierarchy, owner, repo, ref);
			}
		}
	},
	async getContentOfDir(path, owner, repo, ref) {
		let gitURL = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
		if (ref) {
			gitURL += `?ref=${ref}`;
		}
		let response = await Axios.get(gitURL);

		let contents = {dirs: [], files: []};

		for(let item of response.data) {
			if(item.type === 'dir')
				contents.dirs.push(item.path);
			else if(item.type === 'file')
				contents.files.push(item.path);
		}

		return contents;
	},
	async getRepoFileHierarchy (root, owner, repo, ref = undefined) {
		let fileHierarchy = {};
	
		await this.getDirListOfFiles(root, fileHierarchy, owner, repo, ref);
	
		return fileHierarchy;
	},
	async downloadFile (filePath, owner, repo, ref, responseType = 'json') {
		let response = await Axios.get(`https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${filePath}`,  {responseType: responseType,});
		return response.data;
	},
	authenticate(token) {
		return token;
	},
	changeURL(newURL) {
		return newURL;
	}
};

export function setup (options, imports, register) {
	register (null, {
		github: github
	});
}
