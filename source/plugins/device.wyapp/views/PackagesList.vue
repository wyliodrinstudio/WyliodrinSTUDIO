<template>
	<div v-if="!packages" class="h-100">
		<v-progress-circular indeterminate></v-progress-circular>
	</div>
	<div v-else>
		<table class="w-100">
			<!--<tr class="w-100 task">
				<th class="w-20">Package Name</th>
				<th class="w-50">Version</th>
				<th class="w-30">Actions</th>
			</tr>-->
			<tr v-for="packageData in packages" :key="packageData.n" class="w-100 task">
				<td class="w-30">
					<h3>{{packageData.n}}</h3>
					<div>{{packageData.v}}</div>
				</td>
				<td class="w-50 d-flex">Description goes here</td>
				<td class="w-20 text-right">
					<v-btn text class="lib-app-btn">{{$t('DEVICE_WYAPP_UNINSTALL')}}</v-btn>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
export default {
	name: 'PackagesList',
	props: ['language', 'packages']
}
</script>

