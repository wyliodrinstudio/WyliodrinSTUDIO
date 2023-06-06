(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[39],{

/***/ 566:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return setup; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(219);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);


let github = {
	async getDirListOfFiles (path, fileHierarchy, owner, repo, ref) {
		let gitURL = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
		if (ref) {
			gitURL += `?ref=${ref}`;
		}
		let response = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(gitURL);

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
		let response = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(gitURL);

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
		let response = await axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(`https://raw.githubusercontent.com/${owner}/${repo}/${ref}/${filePath}`,  {responseType: responseType,});
		return response.data;
	},
	authenticate(token) {
		return token;
	},
	changeURL(newURL) {
		return newURL;
	}
};

function setup (options, imports, register) {
	register (null, {
		github: github
	});
}


/***/ })

}]);