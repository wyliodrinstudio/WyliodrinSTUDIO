<template>
	<v-card class="manager-box">
		<v-card-title>
			<span class="headline">{{$t('DEVICE_WYAPP_TASK_MANAGER')}}</span>
			<v-spacer></v-spacer>
		</v-card-title>
		<v-card-text>
			<div v-if="!tasks">
				<v-progress-circular indeterminate></v-progress-circular>
			</div>
			<div v-else>
				<table class="w-100">
					<!--<tr class="w-100 task">
						<th class="w-20">Package Name</th>
						<th class="w-50">Version</th>
						<th class="w-30">Actions</th>
					</tr>-->
					<tr v-for="task in tasks" :key="task.PID" class="w-100 task">
						<td class="w-50 d-flex">
							<v-img v-if="hasTTY (task)" src="plugins/devices/wyapp/data/img/icons/task-icon.svg" aria-label="Task" ></v-img>
							<v-img v-else src="plugins/devices/wyapp/data/img/icons/process-icon.svg" aria-label="Process" ></v-img>
							<h3>{{task.COMMAND}}</h3>
						</td>
						<td class="w-30 d-flex">
							<span>{{task.PID}}</span>
							<span>{{task.CPU}}</span>
							<span>{{memoryFormat(task.VSZ)}}</span>
							<span>{{task.TT}}</span>
						</td>
						<td class="w-20 text-right lib-btn-box">
							<div class="waiting-box" v-if="task.sentKill">
								<v-progress-circular :size="20" indeterminate></v-progress-circular>
							</div>
							<v-btn v-else text class="lib-app-btn" @click="kill(task)">{{$t('DEVICE_WYAPP_STOP')}}</v-btn>
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
	name: 'TaskManager',
	props: ['connection'],
	data () {
		return {
			tasks: null
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
		this.connection.send ('tm', {
			a: 'run',
		});
		this.connection.on ('tag:tm', this.updateTasks);
	},
	destroyed ()
	{
		this.connection.send ('tm', {
			a: 'stop'
		});
		this.connection.removeListener ('tag:tm', this.updateTasks);
	},
	methods: {
		updateTasks (data)
		{
			let str = (s1, s2) => 
			{
				if (s1 < s2) return -1;
				else if (s1 === s2) return 0;
				else return 1;
			};
			this.tasks = data.map ((task) => { task.sentKill = false; return task; }).sort ((task1, task2) => {
				if ((task1.TT === '?' && task2.TT === '?') || (task1.TT !== '?' && task2.TT !== '?'))
				{
					return str (task1.COMMAND, task2.COMMAND);
				}
				else if (task1.TT === '?') return 10;
				else return -10;
			});
		},
		memoryFormat (VSZ)
		{
			let vsz = parseInt (VSZ);
			if (isNaN (vsz)) return 'N/A';
			if (vsz < 1024) return vsz+' B';
			else
			if (vsz < 1024*1024) return (vsz/1024).toFixed (2)+' KB';
			else
				return (vsz/(1024*1024)).toFixed (2)+ 'MB';
		},
		hasTTY (task)
		{
			return task.TT !== '?';
		},
		kill (task)
		{
			this.connection.send ('tm', {a: 'exit', PID: task.PID});
			task.sentKill = true;
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

