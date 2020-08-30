/* eslint no-console: ["warn", { allow: ["warn", "error"] }] */
import Dexie from 'dexie';
import EventEmitter from 'events';
import axios from 'axios';

let events = new EventEmitter();

var db = new Dexie('FileSystemDataBase');
import $ from 'jquery';



/** Check if storage is persisted already.
  @returns {Promise<boolean>} Promise resolved with true if current origin is
  using persistent storage, false if not, and undefined if the API is not
  present.
*/
async function isStoragePersisted() {
	return await navigator.storage && navigator.storage.persisted ?
		navigator.storage.persisted() :
		undefined;
}

/** Tries to convert to persisted storage.
  @returns {Promise<boolean>} Promise resolved with true if successfully
  persisted the storage, false if not, and undefined if the API is not present.
*/
async function persist() {
	return await navigator.storage && navigator.storage.persist ?
		navigator.storage.persist() :
		undefined;
}

/** Queries available disk quota.
  @see https://developer.mozilla.org/en-US/docs/Web/API/StorageEstimate
  @returns {Promise<{quota: number, usage: number}>} Promise resolved with
  {quota: number, usage: number} or undefined.
*/
// async function showEstimatedQuota() {
// 	return await navigator.storage && navigator.storage.estimate ?
// 		navigator.storage.estimate() :
// 		undefined;
// }

/** Tries to persist storage without ever prompting user.
  @returns {Promise<string>}
	"never" In case persisting is not ever possible. Caller don't bother
	  asking user for permission.
	"prompt" In case persisting would be possible if prompting user first.
	"persisted" In case this call successfully silently persisted the storage,
	  or if it was already persisted.
*/
async function tryPersistWithoutPromtingUser() {
	if (!navigator.storage || !navigator.storage.persisted) {
		return 'never';
	}
	let persisted = await isStoragePersisted();
	if (persisted) {
		return 'persisted';
	}
	if (!navigator.permissions || !navigator.permissions.query) {
		return 'prompt'; // It MAY be successful to prompt. Don't know.
	}
	const permission = await navigator.permissions.query({
		name: 'persistent-storage'
	});
	if (permission.state === 'granted') {
		persisted = await navigator.storage.persist();
		if (persisted) {
			return 'persisted';
		} else {
			return 'notavailable';
		}
	}
	if (permission.state === 'prompt') {
		return 'prompt';
	}
	return 'never';
}

async function initStoragePersistence() {
	const persist = await tryPersistWithoutPromtingUser();
	switch (persist) {
		case 'never':
			console.warn('Not possible to persist storage');
			break;
		case 'persisted':
			// console.log('Successfully persisted storage silently');
			break;
		case 'prompt':
			console.warn('Not persisted, but we may prompt user when we want to.');
			break;
	}
}


let web_filesystem = {
	_importData: null,
	async getUserFolder() {
		await this.mkdirp('/user');
		return '/user';
	},

	async getTemporaryFolder() {
		await this.mkdirp('/tmp');
		return '/tmp';
	},

	async getSettingsFolder() {
		await this.mkdirp('/settings');
		return '/settings';
	},

	async insertElementFiles(name, type, parentId) {
		let obj = {
			name: name,
			type: type,
			parent: parentId
		};
		try {
			await db.files.add(obj);
		} catch (e) {
			//TODO
		}
	},



	async insertElementData(fileId, data, size)
	{
		let obj = {
			fileId: fileId,
			data: data,
			size: size
		};
		try {
			let possibleEntry = (await db.data.where({ 'fileId': fileId }).toArray())[0];
			if (possibleEntry)
				await db.data.update(possibleEntry.id, obj);
			else await db.data.put(obj);
		} catch (e) {
			//TODO
		}
	},

	async getLastParentId(paths, create, throwable = true) {
		let parentId = 0;
		let current = paths[0];
		if (!current && throwable)
			throw new Error('Name cannot be an empty string');
		for (let i = 0; i < paths.length - 1; i++)
		{
			current = paths[i];
			if (!current && throwable)
				throw new Error('Name cannot be an empty string');
			try {
				let currentFolder = (await db.files.where('[name+parent]').equals([current, parentId]).toArray())[0];
				if (!currentFolder) {
					if (create) {
						await this.insertElementFiles(current, 0, parentId);
						currentFolder = (await db.files.where({ name: current }).toArray())[0];
					}
					else {
						throw new Error('No such file or directory! ' + paths.join('/'));
					}
				}
				if (!currentFolder.type) {
					parentId = currentFolder.id;
				}
				else {
					parentId = -1;
					break;
				}
			}
			catch (e) {
				// console.error("Web DataBase: " + e.message);
				return -1;
			}
		}
		return parentId;

	},

	// path
	async isFile(path) {
		if (path.startsWith('/'))
			path = path.substring(1);
		let paths = path.split('/');
		let parentId = await this.getLastParentId(paths, 0, false);
		if (parentId != -1) {
			let file = await db.files.where(['name+parent']).equals([paths[paths.length - 1], parentId]).toArray();
			if (file[0]) {
				return file[0].type == 1;
			}
		}
	},

	// path
	async isDirectory(path) {
		if (path.startsWith('/'))
			path = path.substring(1);
		let paths = path.split('/');
		let parentId = await this.getLastParentId(paths, 0, false);
		if (parentId != -1)
		{
			let file = await db.files.where(['name+parent']).equals([paths[paths.length - 1], parentId]).toArray();
			if (file[0]) {
				return file[0].type == 0;
			}
		}
	},

	// path
	async getSize(path) {
		if (path.startsWith('/'))
			path = path.substring(1);
		let paths = path.split('/');
		let parentId = await this.getLastParentId(paths, 0, false);
		if (parentId != -1)
		{
			let file = await db.files.where(['name+parent']).equals([paths[paths.length - 1], parentId]).toArray();
			if (file[0] && file[0].type) {
				return file[0].size;
			}
		}
	},

	// path
	async readdir(path) {
		if (path.startsWith('/'))
			path = path.substring(1);
		let paths = path.trim().split('/');
		if (path.endsWith('/'))
			paths.pop();
		let parentId;
		try {
			parentId = await this.getLastParentId(paths, 0, false);
		} catch (e) {
			console.error(e.message);
		}
		let children = [];
		if (parentId != -1) {
			let file = await db.files.where(['name+parent']).equals([paths[paths.length - 1], parentId]).toArray();
			if (file[0]) {
				let names = await db.files.where({ 'parent': file[0].id }).toArray();
				children = names.map((query) => {
					return query.name;
				});
			}
		}
		return children;
	},

	// src, dest
	async copy(src, dest) {
		if (src.startsWith('/'))
			src = src.substring(1);
		if (dest.startsWith('/'))
			dest = dest.substring(1);
		let pathsSrc = src.split('/');
		let pathsDst = dest.split('/');
		let parentSrc;
		let parentDst;
		try {
			parentSrc = await this.getLastParentId(pathsSrc, 0);
			parentDst = await this.getLastParentId(pathsDst, 1);
		} catch (e) {
			console.error(e.message);
		}
		let fileSrc = (await db.files.where(['name+parent']).equals([pathsSrc[pathsSrc.length - 1], parentSrc]).toArray())[0];
		if (fileSrc) {
			if (await this.isFile(src)) {
				let fileDest = (await db.files.where(['name+parent']).equals([pathsDst[pathsDst.length - 1], parentDst]).toArray())[0];
				let dataSrc = await db.data.where({ fileId: fileSrc[0].id }).toArray();
				if (fileDest[0]) {
					await db.data.put(fileDest[0].id, { data: dataSrc[0].data.toString('base64'), size: dataSrc[0].data.length });
				} else {
					try {
						await db.files.add({ name: pathsDst[pathsDst.length - 1], type: 1, parent: parentDst });
						let currentId = (await db.files.where(['name+type+parent']).equals([pathsDst[pathsDst.length - 1], 1, parentDst]).toArray())[0];
						await db.data.add({ fileId: currentId.id, data: dataSrc[0].data, size: dataSrc[0].size });
					} catch (e) {
						//TODO
					}
				}
			} else {
				let pathUntilSrc = src.substr(0, src.lastIndexOf('/'));
				let pathUntilDest = dest.substr(0, dest.lastIndexOf('/'));
				let copyDirectory = async (pathUntilSrc, pathUntilDest, fileSrc, destName, parentDest) => {
					pathUntilSrc += '/' + fileSrc.name;
					pathUntilDest += '/' + destName;
					await this.mkdirp(pathUntilDest);
					let children = await this.readdir(pathUntilSrc);
					let parentSrc = fileSrc.id;
					try {
						parentDest = await this.getLastParentId(pathUntilDest, 0);
					} catch (e) {
						console.error(e.message);
					}
		
					// parentDest = await this.getLastParentId(pathUntilDest, 0);
					let child = 0;
					for (child = 0; child < children.length; child++) {
						let currentName = pathUntilSrc + '/' + children[child];
						let currentNameDest = pathUntilDest + '/' + children[child];
						await this.mkdirp(pathUntilDest);
						if (await this.isFile(currentName)) {
							try {
								parentDest = await this.getLastParentId(currentNameDest.split('/'), 0);
							} catch (e) {
								console.error(e.message);
							}
							let fileToBeAdded = (await db.files.where(['name+parent']).equals([children[child], parentSrc]).toArray())[0];
							let fileDataToBeAdded = (await db.data.where({ fileId: fileToBeAdded.id }).toArray())[0];
							try {
								await this.insertElementFiles(children[child], 1, parentDest);
								let newEntry = (await db.files.where(['name+parent']).equals([children[child], parentDest]).toArray())[0];
								await this.insertElementData(newEntry.id, fileDataToBeAdded.data, fileDataToBeAdded.size);
							} catch (e) {
								//TODO
							}
						}
						if (await this.isDirectory(currentName)) {
							let newSrc = (await db.files.where(['name+parent']).equals([children[child], parentSrc]).toArray())[0];
							await this.mkdirp(pathUntilDest + '/' + children[child]);
							await copyDirectory(pathUntilSrc, pathUntilDest, newSrc, children[child], parentDst);
						}
					}
				};
				await copyDirectory(pathUntilSrc, pathUntilDest, fileSrc, pathsDst[pathsDst.length - 1], parentSrc);
			}


		}
	},

	// path
	async readFile(path) {
		if (path.startsWith('/'))
			path = path.substring(1);
		let paths = path.split('/');
		try {
			
			let parentId;
			try {
				parentId = await this.getLastParentId(paths, 0);
			} catch (e) {
				console.error(e.message);
			}
			let file = (await db.files.where(['name+parent']).equals([paths[paths.length - 1], parentId]).toArray())[0];
			if (!file)
				throw new Error('File not found');

			let fileToRead = (await db.data.where({ fileId: file.id }).toArray())[0];
			return Buffer.from(fileToRead.data, 'base64');
		}
		catch (e) {
			return null;
		}
	},

	async remove(path) {
		if (path.startsWith('/'))
			path = path.substring(1);
		let paths = path.split('/');
		let parent;
		try {
			parent = await this.getLastParentId(paths, 0, false);
		} catch (e) {
			console.error(e.message);
		}
		let lastElement = (await db.files.where(['name+parent']).equals([paths[paths.length - 1], parent]).toArray())[0];
		if (await this.isFile(path)) {
			await db.files.delete(lastElement.id);
			let dataInfo = (await db.data.where({ fileId: lastElement.id }).toArray())[0];
			await db.data.delete(dataInfo.id);
		} else {
			let pathUntil = path.substr(0, path.lastIndexOf('/'));
			let removeDirectory = async (lastElement, pathUntil) => {
				pathUntil = pathUntil + '/' + lastElement.name;
				let children = await this.readdir(pathUntil);
				let parentId = lastElement.id;
				let child = 0;
				for (child = 0; child < children.length; child++) {
					let currentName = pathUntil + '/' + children[child];
					if (await this.isFile(currentName)) {
						let fileEntry = (await db.files.where(['name+parent']).equals([children[child], parentId]).toArray())[0];
						await db.files.delete(fileEntry.id);
						let dataEntry = (await db.data.where({ fileId: fileEntry.id }).toArray())[0];
						await db.data.delete(dataEntry.id);
					}
					if (await this.isDirectory(currentName)) {
						let newChild = (await db.files.where(['name+parent']).equals([children[child], parentId]).toArray())[0];
						await removeDirectory(newChild, pathUntil);
					}
				}

				if (child == children.length) {
					await db.files.delete(lastElement.id);
				}
			};
			await removeDirectory(lastElement, pathUntil);
		}
	},

	// src, dest
	async rename(src, dest) {
		if (src.startsWith('/'))
			src = src.substring(1);
		if (dest.startsWith('/'))
			dest = dest.substring(1);
		let pathSrc = src.split('/');
		let pathDst = dest.split('/');
		let srcParent;
		let dstParent;

		try {
			srcParent = await this.getLastParentId(pathSrc, 0);
			dstParent = await this.getLastParentId(pathDst, 0);
		} catch (e) {
			console.error (e.message);
		} 

		let obj = await db.files.where(['name+parent']).equals([pathSrc[pathSrc.length - 1], srcParent]).toArray();
		let destDir = await this.readdir(dest);
		if (!destDir.includes(pathDst[pathDst.length - 1])) {
			await db.files.put({ name: pathDst[pathDst.length - 1], type: obj[0].type, parent: dstParent, id: obj[0].id });
		}
	},

	// path
	async pathExists(path) {
		if (path.startsWith('/'))
			path = path.substring(1);
		let paths = path.split('/');
		let lastId = 0;
		for (let i = 0; i < paths.length; i++) {
			let current = paths[i];
			let obj = (await db.files.where(['name+parent']).equals([current, lastId]).toArray())[0];
			if (!obj) {
				return false;
			} else if (obj && obj.parent != lastId) {
				return false;
			}
			lastId = obj.id;
		}
		return true;
	},

	// path
	async mkdirp(path) {
		if (path.startsWith('/'))
			path = path.substring(1);
		let paths = path.split('/');
		if (path.endsWith('/'))
			paths.pop();
		
		let parentId;
		try {
			parentId = await this.getLastParentId(paths, 1);
		} catch (e) {
			console.error(e.message);
			return null;
		}
		
		await this.insertElementFiles(paths[paths.length - 1], 0, parentId);
	},

	// path, buffer
	async writeFile(path, buffer) {
		if (typeof buffer !== 'object') buffer = Buffer.from(buffer);
		if (path.startsWith('/'))
			path = path.substring(1);
		let paths = path.split('/');	
		if (path.endsWith('/'))
			paths.pop();
		
		let parentId;
		try {
			parentId = await this.getLastParentId(paths, 1);
		} catch (e) {
			console.error(e.message);
			return null;
		}
		if (parentId == -1)
			throw new Error('No such file or folder ' + this.writeFileVar);
		await this.insertElementFiles(paths[paths.length - 1], 1, parentId);
		let objIns = await db.files.where(['name+type+parent']).equals([paths[paths.length - 1], 1, parentId]).toArray();
		await this.insertElementData(objIns[0].id, buffer.toString('base64'), buffer.length);
	},

	lastModified(/* path */) {
		//TODO
		return false;
	},
	openExportDialog(data, options = {}) {
		//data to take from options - type
		let element = document.createElement('a');
		element.setAttribute('href', 'data:'+options.type+';base64,' + data.toString('base64'));
		element.setAttribute('download', options.filename);

		element.style.display = 'none';
		document.body.appendChild(element);

		element.click();

		document.body.removeChild(element);
		return null;
	},
	openImportDialog(options = {}) {
		// this._importData = null;
		this._registerLoadInput(options.filetypes || []);
		events.removeAllListeners();
		$('#importFile').trigger('click');
		$('body').one('focus', '*', function (e) {
			setTimeout(() => {
				// on change sghould fire first, so this should not fire if there is a file selected
				events.emit('load', new Error('ENODATA'));
			}, 20000);
			e.stopPropagation();
		});
		return new Promise((resolve/*, reject*/) => {
			events.once('load', (error, list) => {
				console.log(error);
				if (error) resolve([]);
				else resolve(list);
			});
		});
	},
	readImportFile(f) {
		return new Promise((resolve, reject) => {
			var reader = new FileReader();
			reader.onload = function (e) {
				resolve(Buffer.from(e.target.result));
			};
			reader.onerror = function () {
				reject(new Error('ENOENT'));
			};
			reader.readAsArrayBuffer(f);
		});
	},
	_registerLoadInput(filetypes = []) {
		// TODO verify filetypes
		let accept = filetypes.join('|');
		$('#importFile').off().remove();
		$('body').append('<input type="file" id="importFile" name="importFile" style="display: none;" accept="' + accept + '">');
		$('#importFile').on('change', e => {
			let list = [];
			for (let f of e.target.files) {
				list.push(f);
			}
			events.emit('load', null, list);
		});
	},

	/**
	 * Import a file from the data folder
	 * @param {string} pluginName 
	 * @param {string} filename 
	 */
	async loadDataFile (pluginName, filename)
	{
		return Buffer.from ((await axios.request ({url: 'plugins/'+pluginName+'/data/'+filename, responseType: 'arraybuffer', method: 'get'})).data);
	},

	/**
	 * Is the filesystem persistent?
	 */
	isPersistent ()
	{
		return tryPersistWithoutPromtingUser ();
	},

	/**
	 * Make the filesystem persistent (for web usually)
	 */
	setPersistent ()
	{
		return persist ();
	}

};
export default async function setup(options, imports, register) {
	
	await initStoragePersistence ();


	db.version(1).stores({
		files: '++id,*name,type,*parent,&[name+parent],&[name+type+parent],&[id+parent]',
		data: '++id,&fileId,data,size'
	});
	db.open();

	register(null, {
		filesystem: web_filesystem
	});
}