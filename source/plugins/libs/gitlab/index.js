import Axios from 'axios';

let gitlab = {
	token: null,
	urlAPI: 'https://gitlab.com',
	async getDirListOfFiles (path, fileHierarchy, owner, repo, ref) {
		let gitURL = `${this.urlAPI}/api/v4/projects/${owner}%2F${repo}/repository/tree?path=${path}`;
		if (ref) {
			gitURL += `&ref=${ref}`;
		}
		if(this.token) {
			gitURL += `&private_token=${this.token}`;
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
	async getContentOfDir(path, owner, repo, ref) {
		let gitURL = `${this.urlAPI}/api/v4/projects/${owner}%2F${repo}/repository/tree?path=${path}`;
		if (ref) {
			gitURL += `&ref=${ref}`;
		}
		if(this.token) {
			gitURL += `&private_token=${this.token}`;
		}
		
		let response = await Axios.get(gitURL);

		let contents = {dirs: [], files: []};

		for(let item of response.data) {
			if(item.type === 'tree')
				contents.dirs.push(item.path);
			else if(item.type === 'blob')
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
		filePath = filePath.replace(/\//g, '%2F');

		let gitURL = `${this.urlAPI}/api/v4/projects/${owner}%2F${repo}/repository/files/${filePath}?ref=${ref}`;
		if(this.token) {
			gitURL += `&private_token=${this.token}`;
		}
		let response = await Axios.get(gitURL);	

		response = Buffer.from(response.data.content, response.data.encoding);

		if(responseType == 'json')
			return JSON.parse(response.toString());
		else return response.toString();
	},
	authenticate(token) {
		this.token = token;
	},
	changeURL(newURL) {
		if(newURL.endsWith('/'))
			newURL = newURL.slice(0, -1);

		this.urlAPI = newURL;
	}
};

export function setup (options, imports, register) {
	register (null, {
		gitlab: gitlab
	});
}
