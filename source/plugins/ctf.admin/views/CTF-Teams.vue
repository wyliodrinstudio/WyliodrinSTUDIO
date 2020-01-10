<template>
	<div>
		<v-card
			class="mx-auto"
			:max-width="this.width"
			outlined
		>
			<v-card-title>
				<span class="headline">CTF Teams</span>
				<v-spacer></v-spacer>
			</v-card-title>
			<v-card-text>
				<v-data-table
					:headers="headers"
					:items="teams"
					:sort-by="['id']"
					:sort-desc="[false]"
					class="elevation-1"
				></v-data-table>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn @click="closeDialog" color="error">Close</v-btn>
			</v-card-actions>
		</v-card>
	</div>
</template>

<script>
  export default {
	name: 'Teams',
	props: ['width', 'activeDb'],
    data () {
      return {
        headers: [
          	{ text: 'ID', value: 'id' },
          	{ text: 'Team Name', value: 'teamName' },
          	{ text: 'Board ID', value: 'boardID' },
			{ text: 'Score', value: 'score' }
        ],
		teams: [],
		updateInterval: undefined
      }
	},
	async created () {
		this.teams = await this.studio.ctf_admin.getTeamsInfo(this.activeDb + '.sqlite');
	},
	mounted () {
		this.updateInterval = setInterval(async () => {
			this.teams = await this.studio.ctf_admin.getTeamsInfo(this.activeDb + '.sqlite');
		}, 3000)
	},
	methods: {
		closeDialog() {
			clearInterval(this.updateInterval);
			this.$root.$emit('submit');
		}
	}
  }
</script>