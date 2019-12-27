<template>
	<DialogCard :title="title" :actions="actions">
		<component :is="component"></component>
	</DialogCard>
</template>

<script>
export default {
	name: 'Dialog',
	props: ['title', 'component', 'actions'],
}
</script>
