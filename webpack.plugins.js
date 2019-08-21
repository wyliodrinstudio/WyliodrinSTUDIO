const fs = require ('fs-extra');

module.exports.loadPlugins = (target) =>
{
	let plugins = [];
	let allPlugins = fs.readdirSync('./source/plugins');

	for(let plugin of allPlugins)
	{
		let package_json = require('./source/plugins/'+ plugin + '/package.json');
		if (package_json.plugin.target.indexOf (target) >=0)
		{
			if (!package_json.plugin.disabled)
			{
				plugins.push ({
					name: package_json.name,
					main: package_json.main,
					consumes: package_json.plugin.consumes,
					provides: package_json.plugin.provides
				});
			}
		}
	}
	return plugins;
};