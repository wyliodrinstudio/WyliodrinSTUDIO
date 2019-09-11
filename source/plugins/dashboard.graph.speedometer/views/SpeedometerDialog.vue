<template>
	<v-card class="graphDialog">
		<v-card-title>{{$t('DASHBOARD_ADDSPEEDOMETER')}}</v-card-title>

		<v-card-text>
			<div layout-padding class="signal-details row">
				<v-text-field autofocus color ="orange" :label="$t('DASHBOARD_SIGNAL_NAME')" required v-model="newdata.signalTitle" class="col-md-6">{{$t('DASHBOARD_SIGNAL_NAME')}}</v-text-field>
				<v-text-field color ="orange" :label="$t('DASHBOARD_SIGNAL_DESCRIPTION')" required v-model="newdata.signalDescription" class="col-md-6">{{$t('DASHBOARD_SIGNAL_DESCRIPTION')}}</v-text-field>
			</div>
			<div class="sig-properties row">
				<v-text-field :label="$t('NAME')" v-model="newdata.figureName" class="col-md-6"></v-text-field>
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
						<swatches v-model="newdata.speedometerLowColor" colors="text-advanced" popover-to="left"></swatches>
					</div>
				</div>
				<v-text-field :label="$t('DASHBOARD_MID_VALUE')" type="number" step=0.1 v-model="newdata.midValue" class="col-md-6"></v-text-field>
				<div class="form__field col-md-3">
					<div class="form__label">{{$t('DASHBOARD_MID_COLOR')}}:</div>
					<div class="form__input">
						<swatches v-model="newdata.speedometerMidColor" colors="text-advanced" popover-to="left"></swatches>
					</div>
				</div>
				<div class="form__field col-md-3">
					<div class="form__label">{{$t('DASHBOARD_MID_COLOR')}}:</div>
					<div class="form__input">
						<swatches v-model="newdata.speedometerHighColor" colors="text-advanced" popover-to="left"></swatches>
					</div>
				</div>
				<v-text-field :label="$t('DASHBOARD_MIN_AXES_VALUE')" type="number" step=0.1 v-model="newdata.minAxesValue" class="col-md-6"></v-text-field>
				<v-text-field :label="$t('DASHBOARD_MAX_AXES_VALUE')" type="number" step=0.1 v-model="newdata.maxAxesValue" class="col-md-6"></v-text-field>
				<div class="col-md-12">
					<span>Measurement system:</span>
					<v-menu offset-y>
						<template v-slot:activator="{ on }">
							<v-btn color="primary" dark v-on="on">{{ $t(newdata.menuElement)}}</v-btn>
						</template>
						<v-list>
							<v-list-item v-for="(item, index) in newdata.items" :key="index" @click="change(item)">
								<v-list-item-title>{{ $t(item.title) }}</v-list-item-title>
							</v-list-item>
						</v-list>
					</v-menu>
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
				signalColor:'#b9f5f1',
				lowValue: 50,
				midValue: 90,
				minAxesValue: 0,
				maxAxesValue: 1000,
				axisName: '',
				items: [
					{title: 'DASHBOARD_KILOMETERS'},
					{title: 'DASHBOARD_MILES'}
				],
				menuElement: 'DASHBOARD_KILOMETERS',
				figureName: '',
				speedometerLowColor: '#48f542',
				speedometerMidColor: '#fafa1b',
				speedometerHighColor: '#d11504'
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
			this.$root.$emit ('submit', this.newdata);
		}
	}
}
</script>

