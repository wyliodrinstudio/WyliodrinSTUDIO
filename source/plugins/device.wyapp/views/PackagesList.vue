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
					<h3>{{packageData.name}}</h3>
					<div>{{packageData.version}}</div>
				</td>
				<td class="w-50 d-flex">{{packageData.description}}</td>
				<td class="w-20 text-right lib-btn-box">
					<div v-show="!working[packageData.name]">
						<v-btn text v-show="packageData.installed" class="lib-app-btn" @click="uninstall (packageData)">{{$t('DEVICE_WYAPP_UNINSTALL')}}</v-btn>
						<v-btn text v-show="!packageData.installed" class="lib-app-btn" @click="install (packageData)">{{$t('DEVICE_WYAPP_INSTALL')}}</v-btn>
					</div>
					<div class="waiting-box" v-show="working[packageData.name]">
						<v-progress-circular :size="20" indeterminate></v-progress-circular>
					</div>
				</td>
			</tr>
		</table>
	</div>
</template>

<script>
export default {
	name: 'PackagesList',
	props: ['language', 'packages', 'working'],
	methods: {
		install (packageData)
		{
			this.$emit ('install', {
				language: this.language,
				package: packageData
			});
		},
		uninstall (packageData)
		{
			this.$emit ('uninstall', {
				language: this.language,
				package:packageData
			});
		}
	}
}
</script>

