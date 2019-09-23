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
					<v-text-field placeholder="Search" class="manager-search"  append-icon="search" v-model="search"></v-text-field>
				</v-form>
			</v-tabs>
			<v-tabs-items v-model="active">
				<v-tab-item :key="'python'" fill-height>
					<PackagesList language="python" :packages="pythonPackages" @install="install" @uninstall="uninstall" :working="working.python"></PackagesList>
				</v-tab-item>
				<v-tab-item :key="'nodejs'" fill-height>
					<PackagesList language="nodejs" :packages="nodejsPackages" @install="install" @uninstall="uninstall" :working="working.nodejs"></PackagesList>
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

let packagesInstallLogs = {};

function resetPackageLogs (packageName)
{
	delete packagesInstallLogs[packageName];
}

function addPackageLogs (packageName, log)
{
	if (!packagesInstallLogs[packageName]) packagesInstallLogs[packageName] = log;
	else packagesInstallLogs[packageName] = packagesInstallLogs[packageName] + log;
}

function getPackageLogs (packageName)
{
	return packagesInstallLogs[packageName];
}

import _ from 'lodash';
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
			},
			search: '',
			working: {
				python: {},
				nodejs: {}
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
		pythonPackages ()
		{
			let search = this.search.trim ();
			if (this.packages.python && search.length > 0)
			{
				return this.packages.python.filter ((p) => p.name.indexOf (search) >= 0 || p.description.indexOf (search) >= 0)
			}
			else return this.packages.python;
		},
		nodejsPackages ()
		{
			let search = this.search.trim ();
			if (this.packages.nodejs && search.length > 0)
			{
				return this.packages.nodejs.filter ((p) => p.name.indexOf (search) >= 0 || p.description.indexOf (search) >= 0)
			}
			else return this.packages.nodejs;
		}
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
			return this.device.properties.languages && this.device.properties.languages[languageId];
		},
		close ()
		{
			this.$root.$emit ('submit');
		},
		updatePackages (data)
		{
			if (data.a === 'p')
			{
				let packages = this.studio.projects.getLanguagePackages (this.device, data.l);
				// console.log (packages);
				for (let packageInformation of data.p)
				{
					packages[packageInformation.n] = _.assign ({
						// devices do not report the description and this is used for search
						description: '',
					}, packages[packageInformation.n], {
						name: packageInformation.n,
						version: packageInformation.v,
						installed: true,
						working: false
					});
					delete this.working[data.l][packageInformation.n];
				}
				let packagesData = [];
				for (let name in packages)
				{
					packagesData.push (packages[name]);
					delete this.working[data.l][name];
				}
				this.packages[data.l] = packagesData;
				this.working[data.l] = {
					...this.working[data.l]
				};
			}
			else 
			if (data.a === 'i')
			{
				if (data.e !== undefined)
				{
					if (data.e !== 0)
					{
						this.studio.workspace.showError ('DEVICE_WYAPP_PACKAGE_INSTALL_ERROR', {language: data.l, packageName: data.p, extra: getPackageLogs (data.l+':'+data.p)});
					}
					else
					{
						resetPackageLogs (data.l+':'+data.p);
					}
					this.working[data.l] = {
						...this.working[data.l],
						[data.p]: 'reset'
					};
					this.connection.send ('pm', {
						a: 'p',
						l: data.l
					});
				}
				else
				{
					if (data.out)
					{
						addPackageLogs (data.l+':'+data.p, data.out);
					}
					else
					{
						addPackageLogs (data.l+':'+data.p, data.err);
					}
				}
			}
		},
		esc() {
			this.close();
		}, 
		close ()
		{
			this.$root.$emit ('submit');
		},
		install (data)
		{
			resetPackageLogs (data.languages+':'+data.package.name);
			this.connection.send ('pm', {
				a: 'i',
				l: data.language,
				p: data.package.name
			});
			this.working[data.language]= {
				...this.working[data.language],
				[data.package.name]: 'install'
			};
		},
		uninstall (data)
		{
			this.connection.send ('pm', {
				a: 'u',
				l: data.language,
				p: data.package.name
			});
			this.working[data.language] = {
				...this.working[data.language],
				[data.package.name]: 'uninstall'
			};
		}
	}
}
</script>

