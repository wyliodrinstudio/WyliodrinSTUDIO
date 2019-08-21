<template>
	<v-card class="manager-box">
		<v-card-title>
			<span class="headline">{{$t('DEVICE_WYAPP_PACKAGE_MANAGER')}}</span>
			<v-spacer></v-spacer>
		</v-card-title>
		<v-card-text>
			<v-tabs v-model="active" left class="tabs-box">
				<v-tab :key="'python'" ripple :disabled="!knows('python')">
					Python
				</v-tab>
				<v-tab :key="'nodejs'" ripple :disabled="!knows('nodejs')">
					Node JS
				</v-tab>
				<v-spacer></v-spacer>
				<v-form ref="form">
					<v-text-field placeholder="Search" class="manager-search"  append-icon="search"></v-text-field>
				</v-form>
			</v-tabs>
			<v-tabs-items v-model="active">
				<v-tab-item :key="'python'" fill-height>
					<PackagesList language="python" :packages="packages.python"></PackagesList>
				</v-tab-item>
				<v-tab-item :key="'nodejs'" fill-height>
					<PackagesList language="nodejs" :packages="packages.nodejs"></PackagesList>
				</v-tab-item>
			</v-tabs-items>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn text @click="close" ref="button">{{$t('CLOSE')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import PackagesList from './PackagesList.vue';
import { mapGetters } from 'vuex';
export default {
	name: 'PackageManager',
	props: ['connection'],
	components: {
		PackagesList
	},
	data () {
		return {
			// dialog: false,
			active: 0,
			packages: {
				python: null,
				nodejs: null
			}
		};
	},
	mounted() {
		this.$refs.button.$el.focus();
	}, 
	computed: {
		...mapGetters ({
			device: 'workspace/device',
			// connection: 'link/connection',
			// show: 'windows/packageManager'
		}),
	},
	created ()
	{
		this.connection.send ('pm', {
			a: 'p',
			l: 'python'
		});
		this.connection.send ('pm', {
			a: 'p',
			l: 'nodejs'
		});
		this.connection.on ('tag:pm', this.updatePackages);
	},
	destroyed ()
	{
		this.connection.removeListener ('tag:pm', this.updatePackages);
	},
	methods: {
		knows (languageId)
		{
			return this.device.properties.capabilities && this.device.properties.capabilities.languages && this.device.properties.capabilities.languages[languageId];
		},
		close ()
		{
			this.$root.$emit ('submit');
		},
		updatePackages (data)
		{
			if (data.a === 'p')
			{
				this.packages[data.l] = data.p;
			}
		},
		esc() {
			this.close();
		}, 
		close ()
		{
			this.$root.$emit ('submit');
		}
	}
}
</script>

