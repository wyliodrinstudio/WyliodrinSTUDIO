<template>
	<v-card class="graphDialog">
		<v-card-title>{{$t('DASHBOARD_ADDGAUGE')}}</v-card-title>

		<v-card-text>
			<div layout-padding class="signal-details row">
				<v-text-field autofocus color ="orange" :label="$t('DASHBOARD_SIGNAL_NAME')" required v-model="newdata.id" class="col-md-6">{{$t('DASHBOARD_SIGNAL_NAME')}}</v-text-field>
				<v-text-field  :label="$t('NAME')" v-model="newdata.title" class="col-md-6"></v-text-field>
			</div>
			<div class="sig-properties row">
				<v-text-field color ="orange" :label="$t('DASHBOARD_SIGNAL_DESCRIPTION')" required v-model="newdata.description" class="col-md-12">{{$t('DASHBOARD_SIGNAL_DESCRIPTION')}}</v-text-field>
				<v-text-field :label="$t('DASHBOARD_LOW_VALUE')" type="number" step=0.1 v-model="newdata.lowValue" class="col-md-4"></v-text-field>
				<v-text-field :label="$t('DASHBOARD_MID_VALUE')" type="number" step=0.1 v-model="newdata.midValue" class="col-md-4"></v-text-field>
				<v-text-field :label="$t('DASHBOARD_MAX_AXES_VALUE')" type="number" step=0.1 v-model="newdata.maxValue" class="col-md-4"></v-text-field>

				<div class="form__field col-md-4">
					<div class="form__label">{{$t('DASHBOARD_LOW_COLOR')}}:</div>
					<div class="form__input">
						<swatches v-model="newdata.lowColor" colors="text-advanced" popover-to="left"></swatches>
					</div>
				</div>
				
				<div class="form__field col-md-4">
					<div class="form__label">{{$t('DASHBOARD_MID_COLOR')}}:</div>
					<div class="form__input">
						<swatches v-model="newdata.midColor" colors="text-advanced" popover-to="left"></swatches>
					</div>
				</div>
				<div class="form__field col-md-4">
					<div class="form__label">{{$t('DASHBOARD_MID_COLOR')}}:</div>
					<div class="form__input">
						<swatches v-model="newdata.highColor" colors="text-advanced" popover-to="left"></swatches>
					</div>
				</div>				
				<v-text-field :label="$t('DASHBOARD_MIN_AXES_VALUE')" type="number" step=0.1 v-model="newdata.minValue" class="col-md-6"></v-text-field>
			</div>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn text @click="close">{{$t('CLOSE')}}</v-btn>
			<v-btn class="newapp" text @click="createChart">{{$t('DASHBOARD_ADD_SIGNAL')}}</v-btn>
		</v-card-actions>
		
    </v-card>
</template>

<script>
import _ from 'lodash';
import Swatches from 'vue-swatches';
export default {
	name:'GaugeDialog',
	components: {
		Swatches
	},
	props:['signal', 'signals', 'data'],
	data() {
		return {
			newdata: _.assign ({
				id:'',
				description:'',
				lowValue: 500,
				midValue: 900,
				minValue: 0,
				maxValue: 1000,
				axisName: '',
				title: '',
				lowColor: '#48f542',
				midColor: '#fafa1b',
				highColor: '#d11504'
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
		change(item)
		{
			this.newdata.menuElement = item.title;
		},
		createChart()
		{
			let title = this.newdata.id.replace(/ /g,'');
			if(title.length > 0)
				this.$root.$emit ('submit', this.newdata);
			else
				this.studio.workspace.showNotification('DASHBOARD_NO_TITLE');
		}
	}
};
</script>

