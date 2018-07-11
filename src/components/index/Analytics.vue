<template>
	<div class="Analytics">
		<div class="Analytics-containt">
			<h2 class="ac-title">分析</h2>
			<ul class="ac-nav">
				<li @click="chartTab('li01')" v-bind:class="{ acnlActive:(activeId === 'li01') }">区块 / 小时</li>
				<li @click="chartTab('li02')" v-bind:class="{ acnlActive:(activeId === 'li02') }">区块 / 分钟</li>
				<li @click="chartTab('li03')" v-bind:class="{ acnlActive:(activeId === 'li03') }">交易 / 小时</li>
				<li @click="chartTab('li04')" v-bind:class="{ acnlActive:(activeId === 'li04') }">交易 / 分钟</li>
			</ul>
			<ul class="chart-box">
				<li id="li01" v-bind:class="{ active:(activeId === 'li01') }">
					<div id="chart01" style="height: 100%;"></div>
				</li>
				<li id="li02" v-bind:class="{ active:(activeId === 'li02') }">
					<div id="chart02" style="height: 100%;"></div>
				</li>
				<li id='li03' v-bind:class="{ active:(activeId === 'li03') }">
					<div id="chart03" style="height: 100%;"></div>
				</li>
				<li id="li04" v-bind:class="{ active:(activeId === 'li04') }">
					<div id="chart04" style="height: 100%;"></div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				myChart01: null,
				myChart02: null,
				myChart03: null,
				myChart04: null,
				option01: null,
				option02: null,
				option03: null,
				option04: null,
				activeId: 'li01',
				YblocksByHour: [],
				YblocksByMinute: [],
				YtxByHour: [],
				YtxByMinute: []
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.myChart01 = this.echarts.init(document.getElementById('chart01'));
				this.getData('chart01').then((data)=>{
					this.initChart01(data);
				});
				window.myTimout01=setInterval(() => {
	        		this.getData('chart01').then((data)=>{
						this.initChart01(data);
					});
	      		}, 3000)
				
				this.myChart02 = this.echarts.init(document.getElementById('chart02'));
				this.getData('chart02').then((data)=>{
					this.initChart02(data);
				});
				window.myTimout02=setInterval(() => {
	        		this.getData('chart02').then((data)=>{
						this.initChart02(data);
					});
	      		}, 3000)
				
				this.myChart03 = this.echarts.init(document.getElementById('chart03'));
				this.getData('chart03').then((data)=>{
					this.initChart03(data);
				});
				window.myTimout03=setInterval(() => {
	        		this.getData('chart03').then((data)=>{
						this.initChart03(data);
					});
	      		}, 3000)
				
				this.myChart04 = this.echarts.init(document.getElementById('chart04'));
				this.getData('chart04').then((data)=>{
					this.initChart04(data);
				});
				window.myTimout04=setInterval(() => {
	        		this.getData('chart04').then((data)=>{
						this.initChart04(data);
					});
	      		}, 3000)
			})
		},
		methods: {
			getData(id){
				switch (id){
					case 'chart01':
						return new Promise ((res,rej)=>{
							//获取blocksByHour纵坐标
							this.axios.get(this.Url+'api/blocksByHour/mychannel/1').then((response) => {
								let {rows,status} = response.data;
								let arr = rows.map((item) => {
									return item.count;
								});
								if(status  === 200){
									res(arr);
								}else{
									console.log('服务器报错');
								}
							})
						});
						break;
					case 'chart02':
						return new Promise ((res,rej)=>{
							//获取blocksByHour纵坐标
							this.axios.get(this.Url+'api/blocksByMinute/mychannel/1').then((response) => {
								let {rows,status} = response.data;
								let arr = rows.map((item) => {
									return item.count;
								});
								if(status  === 200){
									res(arr);
								}else{
									console.log('服务器报错');
								}
							})
						});
						break;
					case 'chart03':
						return new Promise ((res,rej)=>{
							//获取blocksByHour纵坐标
							this.axios.get(this.Url+'api/txByHour/mychannel/1').then((response) => {
								let {rows,status} = response.data;
								let arr = rows.map((item) => {
									return item.count;
								});
								if(status  === 200){
									res(arr);
								}else{
									console.log('服务器报错');
								}
							})
						});
						break;
					case 'chart04':
						return new Promise ((res,rej)=>{
							//获取blocksByHour纵坐标
							this.axios.get(this.Url+'api/txByMinute/mychannel/1').then((response) => {
								let {rows,status} = response.data;
								let arr = rows.map((item) => {
									return item.count;
								});
								if(status  === 200){
									res(arr);
								}else{
									console.log('服务器报错');
								}
							})
						});
						break;
					default:
						break;
				}
				
			},
			initChart01(data) {
				//获取横坐标
				function getxAxisdata() {
					var dataarry = [];
					var timenow = new Date().getHours();
					for(var i = 0; i < 25; i++) {
						if(new Date().getHours() + i > 24) {
							dataarry.push((new Date().getHours() + i - 24) + ":00");
						} else {
							dataarry.push((new Date().getHours() + i) + ":00");
						}
					}
					return dataarry;
				}
				var Axisdataarry = getxAxisdata();

				this.option01 = {
					tooltip: {
						trigger: 'axis',
						formatter: function(params, ticket, callback) {

							params.data
						}
					},
					axisLine: {
						show: false
					},
					splitLine: {
						show: true
					},
					axisTick: {
						show: false,
						alignWithLabel: true
					},
					toolbox: {
						show: false,
						feature: {
							dataView: {
								readOnly: true
							}, //数据预览
							restore: true, //复原
							saveAsImage: true, //是否保存图片
							magicType: ['line'] //支持柱形图和折线图的切换
						}
					},
					xAxis: {
						position: 'bottom', //刻度在上方显示还是在下方显示
						offset: 0, //刻度值和x轴的距离
						name: '', //坐标轴名称
						nameLocation: 'start', //坐标轴名称显示位置
						minInterval: 1,
						axisTick: { //axisTick 刻度长度
							show: true,
							alignWithLabel: true,
							interval: 2, //0 强制显示所有标签
							length: 5
						},
						axisLabel: {
							show: true,
							interval: 0 //0 强制显示所有标签  显示刻度上的所有值
						},
						data: Axisdataarry
					},
					yAxis: {
						show: true,
						type: 'value',
						axisLabel: {
							formatter: function(value, index) {
								return value.toFixed(1);
							}
						},
						axisLine: {
							show: false
						},
						axisTick: { //axisTick 刻度长度
							length: 0 //刻度长度为0
						},
						splitNumber: 5 //y轴各自间距
					},
					grid: { // 控制图的大小，调整下面这些值就可以，
						x: 40,
						x2: 0,
						y2: 20 // y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
					},
					series: {
						name: '.test.',
						type: 'line',
						data: data,
						smooth: false, //是否平滑曲线显示
						symbol: 'none', //折线图中去掉小圆点
						markLine: {
							silent: true,
							data: []
						},
						lineStyle: {
							normal: {
								color: '#7cb5ec',
								width: 1.5,
								opacity: 0.7
							}
						},
						areaStyle: {
							normal: {
								color: {
									type: 'linear',
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [{
										offset: 0,
										color: '#7cb5ec' // 0% 处的颜色
									}, {
										offset: 0.5,
										color: '#b4d4f4' // 50% 处的颜色
									}, {
										offset: 1,
										color: '#fff' // 100% 处的颜色
									}],
									globalCoord: false // 缺省为 false
								}
							}
						}
					}
				};
				this.myChart01.setOption(this.option01);
			},
			initChart02(data) {
				//获取横坐标
				function getxAxisdata() {
					var dataarry = [];
					var timenow = new Date().getHours() + ":" + new Date().getMinutes();
					for(var i = 0; i < 60; i++) {
						if(new Date().getMinutes() + i >= 60) {
							dataarry.push(new Date().getHours() + ":" + (new Date().getMinutes() + i - 60));
						} else {
							dataarry.push((new Date().getHours() - 1) + ":" + (new Date().getMinutes() + i));
						}

					}
					return dataarry;
				}
				var Axisdataarry = getxAxisdata();

				//获取纵坐标
				function getseriesdata() {
					var datavaluearry = [];
					for(var i = 0; i < 60; i++) {
						datavaluearry.push("2");
					}
					return datavaluearry;
				}
				var seriesdataarry = getseriesdata();

				this.option02 = {
					tooltip: {
						trigger: 'axis',
						formatter: function(params, ticket, callback) {

							params.data
						}
					},
					axisLine: {
						show: false
					},
					splitLine: {
						show: true
					},
					axisTick: {
						show: false,
						alignWithLabel: true
					},
					toolbox: {
						show: false,
						feature: {
							dataView: {
								readOnly: true
							}, //数据预览
							restore: true, //复原
							saveAsImage: true, //是否保存图片
							magicType: ['line'] //支持柱形图和折线图的切换
						}
					},
					xAxis: {
						position: 'bottom', //刻度在上方显示还是在下方显示
						offset: 0, //刻度值和x轴的距离
						name: '', //坐标轴名称
						nameLocation: 'start', //坐标轴名称显示位置
						minInterval: 1,
						axisTick: { //axisTick 刻度长度
							show: true,
							alignWithLabel: true,
							interval: 2, //0 强制显示所有标签
							length: 5
						},
						axisLabel: {
							show: true,
							interval: 2 //0 强制显示所有标签  显示刻度上的所有值
						},
						data: Axisdataarry
					},
					yAxis: {
						show: true,
						type: 'value',
						axisLabel: {
							formatter: function(value, index) {
								return value.toFixed(1);
							}
						},
						axisLine: {
							show: false
						},
						axisTick: { //axisTick 刻度长度
							length: 0 //刻度长度为0
						},
						splitNumber: 5 //y轴各自间距
					},
					grid: { // 控制图的大小，调整下面这些值就可以，
						x: 40,
						x2: 0,
						y2: 20 // y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
					},
					series: {
						name: '.test.',
						type: 'line',
						data: data,
						smooth: false, //是否平滑曲线显示
						symbol: 'none', //折线图中去掉小圆点
						markLine: {
							silent: true,
							data: []
						},
						lineStyle: {
							normal: {
								color: '#7cb5ec',
								width: 1.5,
								opacity: 0.7
							}
						},
						areaStyle: {
							normal: {
								color: {
									type: 'linear',
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [{
										offset: 0,
										color: '#7cb5ec' // 0% 处的颜色
									}, {
										offset: 0.5,
										color: '#b4d4f4' // 50% 处的颜色
									}, {
										offset: 1,
										color: '#fff' // 100% 处的颜色
									}],
									globalCoord: false // 缺省为 false
								}
							}
						}
					}
				};
				this.myChart02.setOption(this.option02);
			},
			initChart03(data) {
				//获取横坐标
				function getxAxisdata() {
					var dataarry = [];
					var timenow = new Date().getHours();
					for(var i = 0; i < 25; i++) {
						if(new Date().getHours() + i > 24) {
							dataarry.push((new Date().getHours() + i - 24) + ":00");
						} else {
							dataarry.push((new Date().getHours() + i) + ":00");
						}
					}
					return dataarry;
				}
				var Axisdataarry = getxAxisdata();

				this.option03 = {
					tooltip: {
						trigger: 'axis',
						formatter: function(params, ticket, callback) {

							params.data
						}
					},
					axisLine: {
						show: false
					},
					splitLine: {
						show: true
					},
					axisTick: {
						show: false,
						alignWithLabel: true
					},
					toolbox: {
						show: false,
						feature: {
							dataView: {
								readOnly: true
							}, //数据预览
							restore: true, //复原
							saveAsImage: true, //是否保存图片
							magicType: ['line'] //支持柱形图和折线图的切换
						}
					},
					xAxis: {
						position: 'bottom', //刻度在上方显示还是在下方显示
						offset: 0, //刻度值和x轴的距离
						name: '', //坐标轴名称
						nameLocation: 'start', //坐标轴名称显示位置
						minInterval: 1,
						axisTick: { //axisTick 刻度长度
							show: true,
							alignWithLabel: true,
							interval: 2, //0 强制显示所有标签
							length: 5
						},
						axisLabel: {
							show: true,
							interval: 0 //0 强制显示所有标签  显示刻度上的所有值
						},
						data: Axisdataarry
					},
					yAxis: {
						show: true,
						type: 'value',
						axisLabel: {
							formatter: function(value, index) {
								return value.toFixed(1);
							}
						},
						axisLine: {
							show: false
						},
						axisTick: { //axisTick 刻度长度
							length: 0 //刻度长度为0
						},
						splitNumber: 5 //y轴各自间距
					},
					grid: { // 控制图的大小，调整下面这些值就可以，
						x: 40,
						x2: 0,
						y2: 20 // y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
					},
					series: {
						name: '.test.',
						type: 'line',
						data: data,
						smooth: false, //是否平滑曲线显示
						symbol: 'none', //折线图中去掉小圆点
						markLine: {
							silent: true,
							data: []
						},
						lineStyle: {
							normal: {
								color: '#7cb5ec',
								width: 1.5,
								opacity: 0.7
							}
						},
						areaStyle: {
							normal: {
								color: {
									type: 'linear',
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [{
										offset: 0,
										color: '#7cb5ec' // 0% 处的颜色
									}, {
										offset: 0.5,
										color: '#b4d4f4' // 50% 处的颜色
									}, {
										offset: 1,
										color: '#fff' // 100% 处的颜色
									}],
									globalCoord: false // 缺省为 false
								}
							}
						}
					}
				};
				this.myChart03.setOption(this.option03);
			},
			initChart04(data) {
				//获取横坐标
				function getxAxisdata() {
					var dataarry = [];
					var timenow = new Date().getHours() + ":" + new Date().getMinutes();
					for(var i = 0; i < 60; i++) {
						if(new Date().getMinutes() + i >= 60) {
							dataarry.push(new Date().getHours() + ":" + (new Date().getMinutes() + i - 60));
						} else {
							dataarry.push((new Date().getHours() - 1) + ":" + (new Date().getMinutes() + i));
						}

					}
					return dataarry;
				}
				var Axisdataarry = getxAxisdata();

				//获取纵坐标
				function getseriesdata() {
					var datavaluearry = [];
					for(var i = 0; i < 60; i++) {
						datavaluearry.push("2");
					}
					return datavaluearry;
				}
				var seriesdataarry = getseriesdata();

				this.option04 = {
					tooltip: {
						trigger: 'axis',
						formatter: function(params, ticket, callback) {

							params.data
						}
					},
					axisLine: {
						show: false
					},
					splitLine: {
						show: true
					},
					axisTick: {
						show: false,
						alignWithLabel: true
					},
					toolbox: {
						show: false,
						feature: {
							dataView: {
								readOnly: true
							}, //数据预览
							restore: true, //复原
							saveAsImage: true, //是否保存图片
							magicType: ['line'] //支持柱形图和折线图的切换
						}
					},
					xAxis: {
						position: 'bottom', //刻度在上方显示还是在下方显示
						offset: 0, //刻度值和x轴的距离
						name: '', //坐标轴名称
						nameLocation: 'start', //坐标轴名称显示位置
						minInterval: 1,
						axisTick: { //axisTick 刻度长度
							show: true,
							alignWithLabel: true,
							interval: 2, //0 强制显示所有标签
							length: 5
						},
						axisLabel: {
							show: true,
							interval: 2 //0 强制显示所有标签  显示刻度上的所有值
						},
						data: Axisdataarry
					},
					yAxis: {
						show: true,
						type: 'value',
						axisLabel: {
							formatter: function(value, index) {
								return value.toFixed(1);
							}
						},
						axisLine: {
							show: false
						},
						axisTick: { //axisTick 刻度长度
							length: 0 //刻度长度为0
						},
						splitNumber: 5 //y轴各自间距
					},
					grid: { // 控制图的大小，调整下面这些值就可以，
						x: 40,
						x2: 0,
						y2: 20 // y2可以控制 X轴跟Zoom控件之间的间隔，避免以为倾斜后造成 label重叠到zoom上
					},
					series: {
						name: '.test.',
						type: 'line',
						data: data,
						smooth: false, //是否平滑曲线显示
						symbol: 'none', //折线图中去掉小圆点
						markLine: {
							silent: true,
							data: []
						},
						lineStyle: {
							normal: {
								color: '#7cb5ec',
								width: 1.5,
								opacity: 0.7
							}
						},
						areaStyle: {
							normal: {
								color: {
									type: 'linear',
									x: 0,
									y: 0,
									x2: 0,
									y2: 1,
									colorStops: [{
										offset: 0,
										color: '#7cb5ec' // 0% 处的颜色
									}, {
										offset: 0.5,
										color: '#b4d4f4' // 50% 处的颜色
									}, {
										offset: 1,
										color: '#fff' // 100% 处的颜色
									}],
									globalCoord: false // 缺省为 false
								}
							}
						}
					}
				};
				this.myChart04.setOption(this.option04);
			},
			chartTab(id) {
				this.activeId = id;
			}

		}
	}
</script>

<style>
	.chart-box .active {
		opacity: 1 !important;
		position: absolute;
		top: 0;
		left: 0;
	}
	
	.acnlActive {
		color: #10ADE4;
	}
</style>