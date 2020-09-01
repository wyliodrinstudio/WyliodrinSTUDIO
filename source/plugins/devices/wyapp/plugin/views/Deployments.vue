<template>
	<v-card class="manager-box">
		<v-card-title>
			<span class="headline">{{$t('DEVICE_WYAPP_DEPLOYMENTS')}}</span>
			<v-spacer></v-spacer>
		</v-card-title>
		<v-card-text>
			<div v-if="!containers">
				<v-progress-circular indeterminate></v-progress-circular>
			</div>
			<div v-else>
				<table class="w-100">
					<!--<tr class="w-100 task">
						<th class="w-20">Package Name</th>
						<th class="w-50">Version</th>
						<th class="w-30">Actions</th>
					</tr>-->
					<tr v-for="container in containers" :key="container.ID" class="w-100 container">
						<td class="w-50 d-flex">
							<v-img src="plugins/devices/wyapp/plugin/data/img/icons/docker3
							.svg" aria-label="Container" ></v-img>
							<h3>{{container.name}}</h3>
						</td>
						<td class="w-30 d-flex">
							<!--<span>{{container.ID}}</span> -->
							<!-- <span>{{container.name}}</span> -->
							<!--<span>{{container.image}}</span>-->
							<!--<span>{{task.TT}}</span>-->
						</td>
						<td class="w-20 text-right lib-btn-box">
							<div class="waiting-box" v-if="container.sentKill">
								<v-progress-circular :size="20" indeterminate></v-progress-circular>
							</div>
							<v-btn v-else text class="lib-app-btn" @click="kill(container)">{{$t('DEVICE_WYAPP_STOP')}}</v-btn>
						</td>
					</tr>
				</table>
			</div>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn text @click="close" ref="button">{{$t('CLOSE')}}</v-btn>
		</v-card-actions>
	</v-card>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
	name: 'Deployments',
	props: ['connection'],
	data () {
		return {
			containers: null
		};
	},
	mounted() {
		this.$refs.button.$el.focus();
	}, 
	computed: {
		...mapGetters ({
			device: 'workspace/device',
		}),
	},
	created () {
		this.connection.send ('dep', {
			a: 'run',
		});
		this.connection.on ('tag:dep', this.updateContainers);
	},
	destroyed ()
	{
		this.connection.send ('dep', {
			a: 'stop'
		});
		this.connection.removeListener ('tag:dep', this.updateContainers);
	},
	methods: {
		updateContainers (data)
		{
			// let str = (s1, s2) => 
			// {
			// 	if (s1 < s2) return -1;
			// 	else if (s1 === s2) return 0;
			// 	else return 1;
			// };
			// this.tasks = data.map ((task) => { task.sentKill = false; return task; }).sort ((task1, task2) => {
			// 	if ((task1.TT === '?' && task2.TT === '?') || (task1.TT !== '?' && task2.TT !== '?'))
			// 	{
			// 		return str (task1.COMMAND, task2.COMMAND);
			// 	}
			// 	else if (task1.TT === '?') return 10;
			// 	else return -10;
			// });
			this.containers = data.map((container) => { container.sentKill = false; return container;});
			console.log(data);
		},
		
		kill (container)
		{
			this.connection.send ('dep', {a: 'exit', ID: container.ID}); 
			container.sentKill = true;
		},
		esc() {
			this.close();
		}, 
		close ()
		{
			this.$root.$emit ('submit');
		}
	}
};
</script>

