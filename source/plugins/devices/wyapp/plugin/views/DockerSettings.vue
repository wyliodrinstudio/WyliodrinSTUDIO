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

	 <!-- <v-checkbox
      v-model="interactive"
      label="Interactive conosole (-it)" 
    >
	</v-checkbox>

	<v-checkbox
      v-model="daemon"
      label="Detached (-d)" 
    >
	</v-checkbox> -->

	<v-row align="center">

		<v-col
		cols="12"
		sm="6"
		>
			<v-subheader v-text="'Process options'"></v-subheader>
		</v-col>

		<v-col 
		cols="12"
        sm="6">

			<v-select
				:items="processOptions"
				label="Process option"
				v-model="selectedOption"
				dense
				solo
				>
			</v-select>
		</v-col>
	</v-row>

	<v-checkbox
      v-model="remove"
      label="Remove Container at exit (--rm)" 
    >
	</v-checkbox>

	<v-row align="center">
		<v-col
		cols="12"
		sm="6"
		>
			<v-subheader v-text="'Restart options'"></v-subheader>
		</v-col>
	
		<v-col 
		cols="12"
        sm="6">

			<v-select
				:items="restartOptions"
				label="Restart option"
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
			<v-subheader v-text="'Network options'"></v-subheader>
		</v-col>

		<v-col 
		cols="12"
        sm="6">

			<v-select
				:items="networkOptions"
				label="Network option"
				v-model="selectedNetwork"
				dense
				solo
				>
			</v-select>
		</v-col>
	</v-row>

 <v-checkbox
      v-model="privileged"
      label="Privileged container (--privileged)" 
    >
	</v-checkbox>
	

	<br><br>
		<v-card-actions>
			<v-spacer></v-spacer>
			
			<v-btn text @click="close">{{$t('CLOSE')}}</v-btn>
			<v-btn text @click="send_options">Deploy</v-btn>
			<!-- de schimbat pt traduceri -->
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
				processOptions:[
					'detached',
					'interactive console',
				],
				selectedOption: null,
				remove: this.remove,
				restartOptions :[
					'no',
					'on-failure',
					'always',
					'unless-stopped',
				],
				selectedRestart: null,

				networkOptions:[
					'default',
					'host',
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