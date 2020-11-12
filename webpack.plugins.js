const fs = require ('fs-extra');
const path = require ('path');

let plugins = [];
let latestTarget = '';
let dataItems = [];

module.exports.loadPlugins = (target) =>
{
	function loadPluginsFolder (folder) {
		let localFolder = path.join (__dirname,'source', 'plugins', folder);
		let allPlugins = fs.readdirSync(localFolder).filter (file => file !== '.' && file !== '..' && fs.statSync (path.join (localFolder, file)).isDirectory());

		for(let plugin of allPlugins)
		{
			let file_package_json = path.join (localFolder, plugin, 'package.json');
			if (fs.existsSync (file_package_json))
			{
				let package_json = require(file_package_json);
				if (package_json.name !== plugin)
				{
					console.log ('  plugin '+folder+':'+plugin+' has wrong name, rename to '+plugin);
					package_json.name = plugin;
				}
				if (package_json.plugin.target.indexOf (target) >=0)
				{
					if (!package_json.plugin.disabled)
					{
						plugins.push ({
							folder: folder,
							name: package_json.name,
							main: package_json.main,
							consumes: package_json.plugin.consumes,
							provides: package_json.plugin.provides
						});

						let listData = (folder) => {
							let localFolder = path.join (__dirname, 'source', 'plugins', folder);
							let items = fs.readdirSync (localFolder);
							for (let item of items) {
								let folderItem = folder+'/'+item;
								if (fs.lstatSync (path.join (localFolder, item)).isDirectory()) listData (folderItem);
								else dataItems.push (folderItem.replace (/\\/g, '/'));
							}
						};
		
						let dataFolder = path.join (folder, plugin, 'data');
		
						try
						{
							if (fs.lstatSync(path.join (__dirname, 'source', 'plugins', dataFolder)).isDirectory()) listData (dataFolder);
						}
						catch (e)
						{
							
						}
					}
				}
			}
			else
			{
				loadPluginsFolder (path.join (folder, plugin).replace (/\\/g, '/'));
			}
		}
	}

	if (target !== latestTarget)
	{
		console.log ('Fixing monaco (vue-monaco imports it two times)');
		fs.removeSync ('./node_modules/vue-monaco/node_modules');
		latestTarget = target;
		plugins = [];
		loadPluginsFolder ('');
	}

	return {
		plugins,
		dataItems
	};
};