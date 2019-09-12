<template>
	<v-card class="graphDialog">
		<v-card-title>{{$t('DASHBOARD_ADDGAUGE')}}</v-card-title>

		<v-card-text>
			<div layout-padding class="signal-details row">
            	<v-text-field autofocus color ="orange" :label="$t('DASHBOARD_SIGNAL_NAME')" required v-model="newdata.signalTitle" class="col-md-6">{{$t('DASHBOARD_SIGNAL_NAME')}}</v-text-field>
				<v-text-field color ="orange" :label="$t('DASHBOARD_SIGNAL_DESCRIPTION')" required v-model="newdata.signalDescription" class="col-md-6">{{$t('DASHBOARD_SIGNAL_DESCRIPTION')}}</v-text-field>
			</div>
			<div class="sig-properties row">
				<v-text-field  :label="$t('NAME')" v-model="newdata.figureName" class="col-md-6"></v-text-field>
				<div class="form__field col-md-6">
					<div class="form__label">{{$t('DASHBOARD_SIGNAL_COLOR')}}:</div>
					<div class="form__input">
						<swatches v-model="newdata.signalColor" colors="text-advanced" popover-to="left"></swatches>
					</div>
				</div>
				<v-text-field :label="$t('DASHBOARD_LOW_VALUE')" type="number" step=0.1 v-model="newdata.lowValue" class="col-md-6"></v-text-field>
				<div class="form__field col-md-6">
					<div class="form__label">{{$t('DASHBOARD_LOW_COLOR')}}:</div>
					<div class="form__input">
						<swatches v-model="newdata.gaugeLowColor" colors="text-advanced" popover-to="left"></swatches>
					</div>
				</div>
				<v-text-field :label="$t('DASHBOARD_MID_VALUE')" type="number" step=0.1 v-model="newdata.midValue" class="col-md-6"></v-text-field>
				<div class="form__field col-md-3">
					<div class="form__label">{{$t('DASHBOARD_MID_COLOR')}}:</div>
					<div class="form__input">
						<swatches v-model="newdata.gaugeMidColor" colors="text-advanced" popover-to="left"></swatches>
					</div>
				</div>
				<div class="form__field col-md-3">
					<div class="form__label">{{$t('DASHBOARD_MID_COLOR')}}:</div>
					<div class="form__input">
						<swatches v-model="newdata.gaugeHighColor" colors="text-advanced" popover-to="left"></swatches>
					</div>
				</div>				
				<v-text-field :label="$t('DASHBOARD_MIN_AXES_VALUE')" type="number" step=0.1 v-model="newdata.minAxesValue" class="col-md-6"></v-text-field>
				<v-text-field :label="$t('DASHBOARD_MAX_AXES_VALUE')" type="number" step=0.1 v-model="newdata.maxAxesValue" class="col-md-6"></v-text-field>
				<div class="col-md-12">
					<span>Measurement system:</span>
					<v-select class="drpdown"
						:items="newdata.items"
						v-model="newdata.menuElement"
						item-text = "title"
						item-value = "title"
						hide-details
					></v-select>
				</div>
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
				signalTitle:'',
				signalDescription:'',
				signalColor:'#b9f5f1',
				lowValue: 50,
				midValue: 90,
				minAxesValue: 0,
				maxAxesValue: 1000,
				axisName: '',
				items: [
					{title: 'KILOMETERS'},
					{title: 'MILES'}
				],
				menuElement: 'KILOMETERS',
				figureName: '',
				gaugeLowColor: '#48f542',
				gaugeMidColor: '#fafa1b',
				gaugeHighColor: '#d11504'
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
			let title = this.newdata.signalTitle.replace(/ /g,'');
			if(title.length > 0)
				this.$root.$emit ('submit', this.newdata);
			else
				this.studio.workspace.showNotification('DASHBOARD_NO_TITLE');
		}
	}
}
</script>

