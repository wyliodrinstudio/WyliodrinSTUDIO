var fs = require('fs');
var array = fs.readFileSync('allVendors').toString().split(/\r?\n/);
// console.log(array);

let vendors = {};
let currentVendor = null;


for(var i=0; i<array.length; i++)
{
	array[i] = array[i].split(/ (.*)/);
	// console.log(array[i][0]);
	if (array[i].length > 0)
	{
		if (array[i][0][0] !== '\t')
		{
			vendors[array[i][0].toString (16)] = {
				name: array[i][1],
				products: {}
			};
			currentVendor = vendors[array[i][0]];
		}
		else
		{
			array[i][0] = array[i][0].substring (1);
			currentVendor.products[array[i][0].toString (16)] = array[i][1];
		}
	}
}


// console.log(array);
// console.log (JSON.stringify (vendors, null, 3));
fs.writeFileSync('devices.json', (JSON.stringify (vendors, null, 3)));