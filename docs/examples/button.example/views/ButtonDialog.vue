<template>
	<v-card>
		<v-card-text>
			{{$t('BUTTON_EXAMPLE_INPUT_TEXT')}}
			<v-text-field></v-text-field>
		</v-card-text>

		<v-card-actions>
			<v-btn text @click="close">Close</v-btn>
		</v-card-actions>
	</v-card>
	
</template>

<script>
export default {
	name: 'ButtonDialog',
	data() {
		return {

		}
	},
	methods: {
		close() {
			this.$root.$emit ('submit', undefined);
		}
	}
}
</script>