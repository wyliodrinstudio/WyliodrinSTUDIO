<template>
	<section class="charts">
        <vue-highcharts :highcharts="Highcharts" :options="options" ref="chart"></vue-highcharts>
    </section>
</template>

<script>
import VueHighcharts from 'vue2-highcharts';
import More from 'highcharts/highcharts-more';
import Highcharts from 'highcharts';

More(Highcharts);
let timer = null;
export default {
	name: 'SpeedometerGraph',
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
					plotBackgroundColor: null,
					plotBackgroundImage: null,
					plotBorderWidth: 0,
					plotShadow: false
				},

				title: {
					text: this.data.id
				},
				maintainAspectRatio: false,
				pane: {
					startAngle: -150,
					endAngle: 150,
					background: [
						{
							backgroundColor: {
								linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
								stops: [[0, '#FFF'], [1, '#333']]
							},
							borderWidth: 0,
							outerRadius: '109%'
						},
						{
							backgroundColor: {
								linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
								stops: [[0, '#333'], [1, '#FFF']]
							},
							borderWidth: 1,
							outerRadius: '107%'
						},
						{
							// default background
						},
						{
							backgroundColor: '#DDD',
							borderWidth: 0,
							outerRadius: '105%',
							innerRadius: '103%'
						}
					]
				},

				// the value axis
				yAxis: {
					min: this.data.minAxesValue,
					max: this.data.maxAxesValue,

					minorTickInterval: 'auto',
					minorTickWidth: 1,
					minorTickLength: 10,
					minorTickPosition: 'inside',
					minorTickColor: '#666',

					tickPixelInterval: 30,
					tickWidth: 2,
					tickPosition: 'inside',
					tickLength: 10,
					tickColor: '#666',
					labels: {
						step: 2,
						rotation: 'auto'
					},
					title: {
						text: 'km/h'
					},
					plotBands: [
						{
							from: this.data.minAxesValue,
							to: this.data.minAxesValue + 20,
							color: this.data.speedometerLowColor // green
						},
						{
							from: this.data.minAxesValue + 20,
							to: this.data.minAxesValue + 40,
							color: this.data.speedometerMidColor // yellow
						},
						{
							from: this.data.minAxesValue + 40,
							to: this.data.maxAxesValue,
							color: this.data.speedometerHighColor // red
						}
					]
				},

				series: [{
					name: 'Speed',
					data: [0],
					tooltip: {
						valueSuffix: ' km/h'
					}
				}]
			},
			Highcharts
		};
	},
	mounted() {
		this.unregister = this.studio.dashboard.registerForSignal ('SpeedometerGraph',(data)=>{
			const chart = this.$refs.chart.getChart();
			if (!chart.renderer.forExport) {
				timer = setInterval(function() {
					let point = chart.series[0].points[0],
						newVal;
						// inc = Math.round((Math.random() - 0.5) * 20);

					newVal = point.y + data.v;
					if (newVal < 0 || newVal > 200) {
						newVal = point.y - data.v;
					}

					point.update(newVal);
				}, 3000);
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

