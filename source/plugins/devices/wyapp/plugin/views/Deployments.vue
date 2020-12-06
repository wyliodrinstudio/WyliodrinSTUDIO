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
			<div v-else-if="containers.length === 0" style="text-align:center">
				
				<h2 class="text-center font-weight-light">{{$t('DEVICE_WYAPP_NO_CONTAINERS')}}</h2>
			</div>

			<div v-else>
				<table class="w-100">
					<tr v-for="container in containers" :key="container.ID" class="w-100 task">
						<td class="w-50 d-flex">
							<v-img v-if="container.studio === true" src="plugins/devices/wyapp/plugin/data/img/icons/wyliodrin-studio-logo.png"></v-img>
							<v-img v-else src="plugins/devices/wyapp/plugin/data/img/icons/docker3.svg" aria-label="Container" ></v-img>

							<h3>{{container.title}}</h3>

						</td>
						<td class="status-container">
							<div :class="status (container)" :alt="container.state" :title="container.state"> </div>
						</td>
						<td class="w-30 d-flex">
							<v-spacer></v-spacer>
							<span>{{container.status}}</span>
						</td>
							
						
						<td class="w-20 text-right lib-btn-box">
							<div class="waiting-box" v-if="container.sentKill">
								<v-progress-circular :size="20" indeterminate></v-progress-circular>
							</div>

							<div class="waiting-box" v-else-if="container.sentDell">
								<v-progress-circular :size="20" indeterminate></v-progress-circular>
							</div>

							<v-btn text class="lib-app-btn" v-else-if="container.state === 'created'"
							@click="stop(container)">{{$t('DEVICE_WYAPP_STOP')}}</v-btn>

							<v-btn text class="lib-app-btn" v-else-if="container.state === 'running'"
							@click="stop(container)">{{$t('DEVICE_WYAPP_STOP')}}</v-btn>

							<v-btn text class="lib-app-btn" v-else-if="container.state === 'restarting'"
							@click="stop(container)">{{$t('DEVICE_WYAPP_STOP')}}</v-btn>

							<v-btn text class="lib-app-btn" v-else
							@click="del(container)">{{$t('DEVICE_WYAPP_DELETE')}}</v-btn>
							
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
		})
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
			this.containers = data.map((container) => { container.sentKill = false; container.sentDell = false; return container;}).sort((container1,container2)=>{
				if(container1.studio === true && container2.studio === false){
					return -1;
				}
				else if(container1.studio === false && container2.studio === true) {
					return 1;
				}
				else 
				{
					if(container1.title < container2.title ) 
						return -1;
					else if (container1.title > container2.title) {
						return 1;
					}
					else return 0;
				}
			});	
		},

		status (container) {
			if (container.state === 'running') {
				return 'green';
			}
			else
			if (container.status.substr(0,10) === 'Exited (0)')
			{
				return 'grey';
			}
			if (container.status.substr(0,14) === 'Restarting (0)')
			{
				return 'yellow';
			}
			else
			if (container.state === 'created') {
				return 'yellow';
			}
			else
			{
				return 'red';
			}
		},
		
		stop (container)
		{
			this.connection.send ('dep', {a: 'exit', ID: container.ID}); 
			container.sentKill = true;
		},
		del(container)
		{
			this.connection.send ('dep', {a: 'delete', ID: container.ID});
			container.sentDell = true;
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

<style scoped>

.status-container {
	position: relative;
}
.status-container > div {
	position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
}

.green {
	background-color: green;
	height: 15px;
	width: 15px;
	border-radius: 100px;
}
.red {
	background-color: red;
	height: 15px;
	width: 15px;
	border-radius: 100px;
}
.yellow {
	background-color: orange;
	height: 15px;
	width: 15px;
	border-radius: 100px;
}
.grey {
	background-color: grey;
	height: 15px;
	width: 15px;
	border-radius: 100px;
}
</style>



