<template>
	<v-card>
		<v-card-title>
			<span class="headline">{{$t('FLASH_CANCEL_DIALOG')}}</span>
		</v-card-title>
		<v-card-text>
			<div>
				<v-row align="center" justify="center">
					<div>{{$t('FLASH_CANCEL_TEXT_QUESTION')}}</div>
					<div>{{$t('FLASH_CANCEL_TEXT')}}</div>
				</v-row>
			</div>
		</v-card-text>
		<v-card-actions>
			<v-spacer/>
			<v-btn text @click="close(true)">{{$t('YES')}}</v-btn>
			<v-btn text @click="close(false)">{{$t('NO')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
export default {
	name: 'FlashCancel',
	methods: {
		close (action)
		{
			this.$root.$emit ('submit', action);
		},
	}
};
</script>