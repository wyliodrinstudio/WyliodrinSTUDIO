<template>
	<section class="charts">
        <vue-highcharts :highcharts="Highcharts" :options="options" ref="chart"></vue-highcharts>
    </section></template>

<script>
import VueHighcharts from "vue2-highcharts";
import More from "highcharts/highcharts-more";
import Highcharts from "highcharts";
More(Highcharts);

export default {
	name: 'ThermometerGraph',
	props: ['data'],
	components: {
		VueHighcharts
	},
	data() { 
		return {
			unregister: () => {},
			options:{
			    chart: {
			        type: 'column',
			        marginBottom: 60,
			        marginLeft: 59,
			        marginRight: 39
				},
				maintainAspectRatio: false,
			    credits: {
			        enabled: false
			    },
			    legend: {
			        enabled: false
			    },
			    column:{
			    	stacking: 'true'
			    },
			    exporting: {
			        enabled: false   
			    },
			    tooltip: {
					formatter: function() 
					{
						return this.series.name+': <b>' + (this.y+this.data.minAxesValue) + '</b>';
					}
				},
			    yAxis: [{
			        min: this.data.minAxesValue,
			        max: this.data.maxAxesValue,
			        title: this.data.axisName,
			        align: 'right',
			    }, {
			        min: 0,
			        max: this.data.maxAxesValue -this.data.minAxesValue,
			        align: 'right',
			        lineColor: 'transparent',
       				tickLength: 0,
			        gridLineWidth: 0,
  					minorGridLineWidth: 0,
  					labels:{
  						enabled: false
  					}
			    }],
			    xAxis: {
			        labels: {
			            enabled: false
			        }
				},
				title:
				{
				text: this.data.signalTitle
				},
				series: [{
					name: this.data.signalTitle,
					color: '#FFF4C6',
					yAxis: 1,
					data: []
				}],
			},
			Highcharts
		}
	},
	mounted() {
		this.unregister = this.studio.dashboard.registerForSignal ('ThermometerGraph',(data)=>{
			console.log (data);
			const chart = this.$refs.chart.getChart();
			if (!chart.renderer.image('plugins/dashboard.graph.thermometer/data/img/icons/thermometer.svg').add()) {
				timer = setInterval(function() {
					var point = chart.series[0].points[0],
						newVal,

					newVal = data.v;

					point.update(newVal, false);
					chart.redraw();
				}, 1000);
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
}
</script>

