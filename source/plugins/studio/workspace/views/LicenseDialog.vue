<template>
	<v-card class="manager-box">
		<v-card-title>
			{{$t('ABOUT_LICENSE_TITLE')}}
		</v-card-title>
		<v-card-text>
			<pre class="license-box"> {{ license }} </pre>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn text @click="exit">{{$t('EXIT')}}</v-btn>
		</v-card-actions>
	</v-card>

</template>

<script>

import license from 'raw-loader!../../../../../LICENSE';

export default {
	data() {
		return {
			license: license
		}
	},
	methods: {
		exit() {
			this.$root.$emit('submit', undefined);
		}
	}
}
</script>