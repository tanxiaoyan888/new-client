var myChart = echarts.init(document.getElementById('chart03'));

//获取横坐标
function getxAxisdata(){
	var dataarry = [];
	var timenow = new Date().getHours();
	for(var i=0;i<13;i++){
		if(new Date().getHours()+i>24){
			dataarry.push((new Date().getHours()+i-24)+":00");
		}else{
			dataarry.push((new Date().getHours()+i)+":00");
		}
	}
	return dataarry;
}
var Axisdataarry=getxAxisdata();
console.log(Axisdataarry);


var option03 = {
//	title: {
//		text: 'ECharts',
//		show: true,
//		target: 'blank',
//		textStyle: {
//			color: '#673AB7',
//			fontStyle: 'normal',
//			fontWeight: 'bold',
//			fontFamily: 'sans-serif',
//			fontSize: 18
//		}
//	},
	tooltip: {
		trigger: 'axis',
		formatter: function(params, ticket, callback) {
			console.log(params, '==params');
			console.log(ticket, '==ticket');
			console.log(callback, '==callback');
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
//	legend: {
//		data: ['.test.']
//	},
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
		data:Axisdataarry
	},
	yAxis: {
		show: true,
		type: 'value',
		axisLabel: {
			formatter: function(value, index) {
				return value.toFixed(3);
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
		data: [5, 2, 3, 1, 4, 2, 1, 8, 2, 2, 3, 1, 4],
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
myChart.setOption(option03);