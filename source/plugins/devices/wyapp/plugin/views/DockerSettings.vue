<template>
<v-card
	class = "mx-auto"
	max-width="344"
	outlined>

	<v-card-title>
			<span class="headline">{{$t('DEVICE_WYAPP_RUN_DEPLOY')}}</span> 
			<!-- de trecut in traduceri -->
			<v-spacer></v-spacer>
		</v-card-title>

	 <v-checkbox
      v-model="interactive"
      label="Interactive conosole (-it)" 
    >
	</v-checkbox>

	<v-checkbox
      v-model="daemon"
      label="Detached (-d)" 
    >
	</v-checkbox>

	<v-checkbox
      v-model="remove"
      label="Remove Container at exit (--rm)" 
    >
	</v-checkbox>

 <v-select
      :items="restartOptions"
	  label="Restart option"
	  v-model="selectedRestart"
      dense
	  solo
    >
 </v-select>

 <v-select
      :items="networkOptions"
	  label="Network option"
	  v-model="selectedNetwork"
      dense
	  solo
    >
 </v-select>

 <v-checkbox
      v-model="privileged"
      label="Privileged container (--privileged)" 
    >
	</v-checkbox>
	

	<br><br>
		<v-card-actions>
			<v-spacer></v-spacer>
			
			<v-btn text @click="close">Close</v-btn>
			<v-btn text @click="send_options">Send</v-btn>
		</v-card-actions>


</v-card>
</template>



<script>
import { mapGetters } from 'vuex';
let datas = null;
export default {
	name: 'DockerSettings',
	props: ['connection'],

	data () {

				datas = {
				interactive: true,
				daemon: this.daemon,
				remove: this.remove,
				restartOptions :[
					'no',
					'on-failure',
					'always',
					'unless-stopped',
				],
				selectedRestart: null,

				networkOptions:[
					'none',
					'bridge',
					'host',
					'container',
				],
				selectedNetwork: null,
				privileged:this.privileged,
			};
			return datas;
		
	},

	computed: {
		...mapGetters ({
			device: 'workspace/device',
		}),
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