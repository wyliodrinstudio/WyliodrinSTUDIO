<template>
	<ChartJSLine 
		ref="chart"
		:chart-data="series"
		:options="options"
		class="line"
	></ChartJSLine>
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
		update (options) {
			if (options) this.$data._chart.options = options;
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
						label: this.data.title || this.data.id,
						borderColor: this.data.color,
						backgroundColor: this.data.color+'5f',
						data: [],
					},
				],
			}
		};
	},
	computed: {
		options () {
			let min = parseFloat (this.data.minValue);
			let max = parseFloat (this.data.maxValue);
			return {
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					xAxes: [
						{
							type: 'time',
							distribution: 'series',
							gridLines: {
								drawBorder: false,
							},
							scaleLabel: {
								display: true,
								labelString: this.data.xAxisTitle || '',
							}
						},
					],
					yAxes: [
						{
							gridLines: {
								drawBorder: false,
							},
							scaleLabel: {
								display: true,
								labelString: this.data.yAxisTitle || '',
							},
							ticks: {
								min: !isNaN (min)?min:undefined,
								max: !isNaN (max)?max:undefined
							}
						},
					],
				},
			};
		},
		maxPoints () {
			let points = parseFloat (this.data.maxPoints);
			if (!isNaN (points)) {
				return Math.floor (points);
			}
			else
			{
				return false;
			}
		}
	},
	watch: {
		data: {
			deep: true,
			immediate: true,
			handler() {
				if (this.unregister) {
					this.unregister();
				}
				this.unregister = this.studio.dashboard.registerForSignal(
					this.data.id,
					(data) => {
						const chart = this.$refs.chart;
						let seriesData = this.series.datasets[0].data;
						seriesData.push({
							t: data.t,
							y: parseFloat (data.v),
						});
						
						if (this.maxPoints) {
							seriesData.splice (0, seriesData.length - this.maxPoints);
						}

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
				dataset.label = this.data.title || this.data.id;
				dataset.borderColor = this.data.color;
				dataset.backgroundColor = this.data.color + '5f';

				chart.update(this.options);
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
