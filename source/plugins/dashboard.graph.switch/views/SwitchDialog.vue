<template>
	<v-card class="graphDialog">
		<v-card-title>{{$t('DASHBOARD_ADDSWITCH')}}</v-card-title>

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
				<v-checkbox hide-details :label="$t('SWITCH_PUSH')" v-model="newdata.pushCheckbox" class="col-md-6"></v-checkbox>
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
	name:'SwitchDialog',
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

