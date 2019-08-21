<template>
	<v-card>
		<v-card-title>{{$t('DASHBOARD_ADDSWITCH')}}</v-card-title>

		<v-card-text layout-padding class="signal-details">
            <v-text-field autofocus color ="orange" :label="$t('DASHBOARD_SIGNAL_NAME')" required v-model="newdata.signalTitle">{{$t('DASHBOARD_SIGNAL_NAME')}}</v-text-field>
			<v-text-field color ="orange" :label="$t('DASHBOARD_SIGNAL_DESCRIPTION')" required v-model="newdata.signalDescription">{{$t('DASHBOARD_SIGNAL_DESCRIPTION')}}</v-text-field>
            <v-text-field class="signalcolor" color ="orange" :label="$t('DASHBOARD_SIGNAL_COLOR')" required v-model="newdata.signalColor">{{$t('DASHBOARD_SIGNAL_COLOR')}}</v-text-field>

			<div class="sig-properties">
				<v-text-field :label="$t('NAME')" v-model="newdata.figureName"></v-text-field>
				<v-checkbox :label="$t('SWITCH_PUSH')" v-model="newdata.pushCheckbox" ></v-checkbox>
			</div>
		</v-card-text>
		<v-card-actions>
			<v-btn text @click="close">{{$t('CLOSE')}}</v-btn>
			<v-btn text @click="createChart">{{$t('DASHBOARD_ADD_SIGNAL')}}</v-btn>
		</v-card-actions>
		
    </v-card>
</template>

<script>
import _ from 'lodash';

export default {
	name:'SwitchDialog',
	components: {
	},
	props:['signal', 'signals', 'data'],
	data() {
		return {
			newdata: _.assign ({
				signalTitle:'',
				signalDescription:'',
				signalColor:'',
				pushCheckbox: false,
				figureName:''
			}, this.data)			
		};
	},
	methods: {
		esc() {
			this.close();
		}, 
		enter() {
			this.createChart();
		},
		close ()
		{
			this.$root.$emit('submit');
		},
		createChart()
		{
			this.$root.$emit ('submit', this.newdata);
		}
	}
}
</script>

