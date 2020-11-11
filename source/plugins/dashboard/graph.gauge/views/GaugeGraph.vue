<template>
	<div>
	<ChartJSGauge 
		ref="chart"
		:chart-data="series"
		:options="options"
		:styles="styles"
		class="line"
	></ChartJSGauge>
	</div>
</template>
<script>
import { generateChart, mixins } from 'vue-chartjs';
import {} from 'chartjs-gauge';
const { reactiveProp } = mixins;

const ChartJSGauge = {
	name: 'ChartJSGauge',
	extends: generateChart('gauge-chart', 'gauge'),
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
	name: 'GaugeGraph',
	components: {
		ChartJSGauge,
	},
	props: ['data', 'width', 'height'],
	data() {
		return {
			unregister: () => {},
			series: {
				datasets: [
					{
						label: this.data.id,
						backgroundColor: [this.data.lowColor, this.data.midColor, this.data.highColor],
						data: [this.data.lowValue, this.data.midValue, this.data.maxValue],
						value: 0,
					},
				],
			},
			options: {
				responsive: true,
				maintainAspectRatio: false,
				needle: {
					radiusPercentage: 2,
					widthPercentage: 3.2,
					lengthPercentage: 80,
					color: 'rgba(0, 0, 0, 1)'
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
				if (this.unregister) {
					this.unregister();
				}
				this.unregister = this.studio.dashboard.registerForSignal(
					this.data.id,
					(data) => {
						const chart = this.$refs.chart;
						let seriesData = this.series.datasets[0];
						seriesData.value = data.v;

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
				dataset.label =this.data.id;
				dataset.backgroundColor = [this.data.lowColor, this.data.midColor, this.data.highColor];
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
