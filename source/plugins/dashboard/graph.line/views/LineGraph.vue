<template>
  <div>
    <ChartJSLine 
		ref="chart"
    	:chart-data="series"
    	:options="options"
    	:styles="styles"
    	class="line"
    ></ChartJSLine>
  </div>
</template>
<script>
import { Line, mixins } from 'vue-chartjs';
const { reactiveProp } = mixins;

const ChartJSLine = {
	name: 'ChartJSLine',
	extends: Line,
	mixins: [reactiveProp],
	props: ['options'],
	mounted() {
		// this.series is created in the mixin.
		// If you want to pass options please create a local options object
		this.renderChart(this.chartData, this.options);
	},
	methods: {
		update () {
			this.$data._chart.update();
		},
	},
};

export default {
	name: 'LineGraph',
	components: {
		ChartJSLine,
	},
	props: ['data', 'width', 'height'],
	data() {
		return {
			unregister: () => {},
			series: {
				datasets: [
					{
						label: this.data.signalTitle,
						backgroundColor: this.data.signalColor,
						data: [],
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					xAxes: [
						{
							type: 'time',
							distribution: 'series',
							offset: true,
							// ticks: {
							// 	major: {
							// 		enabled: true,
							// 		fontStyle: 'bold'
							// 	},
							// 	source: 'data',
							// 	autoSkip: true,
							// 	autoSkipPadding: 75,
							// 	maxRotation: 0,
							// 	sampleSize: 100
							// },
							// afterBuildTicks: function(scale, ticks) {
							// 	var majorUnit = scale._majorUnit;
							// 	var firstTick = ticks[0];
							// 	var i, ilen, val, tick, currMajor, lastMajor;

							// 	val = moment(ticks[0].value);
							// 	if ((majorUnit === 'minute' && val.second() === 0)
							// 			|| (majorUnit === 'hour' && val.minute() === 0)
							// 			|| (majorUnit === 'day' && val.hour() === 9)
							// 			|| (majorUnit === 'month' && val.date() <= 3 && val.isoWeekday() === 1)
							// 			|| (majorUnit === 'year' && val.month() === 0)) {
							// 		firstTick.major = true;
							// 	} else {
							// 		firstTick.major = false;
							// 	}
							// 	lastMajor = val.get(majorUnit);

							// 	for (i = 1, ilen = ticks.length; i < ilen; i++) {
							// 		tick = ticks[i];
							// 		val = moment(tick.value);
							// 		currMajor = val.get(majorUnit);
							// 		tick.major = currMajor !== lastMajor;
							// 		lastMajor = currMajor;
							// 	}
							// 	return ticks;
							// }
						},
					],
					yAxes: [
						{
							gridLines: {
								drawBorder: false,
							},
							scaleLabel: {
								display: true,
								labelString: 'Value',
							},
						},
					],
				},
			},
		};
	},
	computed: {
		styles() {
			return {
				width: `${this.width}px`,
				height: `${this.height}px`,
				position: 'relative',
			};
		},
	},
	watch: {
		data: {
			deep: true,
			immediate: true,
			handler() {
				console.log('signal name changed to ' + this.data.signalTitle);
				if (this.unregister) {
					this.unregister();
				}
				this.unregister = this.studio.dashboard.registerForSignal(
					this.data.signalTitle,
					(data) => {
						console.log(data);
						const chart = this.$refs.chart;
						let seriesData = this.series.datasets[0].data;
						seriesData.push({
							t: new Date().valueOf(),
							y: data.v,
						});

						chart.update();
					}
				);
				this.update ();
			},
		},
	},
	methods: {
		update () {
			const chart = this.$refs.chart;
			if (chart)
			{
				let dataset = this.series.datasets[0];
				dataset.label =this.data.signalTitle;
				dataset.backgroundColor = this.data.signalColor;
				chart.update();
			}
		}
	},
	destroyed() {
		if (this.unregister) {
			this.unregister();
		}
	},
};
</script>
