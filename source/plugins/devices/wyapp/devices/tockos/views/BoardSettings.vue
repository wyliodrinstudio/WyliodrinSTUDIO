<template>
	<v-card>
		<v-card-title>
			<span class="headline">{{$t('Board Settings')}} </span>
		</v-card-title>
		<v-card-text >
			<v-text-field
				dense
				label="Stack Size"
				v-model="boardSettings.stackSize"
			></v-text-field>
			<v-text-field
				dense
				label="APP Heap Size"
				v-model="boardSettings.appHeapSize"
			></v-text-field>
			<v-text-field
				dense
				label="Kernel Heap Size"
				v-model="boardSettings.kernelHeapSize"
			></v-text-field>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn text @click="select">{{$t('SELECT')}}</v-btn>
			<v-btn text @click="close">{{$t('CLOSE')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import makefileDefaultTemplate from 'raw-loader!../template/makefile_default.libtock-c';

export default {
	name: 'BoardSettings',
	props: ['boardSettings', 'project'],
	data () {
		return {
		};
	},
	methods: {
		async select ()
		{
			let makefile = await this.studio.projects.loadFile(this.project, 'Makefile.app');
			if (makefile === null) {
				makefile = makefileDefaultTemplate;
			} else {
				// convert buffer to string
				makefile = makefile.toString('utf8');
			}

			makefile = makefile.split(/\r?\n/);
			let newMakefile = [];
			let added = {
				stackSize: false,
				appHeapSize: false,
				kernelHeapSize: false
			};
			for (let line of makefile) {
				if (line.indexOf('STACK_SIZE') !== -1) {
					line = 'STACK_SIZE := ' + this.boardSettings.stackSize;
					added.stackSize = true;
				} else if (line.indexOf('APP_HEAP_SIZE') !== -1) {
					line = 'APP_HEAP_SIZE := ' + this.boardSettings.appHeapSize;
					added.appHeapSize = true;
				} else if (line.indexOf('KERNEL_HEAP_SIZE') !== -1) {
					line = 'KERNEL_HEAP_SIZE := ' + this.boardSettings.kernelHeapSize;
					added.kernelHeapSize = true;
				} else if (line.indexOf('# Include userland') !== -1) {
					if (!added.stackSize) {
						newMakefile.push('STACK_SIZE := ' + this.boardSettings.stackSize);
					}
					if (!added.appHeapSize) {
						newMakefile.push('APP_HEAP_SIZE := ' + this.boardSettings.appHeapSize);
					}
					if (!added.kernelHeapSize) {
						newMakefile.push('KERNEL_HEAP_SIZE := ' + this.boardSettings.kernelHeapSize);
					}
					if (!added.stackSize || !added.appHeapSize || !added.kernelHeapSize) {
						newMakefile.push('');
					}
				}

				newMakefile.push(line);
			}

			newMakefile = newMakefile.join('\r\n');
			await this.studio.projects.saveFile(this.project, 'Makefile.app', Buffer.from(newMakefile));

			this.$root.$emit ('submit', true);
		},
		close ()
		{
			this.$root.$emit ('submit', false);
		},
	}
};
</script>