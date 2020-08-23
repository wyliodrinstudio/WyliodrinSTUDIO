var replacer = require('./replacer');

var textCache = {
	default: `$the_cow = <<"EOC";
        $thoughts   ^__^
         $thoughts  ($eyes)\\_______
            (__)\\       )\\/\\
             $tongue ||----w |
                ||     ||
EOC
`
};

exports.get = function (cow) {
	var text = textCache[cow];

	return function (options) {
		return replacer(text, options);
	};
};
