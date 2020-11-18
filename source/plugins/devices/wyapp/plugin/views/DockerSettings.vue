<template>
	<v-card>
		<v-card-title>
			<span class="headline">{{$t('DEVICE_WYAPP_RUN_DEPLOY')}}</span> 
			<v-spacer></v-spacer>
		</v-card-title>
		<v-card-text>
			<v-layout wrap>
				<v-select
					class="col-md-6"
					:label="$t('DEVICE_WYAPP_PROCESS_OPTIONS')"
					:items="processOptions"
					item-text="title"
					item-value="value"
					v-model="selectedOption"
					>
				</v-select>
				<v-select
					:label="$t('DEVICE_WYAPP_RESTART_OPTIONS')"
					:items="restartOptions"
					item-text="title"
					item-value="value"
					v-model="selectedRestart"
					class="col-md-6"
					>
				</v-select>
				<v-checkbox
					v-model="remove"
					:label="$t('DEVICE_WYAPP_REMOVE_CONTAINER')" 
					class="col-md-12"
				/>
				<v-select
					:items="networkOptions"
					v-model="selectedNetwork"
					item-text="title"
					item-value="value"
					:label="$t('DEVICE_WYAPP_NETWORK_OPTIONS')"
					class="col-md-6"
					>
				</v-select>
				<v-checkbox
					v-model="privileged"
					:label="$t('DEVICE_WYAPP_PRIVILEGED_CONTAINER')" 
					class="col-md-6"
				/>
				<v-text-field            
					v-model="textInput"
					:label="$t('DEIVCE_WYAPP_ADDITIONAL_OPTIONS')"
					class="col-md-12"
				></v-text-field>
			</v-layout>
		</v-card-text>

	<!-- <v-row align="center">

		<v-col
		cols="12"
		sm="6"
		>
			<v-subheader v-text="$t('DEVICE_WYAPP_PROCESS_OPTIONS')"></v-subheader>
		</v-col>

		<v-col 
		cols="12"
        sm="6">

			<v-select
				:items="processOptions"
				v-model="selectedOption"
				dense
				solo
				>
			</v-select>
		</v-col>
	</v-row> -->

	

	<!-- <v-row align="center">
		<v-col
		cols="12"
		sm="6"
		>
			<v-subheader v-text="$t('DEVICE_WYAPP_RESTART_OPTIONS')"></v-subheader>
		</v-col>
	
		<v-col 
		cols="12"
        sm="6">

			
		</v-col>
	</v-row> -->

	<!-- <v-row align="center">

		<v-col
		cols="12"
		sm="6"
		>
			<v-subheader v-text="$t('DEVICE_WYAPP_NETWORK_OPTIONS')"></v-subheader>
		</v-col>

		<v-col 
		cols="12"
        sm="6">

			<v-select
				:items="networkOptions"
				v-model="selectedNetwork"
				dense
				solo
				>
			</v-select>
		</v-col>
	</v-row> -->

 

	


	

	<!-- <br><br> -->
		<v-card-actions>
			<v-spacer></v-spacer>
			
			<v-btn text @click="close">{{$t('CLOSE')}}</v-btn>
			<v-btn text @click="send_options">{{$t('DEVICE_WYAPP_DEPLOY')}}</v-btn>
			<!-- de schimbat pt traduceri -->
		</v-card-actions>


</v-card>
</template>



<script>
import { mapGetters } from 'vuex';
let datas = null;

export default {
	name: 'DockerSettings',
	props: ['project'],
	data () {
		datas = {
			processOptions:[
				{
					title: this.$t('DEVICE_WYAPP_DETACHED') ,
					value: 'detached'
				},
				{
					title: this.$t('DEVICE_WYAPP_INTERACTIVE_CONSOLE') ,
					value: 'interactive'
				}
			],
			selectedOption: 'interactive',
			remove: true,
			restartOptions :[
				{
					title: this.$t('DEVICE_WYAPP_NO_RESTART'),
					value: 'no'
				},
				{
					title: this.$t('DEVICE_WYAPP_RESTART_ON_FAILURE'),
					value: 'on-failure',
				},
				{
					title: this.$t('DEVICE_WYAPP_RESTART_ALWAYS'),
					value: 'always'
				},
				{
					title: this.$t('DEVICE_WYAPP_RESTART_UNLESS_STOPPED'),
					value: 'unless-stopped'
				}
			],
			selectedRestart: 'no',

			networkOptions:[
				{
					title: this.$t('DEVICE_WYAPP_DEFAULT_NETWORK'),
					value: 'default'
				},
				{
					title: this.$t('DEVICE_WYAPP_HOST_NETWORK'),
					value: 'host'
				}
			],
			selectedNetwork: 'default',
			privileged: false,
			textInput:'',
		};			
		return datas;		
	},

	computed: {
		...mapGetters ({
			device: 'workspace/device',
		}),
	},

	async created ()
	{
		try {
			let data = await this.studio.projects.loadSpecialFile(this.project, 'docker.json');
			data = JSON.parse(data);
			this.selectedOption = data.selectedOption;
			this.selectedNetwork = data.selectedNetwork;
			this.selectedRestart = data.selectedRestart;
			this.remove = data.remove;
			this.privileged = data.privileged;
			
		} catch (error) {
			this.studio.workspace.warn ('error loading docker.json '+error.message);
		}
	},

	methods: {
		close ()
		{
			this.$root.$emit ('submit',false);
		},
		send_options ()
		{
			this.$root.$emit('submit', datas);
		}
	}
	
};
</script>