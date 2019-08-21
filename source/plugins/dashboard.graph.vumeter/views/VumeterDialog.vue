<template>
	<v-card>
		<v-card-title>{{$t('DASHBOARD_ADDVUMETER')}}</v-card-title>

		<v-card-text layout-padding class="signal-details">
          	<v-text-field autofocus color ="orange" :label="$t('DASHBOARD_SIGNAL_NAME')" required v-model="newdata.signalTitle">{{$t('DASHBOARD_SIGNAL_NAME')}}</v-text-field>
			<v-text-field color ="orange" :label="$t('DASHBOARD_SIGNAL_DESCRIPTION')" required v-model="newdata.signalDescription">{{$t('DASHBOARD_SIGNAL_DESCRIPTION')}}</v-text-field>
			<div class="form__field">
				<div class="form__label">{{$t('DASHBOARD_SIGNAL_COLOR')}}</div>
				<div class="form__input">
					<swatches v-model="newdata.signalColor" colors="text-advanced" popover-to="right"></swatches>
				</div>
			</div>
			<div class="sig-properties">
				<v-text-field :label="$t('NAME')" v-model="newdata.figureName"></v-text-field>
				<v-text-field :label="$t('DASHBOARD_MAX_AXES_VALUE')" type="number" step=0.1 v-model="newdata.maxAxesValue"></v-text-field>
			</div>
		</v-card-text>
		<v-card-actions>
			<v-btn text @click="close">{{$t('CLOSE')}}</v-btn>
			<v-btn text @click="createChart">{{$t('DASHBOARD_ADD_DIALOG')}}</v-btn>
		</v-card-actions>
		
    </v-card>
</template>

<script>
import _ from 'lodash';
import Swatches from 'vue-swatches';
export default {
	name:'VumeterDialog',
	components: {
		Swatches
	},
	props:['signal', 'signals', 'data'],
	data() {
		return {
			newdata: _.assign ({
				signalTitle:'',
				signalDescription:'',
				signalColor:'#b9f5f1',
				minAxesValue: 0,
				maxAxesValue: 1000,
				axisName: '',
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

