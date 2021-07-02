<template>
	<v-card>
		<v-card-title>
			<span class="headline">{{$t('DEVICE_MP_BROWSER_HEADER')}}</span>
		</v-card-title>
		<v-card-text>
			<div>Please install <a href="https://www.google.com/chrome/">Chrome</a> or <a href="https://www.microsoft.com/en-us/edge">Edge</a> to use MicroPython.</div>
		</v-card-text>
		<v-card-actions>
			<v-spacer/>
			<v-btn text @click="close">{{$t('CLOSE')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	name: 'EdgeOrChrome',
	methods: {
		close ()
		{
			this.$root.$emit ('submit');
		}
	}
};
</script>