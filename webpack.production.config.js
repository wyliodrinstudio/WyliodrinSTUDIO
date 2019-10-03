let config = require ('./webpack.config.js')({
	TRACKING_APP_KEY: ''
});

config.mode = 'production';

module.exports = config;