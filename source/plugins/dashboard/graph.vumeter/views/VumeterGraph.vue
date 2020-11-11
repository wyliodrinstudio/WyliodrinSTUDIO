<template>
	<section class="charts">
        <vue-highcharts :highcharts="Highcharts" :options="options" ref="chart"></vue-highcharts>
    </section>
</template>

<script>
import VueHighcharts from 'vue2-highcharts';
import More from 'highcharts/highcharts-more';
import Highcharts from 'highcharts';
let timer = null;

More(Highcharts);
export default {
	name: 'VumeterGraph',
	components: {
		VueHighcharts
	},
	props: ['data'],
	data() {
		return {
			unregister: () => {},
			options:{
				chart: {
					type: 'gauge',
					plotBackgroundColor: {
						linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
						stops: [
							[0, '#FFF4C6'],
							[0.3, '#FFFFFF'],
							[1, '#FFF4C6']
						]
					},						
					plotBackgroundImage: null,
					plotBorderWidth: 1,
					height: 400
				},
				maintainAspectRatio: false,
				title: {
					text: this.data.id
				},

				pane: {
					startAngle: -60,
					endAngle: 60,
					background: null,
					center: ['30%', '90%'],
					size: 500
				},

				// the value axis
				yAxis: {
					min: this.data.minAxesValue,
					max: this.data.maxAxesValue,

					minorTickInterval: 'outside',
					minorTickWidth: 1,
					minorTickLength: 10,
					minorTickPosition: 'inside',
					minorTickColor: '#666',

					tickPixelInterval: 30,
					tickWidth: 2,
					tickPosition: 'outside',
					tickLength: 10,
					tickColor: '#666',
					labels: {
						distance: 20,
						rotation: 'auto'
					},
					plotBands: [
						{
							from: this.data.minAxesValue,
							to: this.data.minAxesValue + 20,
							color: this.data.color,
							innerRadius: '100%',
							outerRadius: '105%'
						}],
					pane: 0,
					title: {
						text: 'VU',
						y: -40
					}
				},
				plotOptions: {
					gauge: {
						dataLabels: {
							enabled: false
						},
						dial: {
							radius: '100%'
						}
					}
				},
				series: [{
					name: 'Meter',
					data: [50],
					yAxis: 0
				}]
			},
		};
	},
	mounted() {
		this.unregister = this.studio.dashboard.registerForSignal ('VumeterGraph',(data)=>{
			const chart = this.$refs.chart.getChart();
			if (!chart.renderer.forExport) {
				timer = setInterval(function() {
					var left = chart.series[0].points[0],
						leftVal;
						// inc = (Math.random() - 0.5) * 3;

					leftVal = left.y + data.v;
					if (leftVal < 0 || leftVal > 100) {
						leftVal = left.y - data.v;
					}
					left.update(leftVal, false);
					chart.redraw();
				}, 5000);
			}
		});
	},
	destroyed() {
		this.unregister ();
		if (timer) {
			clearInterval(timer);
		}
	},
	watch: {
		data ()
		{

		},
	}
};
</script>

