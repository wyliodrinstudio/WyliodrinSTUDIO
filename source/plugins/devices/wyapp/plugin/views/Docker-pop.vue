<template>
	<v-card
	class = "mx-auto"
	max-width="344"
	outlined>

	 <v-list-item three-line>
      <v-list-item-content>
       
        <v-list-item-title class="headline mb-1">Dockerfile non-existent</v-list-item-title>
        <v-list-item-subtitle>Would you like to use a predefined Dockerfile ?</v-list-item-subtitle>
      </v-list-item-content>

     
    </v-list-item>

    <v-card-actions>
      <v-btn text>Yes</v-btn>
      <v-btn text @click="close" ref="button">No</v-btn>
    </v-card-actions>

	</v-card>
</template>

<script>
export default {
	name: 'Docker-pop',

	methods: {
		close ()
		{
			this.$root.$emit ('submit');
		}
	}
}
</script>