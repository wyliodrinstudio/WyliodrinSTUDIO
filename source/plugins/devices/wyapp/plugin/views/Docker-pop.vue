<template>
	<v-card
	class = "mx-auto"
	max-width="344"
	outlined>

	<v-card-title>
			<span class="headline">{{$t('DEVICE_WYAPP_DEPLOY')}}</span> 
			<!-- de trecut in traduceri -->
			<v-spacer></v-spacer>
		</v-card-title>

	 <v-list-item three-line>
      <v-list-item-content>
       
        <v-list-item-title class="headline mb-1">Dockerfile non-existent</v-list-item-title>
        <v-list-item-subtitle>Would you like to use a predefined Dockerfile ?</v-list-item-subtitle>
      </v-list-item-content>

     
    </v-list-item>

    <v-card-actions>
      <v-btn text @click="send_file()">Yes</v-btn>
      <v-btn text @click="close" ref="button">No</v-btn>
    </v-card-actions>

	</v-card>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'Docker-pop',
	props: ['connection'],

	data () {
		return {
			Dockerfile: null
		};
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

		send_file ()
		{
			
			this.$root.$emit('submit',true);
			
		}

	}
}
</script>