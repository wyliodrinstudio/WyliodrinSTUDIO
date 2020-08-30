<template>
	<v-dialog v-model="isActive" :max-width="width" :persistent="persistent" @keydown.enter="enter" @keydown.esc="esc">
		<dialog-child v-bind="$options.propsData" ref="dialog"/>
	</v-dialog>
</template>

<script>
export default {
	props: {
		persistent: {
			default: true
		}
	},
	methods: {
		enter ()
		{
			if (this.$refs.dialog.enter) this.$refs.dialog.enter ();
		},
		esc ()
		{
			if (this.$refs.dialog.esc) this.$refs.dialog.esc ();
		}
	}
};
</script>

