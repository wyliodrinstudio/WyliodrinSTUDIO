<template>
	<v-card>
		<v-card-title>{{$t('DASHBOARD_ADDEXTRA')}}</v-card-title>

		<v-card-text layout-padding class="signal-details">
          	<v-text-field autofocus color ="orange" :label="$t('DASHBOARD_SIGNAL_NAME')" required v-model="newdata.signalTitle">{{$t('DASHBOARD_SIGNAL_NAME')}}</v-text-field>
			<v-text-field color ="orange" :label="$t('DASHBOARD_SIGNAL_DESCRIPTION')" required v-model="newdata.signalDescription">{{$t('DASHBOARD_SIGNAL_DESCRIPTION')}}</v-text-field>
			<div class="sig-properties">
				<v-text-field :label="$t('NAME')" v-model="newdata.figureName"></v-text-field>
				<span>Links (one image link per row)
					if signal = 0, image from row 1
					if signal = 1, image from row 2
					if signal = 2, image from row 3
				</span>
				<v-textarea required v-model="newdata.imageLink"></v-textarea>
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
	name:'ExtraDialog',
	components: {
	},
	props:['signal', 'signals', 'data'],
	data() {
		return {
			newdata: _.assign ({
				signalTitle:'',
				signalDescription:'',
				signalColor:'',
				figureName: '',
				imageLink:''
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

