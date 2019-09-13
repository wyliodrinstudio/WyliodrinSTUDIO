let studio = null;

let documentation = {};

export default function setup (options, imports, register)
{
	studio = imports;

	studio.workspace.registerMenuItem ('DOCUMENTATION', 10, () => {
		studio.system.openLink('https://wyliodrinstudio.readthedocs.io/en/latest/');
	});

	register (null, {
		documentation: documentation
	});
}
