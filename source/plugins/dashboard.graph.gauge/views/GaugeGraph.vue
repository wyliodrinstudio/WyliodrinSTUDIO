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
	name: 'GaugeGraph',
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
					type: 'gauge'
				},
				title: {
					text: this.data.signalTitle
				},
				pane: {
					center: ['50%', '85%'],
					size: '140%',
					startAngle: -90,
					endAngle: 90,
					background: {
						backgroundColor: this.data.signalColor,
						innerRadius: '60%',
						outerRadius: '100%',
						shape: 'arc'
					}
				},
				maintainAspectRatio: false,
				yAxis: {
					min: this.data.minAxesValue,
					max: this.data.maxAxesValue,
					lineWidth: 0,
					minorTickInterval: null,
					tickAmount: 2,
					title: {
						y: -70
					},
					labels: {
						y: 16
					}
				},
				plotOptions: {
					solidgauge: {
						dataLabels: {
							y: 5,
							borderWidth: 0,
							useHTML: true
						}
					}
				},
				series: [{
					name: "Gauge",
					data: [0],
					color: this.data.gaugeLowColor
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
		this.unregister = this.studio.dashboard.registerForSignal ('GaugeGraph',(data)=>{
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
