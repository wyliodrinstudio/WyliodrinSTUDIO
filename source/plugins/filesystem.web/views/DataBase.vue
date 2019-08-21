<template>
  <v-card class="library-box" style="overflow-y:auto">
    <v-card-title>
      <span class="headline"> Holla </span>
    </v-card-title>
    <v-card-text>
      <v-text-field :label="writeFileL" v-model="writeFileVar"> </v-text-field>
	  <v-text-field :label="writeFileDataL" v-model="writeFileDataVar"> </v-text-field>
	  <v-text-field :label="mkdirpL" v-model="mkdirpVar"> </v-text-field>
	  <v-text-field :label="isFileL" v-model="isFileVar"> </v-text-field>
	  <v-text-field :label="isDocumentL" v-model="isDocumentVar"> </v-text-field>
	  <v-text-field :label="getSizeL" v-model="getSizeVar"> </v-text-field>
	  <v-text-field :label="readdirL" v-model="readdirVar"> </v-text-field>
	  <v-text-field :label="copysrcL" v-model="copysrcVar"> </v-text-field>
	  <v-text-field :label="copydstL" v-model="copydstVar"> </v-text-field>
	  <v-text-field :label="pathExistsL" v-model="pathExistsVar"> </v-text-field>
	  <v-text-field :labdl="readFileL" v-model="readFileVar"> </v-text-field>
    </v-card-text>
    <v-card-actions>
    	<v-btn @click="writeFile"> writeFile </v-btn>
		<v-btn @click="mkdirp"> mkdirp </v-btn>
		<v-btn @click="isFile"> Is file? </v-btn>
		<v-btn @click="isDirectory"> Is directory? </v-btn>
		<v-btn @click="getSize"> getSize </v-btn>
		<v-btn @click="readdir"> readdir </v-btn>
		<v-btn @click="copy"> copy </v-btn>
		<v-btn @click="pathExists"> pathExists </v-btn>
		<v-btn @click="readFile"> readFile </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import Dexie from 'dexie';
var db = new Dexie("FileSystemDataBase");

export default {
	name: 'Database',
	data() {
		return {
			writeFileL: 'writeFile',
			writeFileVar: '',
			writeFileDataL: 'data forwriteFile',
			writeFileDataVar: '',
			mkdirpL: 'mkdirp',
			mkdirpVar: '',
			isFileL: 'isFile',
			isFileVar: '',
			isDocumentL: 'isDocument',
			isDocumentVar: '',
			getSizeL: 'getSize',
			getSizeVar: '',
			readdirL: 'readdir',
			readdirVar: '',
			copysrcL: 'copy-src',
			copydstL: 'copy-dst',
			copysrcVar: '',
			copydstVar: '',
			pathExistsL: 'pathExists',
			pathExistsVar: '',
			readFileL: 'readFile',
			readFileVar: ''
		}
	},
	created() {
		db.version(1).stores({
			files: "++id,*name,type,*parent",
			data: "&fileId,data,size"
		});
		db.open();
  	},
	methods: {
		// path
		async isFile()
		{

			let paths = this.isFileVar.split('/');
			let parentId = await this.getLastParentId(paths, 0);
			if (parentId != -1)
			{
				let file = await db.files.get({name: paths[paths.length - 1]});
				if (file)
				{
					console.log(file.type);
					return file.type == 1;
				}
			}
		},
		// path
		async isDirectory()
		{
			let paths = this.isDirectoryVar.split('/');
			let parentId = await this.getLastParentId(paths, 0);
			if (parentId != -1)
			{
				let file = await db.files.get({name: paths[paths.length - 1]});
				if (file)
				{
					console.log(file.type);
					return file.type == 0;
				}
			}
		},
		// file - path
		async getSize()
		{
			let paths = this.getSizeVar.split('/');
			let parentId = await this.getLastParentId(paths, 0);
			if (parentId != -1)
			{
				let file = await db.files.get({name: paths[paths.length - 1]});
				if (file && file.type)
				{
					return file.size;
				}
			}
		},
		// path
		async readdir()
		{
			let paths = this.readdirVar.trim().split('/');
			if (this.readdirVar.endsWith('/'))
				paths.pop();
			let parentId = await this.getLastParentId(paths, 0);
			if (parentId != -1)
			{
				let file = await db.files.get({name: paths[paths.length - 1]});
				let names = await db.files.where("parent").equals(file.id).toArray();
				let frd =  names.map((query) => {
					return query.name;
				});
			}
		},
		// src, dest
		async copy()
		{
			let pathsSrc = this.copysrcVar.split('/');
			let pathsDst = this.copydstVar.split('/');
			let parentSrc = this.getLastParentId(pathsSrc, 0);
			let parentDst = this.getLastParentId(pathsDst, 0);
			let fileSrc = await db.files.get({name: pathsSrc[pathsSrc.length - 1], parent: parentSrc});
			if (fileSrc) {
				let dataSrc = await db.data.get({fileId: fileSrc.id});
				let fileDst = await db.files.get({name: pathsDst[pathsDst.length - 1], parent: parentDst});
				if (fileDst) {
					await db.data.put(fileDst.id, {data: dataSrc.data.toString('base64'), size: dataSrc.data.length});
				} else {
					await db.files.add({name: pathsDst[pathsDst.length - 1], type: 1, parent: parentDst});
					let currentId = await db.files.get({name: pathsDst[pathsDst.length - 1], type: 1, parent: parentDst});
					await db.data.add({fileId: currentId.id, data: dataSrc.data, size: dataSrc.size});
				}
					
			}
				
		},
		// path
		async pathExists()
		{
			let paths = this.pathExistsVar.split('/');
			let parentId = 0;
			let lastId = 0;
			for (let i = 0; i < paths.length; i++) {
				let current = paths[i];
				let obj = await db.files.get({name: current});
				if (!obj) {
					console.log("pa");
					return false;
				} else if (obj && obj.parent != lastId) {
					console.log("pa");
					return false;
				}
				lastId = obj.id;
			}
			console.log("nu pa");
			return true;
		},
		// path
		async readFile()
		{
			try {
				let paths = this.readFileVar.split('/');
				let parentId = this.getLastParentId(paths, 0);
				let file = await db.files.get({name: paths[paths.length - 1]});
				console.log(file);
				if (!file)
					throw new Error("File not found");

				let fileToRead = await db.data.get(file.id);	
				return fileToRead.data;
			}
			catch (e) {
				console.error("Web DataBase: " + e.message);
				return null;
			}
			
		},

		async insertElementFiles(name, type, parentId)
		{
			let obj = {
				name: name,
				type: type,
				parent: parentId
			};
			console.log(obj);
			await db.files.add(obj);
			
		},
		async insertElementData(fileId, data, size)
		{
			let obj = {
				fileId: fileId, 
				data: data,
				size: size
			};
			console.log(obj);
			await db.data.add(obj);
		},
		async getLastParentId(paths, create) {
			let parentId = 0;
			let current = paths[0];
			for (let i = 0; i < paths.length - 1; i++)
			{
				current = paths[i];
				try {
					let currentFolder = await db.files.get({name: current});
					if (!currentFolder) {
						if (create)
						{
							await this.insertElementFiles(current, 0, parentId);
						}
						else 
						{
							throw new Error("No such file or directory! " + paths.join('/'));
						}
					}	
					if (!currentFolder.type)
					{
						parentId = currentFolder.id;
					} 
						else
					{
						parentId = -1;
						break;
					}
				}
				catch (e) {
					console.error("Web DataBase: " + e.message);
					return -1;
				}
			}
			return parentId;

		},

		// path
		async mkdirp() {
			let paths = this.mkdirpVar.split('/');
			console.log(paths);
			let parentId = await this.getLastParentId(paths, 1);
			console.log(parentId);
			await this.insertElementFiles(paths[paths.length - 1], 0, parentId);
		},
		// path, buffer
		async writeFile() {
			let paths = this.writeFileVar.split('/');
			let parentId = await this.getLastParentId(paths, 0);
			if (parentId == -1)
				throw new Error ("No such file or folder " + this.writeFileVar);
			await this.insertElementFiles(paths[paths.length - 1], 1, parentId);
			let objIns = await db.files.get({name: paths[paths.length - 1], type: 1, parent: parentId});
			console.log(objIns);
			await this.insertElementData(objIns.id, this.writeFileDataVar.toString('base64'), this.writeFileDataVar.length);
		}
  }
};
</script>




