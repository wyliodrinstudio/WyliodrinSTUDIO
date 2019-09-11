<template>
	<v-card class="graphDialog">
		<v-card-title>{{$t('DASHBOARD_ADDLINE')}}</v-card-title>

		<v-card-text >
           <div layout-padding class="signal-details row">
				<v-text-field autofocus color ="orange" :label="$t('DASHBOARD_SIGNAL_NAME')" required v-model="newdata.signalTitle" class="col-md-6">{{$t('DASHBOARD_SIGNAL_NAME')}}</v-text-field>
				<v-text-field color ="orange" :label="$t('DASHBOARD_SIGNAL_DESCRIPTION')" required v-model="newdata.signalDescription" class="col-md-6">{{$t('DASHBOARD_SIGNAL_DESCRIPTION')}}</v-text-field>			
			</div>
			
			<div class="sig-properties row">
				<v-text-field :label="$t('NAME')" v-model="newdata.figureName" class="col-md-5"></v-text-field>	
				<div class="form__field col-md-3">
					<div class="form__label">{{$t('DASHBOARD_SIGNAL_COLOR')}}:</div>
					<div class="form__input">
						<swatches v-model="newdata.signalColor" colors="text-advanced" popover-to="right"></swatches>
					</div>
				</div>
				<div class="col-md-4">
					<span>{{$t('LINE_STYLE')}}</span>
					<v-menu offset-y>
						<template v-slot:activator="{ on }">
							<v-btn color="primary" dark v-on="on">{{$t(newdata.chartType)}}</v-btn>
						</template>
						<v-list>
							<v-list-item v-for="(item, index) in newdata.items" :key="index" @click="change(item)">
								<v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>
				</div>
				<v-text-field :label="$t('DASHBOARD_MIN_AXES_VALUE')" type="number" step=0.1 v-model="newdata.minAxesValue" class="col-md-6"></v-text-field>
				<v-text-field :label="$t('DASHBOARD_MAX_AXES_VALUE')" type="number" step=0.1 v-model="newdata.maxAxesValue" class="col-md-6"></v-text-field>
				<v-text-field :label="$t('LINE_MAX_POINTS')" type="number" step=1 v-model="newdata.maxPointsToShow" class="col-md-6"></v-text-field>
				<v-text-field :label="$t('LINE_AXIS_NAME')" v-model="newdata.axisName" class="col-md-6"></v-text-field>
				<v-checkbox hide-details :label="$t('LINE_HIDE_LEGEND')" v-model="newdata.legendCheckbox" class="col-md-4"></v-checkbox>
				<v-checkbox hide-details :label="$t('LINE_FIX_AXES_VALUES')" v-model="newdata.axesCheckbox" class="col-md-4"></v-checkbox>
				<v-checkbox hide-details :label="$t('LINE_LOGARITHMIC_AXES')" v-model="newdata.logCheckbox" class="col-md-4"></v-checkbox>
				<v-checkbox hide-details :label="$t('LINE_TIME_SERIES')" v-model="newdata.timeCheckbox" class="col-md-4"></v-checkbox>
				<v-checkbox hide-details :label="$t('LINE_SHOW_POINTS')" v-model="newdata.pointsCheckbox" class="col-md-4"></v-checkbox>
				<v-checkbox hide-details :label="$t('LINE_OVERVIEW')" v-model="newdata.overviewCheckbox" class="col-md-4"></v-checkbox>
				<v-checkbox hide-details :label="$t('LINE_SCROLLBAR')" v-model="newdata.scrollbarCheckbox" class="col-md-12"></v-checkbox>	
			</div>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn text @click="close">{{$t('CLOSE')}}</v-btn>
			<v-btn text @click="createChart" class="newapp">{{$t('DASHBOARD_ADD_SIGNAL')}}</v-btn>
		</v-card-actions>
		
    </v-card>
</template>

<script>
import _ from 'lodash';
import Swatches from 'vue-swatches';
export default {
	name:'LineDialog',
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
				figureName: '',
				items: [
					{ title: 'LINE_STEP' },
					{ title: 'LINE_STRAIGHT' },
					{ title: 'LINE_SPLINE' }
				],
				chartType: 'LINE_STEP',
				legendCheckbox: false,
				axesCheckbox: false,
				logCheckbox: false,
				timeCheckbox:false,
				minAxesValue: 0,
				maxAxesValue: 1000,
				pointsCheckbox: false,
				maxPointsToShow: 10,
				axisName: '',
				overviewCheckbox: false,
				scrollbarCheckbox: false,
			}, this.data)
		};
	},
	methods: {
		methodToRunOnSelect(payload) {
			this.object = payload;
		},
		esc() {
			this.close();
		}, 
		enter() {
			this.createChart();
		}, 
		change(item)
		{
			this.newdata.chartType = item.title;
		},
		close ()
		{
			this.$root.$emit('submit');
		},
		createChart()
		{
			this.$root.$emit ('submit', this.newdata);
		},
		showColorPicker()
		{
			this.newdata.activeColorPicker = true;
		}
	}
}
</script>

