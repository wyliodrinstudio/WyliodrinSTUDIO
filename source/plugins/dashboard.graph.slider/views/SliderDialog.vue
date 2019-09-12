<template>
	<v-card class="graphDialog">
		<v-card-title>{{$t('DASHBOARD_ADDSLIDER')}}</v-card-title>

		<v-card-text class="graphDialog">
			<div layout-padding class="signal-details row">
				<v-text-field autofocus color ="orange" :label="$t('DASHBOARD_SIGNAL_NAME')" required v-model="newdata.signalTitle" class="col-md-6">{{$t('DASHBOARD_SIGNAL_NAME')}}</v-text-field>
				<v-text-field color ="orange" :label="$t('DASHBOARD_SIGNAL_DESCRIPTION')" required v-model="newdata.signalDescription" class="col-md-6">{{$t('DASHBOARD_SIGNAL_DESCRIPTION')}}</v-text-field>
			</div>
			<div class="sig-properties row">
				<v-text-field :label="$t('NAME')" v-model="newdata.figureName" class="col-md-6"></v-text-field>
				<div class="form__field col-md-6">
					<div class="form__label">{{$t('DASHBOARD_SIGNAL_COLOR')}}:</div>
					<div class="form__input">
						<swatches v-model="newdata.signalColor" colors="text-advanced" popover-to="right"></swatches>
					</div>
				</div>
				<v-text-field :label="$t('DASHBOARD_MIN_VALUE')" type="number" step=0.1 v-model="newdata.minAxesValue" class="col-md-6"></v-text-field>
				<v-text-field :label="$t('DASHBOARD_MAX_VALUE')" type="number" step=0.1 v-model="newdata.maxAxesValue" class="col-md-6"></v-text-field>
				<v-text-field :label="$t('SLIDER_STEP')" type="number" step=1 v-model="newdata.step" class="col-md-6"></v-text-field>
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
	name:'SpeedometerDialog',
	components: {
		Swatches
	},
	props:['signal', 'signals', 'data'],
	data() {
		return {
			newdata: _.assign ({
				signalTitle:'',
				signalDescription:'',
				signalColor:'#f07613',
				minAxesValue: 0,
				maxAxesValue: 1000,
				step: 1,
				figureName: ''
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

