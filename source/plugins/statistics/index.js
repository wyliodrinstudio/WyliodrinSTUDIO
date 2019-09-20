// export function setup(options, imports, register) {

// 	imports.hooks.addPreHook('projects', 'createEmptyProject', (...args) => {
	
// 		var da = true;
// 		if (da) {
// 			let r = {
// 				abort: false,
// 				args: ['Teona is here', 'nodejs'],
// 				ret: null
// 			};
// 			return r;
// 		} else return null;
// 	});

// 	imports.hooks.addPostHook('projects', 'createEmptyProject', async(res) => {
// 		let res2 = await res;
// 		console.log(res);
// 		return res2;
// 	});

// 	register(null, {});
// }
