import os from '../../../../../../node_modules/os';
var ifaces = os.networkInterfaces();

Object.keys(ifaces).forEach(function (ifname) {
	var alias = 0;

	ifaces[ifname].forEach(function (iface) {
		if ('IPv4' !== iface.family || iface.internal !== false) {
			return;
		}

		if (ifname === 'eno1') {
			console.log(iface.address);
			return iface.address;
		}
		++alias;
	});
});