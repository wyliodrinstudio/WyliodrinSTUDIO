<template>
	 <section class="charts">
        <vue-highcharts :highcharts="Highcharts" :options="options" ref="chart"></vue-highcharts>
    </section>
</template>
<script>
// import { Line } from 'vue-chartjs';
import VueHighcharts from "vue2-highcharts";
import More from "highcharts/highcharts-more";
import Highcharts from "highcharts";

More(Highcharts);


export default {
	name: 'LineGraph',
	components: {
		VueHighcharts,
		Highcharts
	},
	props: ['data'],
	data () {
		return {
			unregister: () => {},
			options:{
				chart: {
					type: 'line'
				},
				title: {
					text: this.data.signalTitle
				},
				maintainAspectRatio: false,
				yAxis: {
					min: this.data.minAxesValue,
					max: this.data.maxAxesValue,
				},

				series: [{
					name: "Value",
					data: [0,1],
					color: this.data.signalColor
				}],
				responsive: {
					rules: [{
						condition: {
							maxWidth: 500
						},
						chartOptions: {
							legend: {
								layout: 'horizontal',
								align: 'center',
								verticalAlign: 'bottom'
							}
						}
					}]
				}
			},
			Highcharts
		}
	},
	mounted () {
		this.unregister = this.studio.dashboard.registerForSignal ('LineGraph',(data)=>{
			const chart = this.$refs.chart.getChart();
			var point = chart.series[0].points[0],
				newVal,

			newVal = data.v;

			point.update(newVal, false);
			chart.redraw();
		});

	},
	destroyed ()
	{
		this.unregister ();
	},

	watch: {
		data ()
		{
			
		},
		
	}
}
</script>
