<template>
<v-card>

	<v-card-title>
			<span class="headline">{{$t('DEVICE_WYAPP_RUN_DEPLOY')}}</span> 
			<v-spacer></v-spacer>
		</v-card-title>

	<v-row align="center">

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
	</v-row>

	<v-checkbox
      v-model="remove"
      :label="$t('DEVICE_WYAPP_REMOVE_CONTAINER')" 
    >
	</v-checkbox>

	<v-row align="center">
		<v-col
		cols="12"
		sm="6"
		>
			<v-subheader v-text="$t('DEVICE_WYAPP_RESTART_OPTIONS')"></v-subheader>
		</v-col>
	
		<v-col 
		cols="12"
        sm="6">

			<v-select
				:items="restartOptions"
				v-model="selectedRestart"
				dense
				solo
				>
			</v-select>
		</v-col>
	</v-row>

	<v-row align="center">

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
	</v-row>

 <v-checkbox
      v-model="privileged"
      :label="$t('DEVICE_WYAPP_PRIVILEGED_CONTAINER')" 
    >
	</v-checkbox>

	<v-text-field            
            solo
			v-model="textInput"
			:label="$t('DEIVCE_WYAPP_ADDITIONAL_OPTIONS')"
			></v-text-field>


	

	<br><br>
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
			this.$t('DEIVCE_WYAPP_DETACHED') ,
			this.$t('DEVICE_WYAPP_INTERACTIVE_CONSOLE') ,
		],
		selectedOption: null,
		remove: this.remove,
		restartOptions :[
			this.$t('DEVICE_WYAPP_NO_RESTART'),
			this.$t('DEVICE_WYAPP_RESTART_ON_FAILURE'),
			this.$t('DEVICE_WYAPP_RESTART_ALWAYS'),
			this.$t('DEVICE_WYAPP_RESTART_UNLESS_STOPPED'),
		],
		selectedRestart: null,

		networkOptions:[
			this.$t('DEVICE_WYAPP_DEFAULT_NETWORK'),
			this.$t('DEVICE_WYAPP_HOST_NETWORK'),
		],
		selectedNetwork: null,
		privileged:this.privileged,
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
			console.log('file loaded');
			data = JSON.parse(data);
			this.selectedOption = data.selectedOption;
			this.selectedNetwork = data.selectedNetwork;
			this.selectedRestart = data.selectedRestart;
			this.remove = data.remove;
			this.privileged = data.privileged;
			
		} catch (error) {
			this.selectedOption = this.$t('DEVICE_WYAPP_INTERACTIVE_CONSOLE')
			this.selectedRestart = this.$t('DEVICE_WYAPP_NO_RESTART');
			this.selectedNetwork = 'default';
			this.remove = true;
			console.log(error);
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
	
}
</script>