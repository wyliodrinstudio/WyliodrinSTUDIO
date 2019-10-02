var replacer = require('./replacer');

var textCache = {
	default: require ('raw-loader!./default.cow').default
};

exports.get = function (cow) {
	var text = textCache[cow];

	return function (options) {
		return replacer(text, options);
	};
};
