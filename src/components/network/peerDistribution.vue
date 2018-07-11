<template>
	<div id="main" style="width: 100%;height:800px;margin-top: 80px;"></div>
</template>

<script>
	import {geoCoordMap,BJData,GZData,SHData,planePath} from "@/global/site.js"
	
	export default {
		data() {
			return {
				series:[],
				res:[],
				option:''
			}
		},
		mounted() {
			this.$nextTick(() => {
				var myChart = this.echarts.init(document.getElementById('main'));
	
				[
					['北京', BJData],
					['上海', SHData],
					['广州', GZData]
				].forEach((item, i)=>{
					this.showTopItem(item, i);
				});

				this.initChart();
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(this.option);
			})
		},
		methods: {
			convertData(data){
				var res = [];
				for(var i = 0; i < data.length; i++) {
					var dataItem = data[i];
					var fromCoord = geoCoordMap[dataItem[0].name];
					var toCoord = geoCoordMap[dataItem[1].name];
					if(fromCoord && toCoord) {
						res.push({
							fromName: dataItem[0].name,
							toName: dataItem[1].name,
							coords: [fromCoord, toCoord],
							value: dataItem[1].value
						});
					}
				}
				return res;
			},
			showTopItem(item, i) {
				var color = ['#a6c84c', '#ffa022', '#46bee9'];
				
				var convertData = function(data) {
					console.log(data);
					var res = [];
					for(var i = 0; i < data.length; i++) {
						var dataItem = data[i];
						var fromCoord = geoCoordMap[dataItem[0].name];
						var toCoord = geoCoordMap[dataItem[1].name];
						if(fromCoord && toCoord) {
							res.push({
								fromName: dataItem[0].name,
								toName: dataItem[1].name,
								coords: [fromCoord, toCoord],
								value: dataItem[1].value
							});
						}
					}
					return res;
				};

				this.series.push({
					name: item[0] + ' Top10',
					type: 'lines',
					zlevel: 1,
					effect: {
						show: true,
						period: 6,
						trailLength: 0.7,
						color: '#fff',
						symbolSize: 3
					},
					lineStyle: {
						normal: {
							color: color[i],
							width: 0,
							curveness: 0.2
						}
					},
					data: convertData(item[1])
				}, {
					name: item[0] + ' Top10',
					type: 'lines',
					zlevel: 2,
					symbol: ['none', 'arrow'],
					symbolSize: 10,
					effect: {
						show: true,
						period: 6,
						trailLength: 0,
						symbol: planePath,
						symbolSize: 15
					},
					lineStyle: {
						normal: {
							color: color[i],
							width: 1,
							opacity: 0.6,
							curveness: 0.2
						}
					},
					data: convertData(item[1])
				}, {
					name: item[0] + ' Top10',
					type: 'effectScatter',
					coordinateSystem: 'geo',
					zlevel: 2,
					rippleEffect: {
						brushType: 'stroke'
					},
					label: {
						normal: {
							show: true,
							position: 'right',
							formatter: '{b}'
						}
					},
					symbolSize: function(val) {
						return val[2] / 8;
					},
					itemStyle: {
						normal: {
							color: color[i]
						}
					},
					data: item[1].map(function(dataItem) {
						return {
							name: dataItem[1].name,
							value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
						};
					})
				});
			},
			initChart(){
				var series=this.series;
				this.option = {
					backgroundColor:'white',
					title: {
						text: '区块分布',
	//					ubtext: '数据纯属虚构',
						left: 'center',
						textStyle: {
							color: '#333'
						}
					},
//					tooltip: {
//						trigger: 'item',
//						formatter: function(params, ticket, callback) {
//							console.log(params);
//							if(params.seriesType == "effectScatter") {
//								return "线路：" + params.data.name + "" + params.data.value[2];
//							} else if(params.seriesType == "lines") {
//								return params.data.fromName + ">" + params.data.toName + "<br />" + params.data.value;
//							} else {
//								return params.name;
//							}
//						}
//					},
//					legend: {
//						orient: 'vertical',
//						top: 'bottom',
//						left: 'right',
//						data: ['北京 Top10', '上海 Top10', '广州 Top10'],
//						textStyle: {
//							color: '#333'
//						},
//						selectedMode: 'multiple',
//					},
					geo: {
						map: 'china',
						label: {
							emphasis: {
								show: true,
								color: '#fff'
							}
						},
						roam: false,
						itemStyle: {
							normal: {
								areaColor: '#323c48',
								borderColor: '#404a59'
							},
							emphasis: {
								areaColor: '#2a333d'
							}
						}
					},
					series: series
				}
			}
		}
	}
</script>

<style>
</style>