<template>
	<v-card>
		<v-card-title>
			<span class="headline">{{$t('App Board Settings')}} </span>
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
			<v-select v-model = "flashOption" :items="flashingOptions" label="Select Flashing Method">
			</v-select>
			<v-select return-object v-model = "board" :items="boards.tockloader" item-text = "name" label="Select Board" v-if="flashOption === 'Tockloader'">
			</v-select>
			<v-flex v-else-if="flashOption === 'Single Binary'">
				<v-select return-object v-model = "board" :items="boards.singleBinary" item-text = "name" label="Select Board">
				</v-select>
				<v-select return-object v-model = "kernelVersion" :items="board.compatibleReleases" item-text = "name" label="Select Tock Release Version">
				</v-select>
			</v-flex>	
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn text @click="select">{{$t('SELECT')}}</v-btn>
			<v-btn text @click="close">{{$t('CLOSE')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import axios from 'axios';
import makefileDefaultTemplate from 'raw-loader!../template/makefile_default.libtock-c';
import BOARDS from './boards.json';

export default {
	name: 'BoardSettings',
	props: ['project'],
	data () {
		return {
			flashingOptions: ['Tockloader', 'Single Binary'],
			flashOption: undefined,
			boards: BOARDS,
			board: undefined,
			kernelVersion: undefined,
			boardSettings: {
				stackSize: 2048,
				appHeapSize: 1024,
				kernelHeapSize: 1024
			}
		};
	},
	created: async function () {
		function extractNumber(line) {
			let value = (/(.*=\s*)(.*)/g).exec(line);

			if (value.length > 2) {
				value = value[2];
				if (value !== '') {
					return Number(value);
				}
			}

			return null;
		}

		let AppBoardSettings = await this.studio.projects.loadSpecialFile(this.project, 'app_board_settings.json');

		if (AppBoardSettings === null) {
			let makefile = await this.studio.projects.loadFile(this.project, 'Makefile.app');
			if (makefile !== null) {
				makefile = makefile.toString('utf8').split(/\r?\n/);
				for (let line of makefile) {
					if (line.indexOf('STACK_SIZE') !== -1) {
						let value = extractNumber(line);
						if (value !== null)
							this.boardSettings.stackSize = value;
					} else if (line.indexOf('APP_HEAP_SIZE') !== -1) {
						let value = extractNumber(line);
						if (value !== null)
							this.boardSettings.appHeapSize = value;
					} else if (line.indexOf('KERNEL_HEAP_SIZE') !== -1) {
						let value = extractNumber(line);
						if (value !== null)
							this.boardSettings.kernelHeapSize = value;
					} 
				}
			}	
		} else {
			AppBoardSettings = JSON.parse(AppBoardSettings);
			this.boardSettings = AppBoardSettings.boardSettings;
			this.board = AppBoardSettings.board;
			this.flashOption = AppBoardSettings.flashOption;
			if (this.flashOption === 'Single Binary')
				this.kernelVersion = AppBoardSettings.kernelVersion;
		} 
	},
	methods: {
		async select ()
		{
			await this.generateAppMakefile();

			await this.generateUploadSH();

			if (this.flashOption === 'Single Binary')
				await this.updateGitPrepare();

			await this.studio.projects.saveSpecialFile(this.project, 'app_board_settings.json', Buffer.from(JSON.stringify({
				boardSettings: this.boardSettings,
				board: this.board,
				flashOption: this.flashOption,
				kernelVersion: this.kernelVersion
			})));

			this.$root.$emit ('submit', true);
		},
		async generateAppMakefile () {
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
			newMakefile.splice(1, 0, `PACKAGE_NAME="${this.project.name}"`);
			newMakefile = newMakefile.join('\r\n');
			await this.studio.projects.saveFile(this.project, 'Makefile.app', Buffer.from(newMakefile));
		},
		async generateUploadSH () {
			let uploadSH = '# DO NOT MODIFY this file will be generated AUTOMATICALLY\n\n';
			
			if (this.flashOption === 'Tockloader') {
				const {board, jtagSoftware} = this.board;

				if (jtagSoftware !== null) {
					uploadSH += `tockloader install ~/libtock-c/examples/studio/build/${this.project.name}.tab --${jtagSoftware} --board ${board}\n`;
				} else {
					uploadSH += `tockloader install ~/libtock-c/examples/studio/build/${this.project.name}.tab\n`;
				}
			} else if (this.flashOption === 'Single Binary') {
				const {board} = this.board;

				this.generateKernelMakefile();

				uploadSH += `cp Makefile.kernel ~/tock/boards/${board}/Makefile.kernel\n`;
				uploadSH += `cd ~/tock/boards/${board} && make -f Makefile.kernel\n`;
				uploadSH += `cd ~/tock/boards/${board} && make -f Makefile.kernel program\n`;
			}

			await this.studio.projects.saveFile(this.project, '.project/upload.sh', Buffer.from(uploadSH));
		},
		async generateKernelMakefile () {
			let kernelMakefile = await this.downloadBoardFile(this.board, 'Makefile');
			kernelMakefile = kernelMakefile.split(/\r?\n/);

			let writeIdx = undefined;
			for (let line of kernelMakefile) {
				if ((/.*:.*program/).exec(line) !== null) {
					writeIdx = kernelMakefile.indexOf(line);
				}
			}
			if (writeIdx) {
				const {architecture} = this.board;

				kernelMakefile = kernelMakefile.slice(0,writeIdx);
				kernelMakefile.push(`APP=$(TOCK_ROOT_DIRECTORY)/../libtock-c/examples/studio/build/${architecture}/${architecture}.tbf`);
				kernelMakefile.push('KERNEL=$(TOCK_ROOT_DIRECTORY)/target/$(TARGET)/debug/$(PLATFORM).elf');
				kernelMakefile.push('KERNEL_WITH_APP=$(TOCK_ROOT_DIRECTORY)/target/$(TARGET)/debug/$(PLATFORM)-app.elf\r\n');
				kernelMakefile.push('.PHONY: program');
				kernelMakefile.push('program: $(TOCK_ROOT_DIRECTORY)target/$(TARGET)/debug/$(PLATFORM).elf');
				kernelMakefile.push('	arm-none-eabi-objcopy --update-section .apps=$(APP) $(KERNEL) $(KERNEL_WITH_APP)');
				kernelMakefile.push('	$(OPENOCD) $(OPENOCD_OPTIONS) -c "init; reset halt; flash write_image erase $(KERNEL_WITH_APP); verify_image $(KERNEL_WITH_APP); reset; shutdown"');
			}

			kernelMakefile = kernelMakefile.join('\r\n');
			await this.studio.projects.saveFile(this.project, 'Makefile.kernel', Buffer.from(kernelMakefile));
		},
		async downloadBoardFile ({board}, filename) {
			let response = await axios.get (`https://raw.githubusercontent.com/tock/tock/master/boards/${board}/${filename}`);
			return response.data;
		},
		async updateGitPrepare () {
			let gitPrepare = Buffer.from(await this.studio.projects.loadFile(this.project, '.project/gitPrepare.sh')).toString();
			gitPrepare += 'cd $TOCK_KERNEL_DIR && git reset --hard\n';
			gitPrepare += 'cd $TOCK_KERNEL_DIR && git clean -f -d\n';
			gitPrepare += `cd $TOCK_KERNEL_DIR && git checkout ${this.kernelVersion.tag}\n`;

			await this.studio.projects.saveFile(this.project, '.project/gitPrepare.sh', Buffer.from(gitPrepare));
		},
		close ()
		{
			this.$root.$emit ('submit', false);
		},
	}
};
</script>
