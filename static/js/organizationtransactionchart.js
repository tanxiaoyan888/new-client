var dom = document.getElementById("otchart");
var myChart = echarts.init(dom);
var app = {};
option = null;
option = {
	title: {
		text: 'Organization Transactions',
		left: 'center',
		top: 20,
		textStyle: {
			color: 'white'
		}
	},

	tooltip: {
		trigger: 'item',
		formatter: "{a} <br/>{b} : {c} ({d}%)"
	},

	visualMap: {
		show: false,
		min: 80,
		max: 600,
		inRange: {
			colorLightness: [0, 1]
		}
	},
	series: [{
		name: '数据展示',
		type: 'pie',
		radius: '70%',
		center: ['52%', '55%'],
		data: [
			{
				value: 274,
				name: 'OrdererMSP'
			},
			{
				value: 235,
				name: 'Org1MSP'
			},
			{
				value: 400,
				name: 'Org2MSP'
			}
		].sort(function(a, b) {
			return a.value - b.value;
		}),
		roseType: 'radius',
		label: {
			normal: {
				textStyle: {
					color: 'rgba(0, 0, 0, 1)'
				}
			}
		},
		labelLine: {
			normal: {
				lineStyle: {
					color: 'rgba(0, 0, 0, 1)'
				},
				smooth: 0.2,
				length: 10,
				length2: 20
			}
		},
//		itemStyle: {
//			normal: {
//				//							color: '#c23531',
//				shadowBlur: 100,
//				shadowColor: 'rgba(255, 255, 255, 1)'
//			}
//		},

		animationType: 'scale',
		animationEasing: 'elasticOut',
		animationDelay: function(idx) {
			return Math.random() * 200;
		}
	}],
	color: ['rgb(249,205,173)', 'rgb(88,197,194)', '#c23531']
};
if(option && typeof option === "object") {
	myChart.setOption(option, true);
}