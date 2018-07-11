<template>
	<div class="Analytics">
		<div class="Analytics-containt OT-chart">
			<h2 class="ac-title">交易状况</h2>
			<div class="ot-content" id="otchart"></div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				myAnalyticsChart:null,
				otoption:null,
				txByOrgdata:[],
				creatormspid:[],
				txByOrg:[]
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.getData();
				window.myTimout06=setInterval(() => {
					this.myAnalyticsChart=null;
					this.otoption=null;
					this.txByOrgdata=[];
					this.creatormspid=[];
					this.txByOrg=[];
	        		this.getData();
	      		}, 3000)
			})
		},
		methods:{
			getData(){
				this.axios.get(this.Url+'api/txByOrg/mychannel').then((response) => {
					this.txByOrgdata=response.data.rows;
					this.myAnalyticsChart = this.echarts.init(document.getElementById('otchart'));
					this.initAnalyticsChart();
				})
			},
			initAnalyticsChart(){
				for(var i=0;i<this.txByOrgdata.length;i++){
					this.creatormspid.push(this.txByOrgdata[i].creator_msp_id);
					var txByOrgobj={};
					txByOrgobj.value=this.txByOrgdata[i].count;
					txByOrgobj.name=this.txByOrgdata[i].creator_msp_id;
					this.txByOrg.push(txByOrgobj);
				}
				var chartcreatormspid=this.creatormspid;
				var charttxByOrg=this.txByOrg;
								
				this.otoption = {
				    tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    legend: {
				        orient: 'vertical',
				        left: 'left',
				        data: chartcreatormspid
				    },
				    series : [
				        {
				            name: '所占比例',
				            type: 'pie',
				            radius : '55%',
				            center: ['50%', '60%'],
				            data:charttxByOrg,
				            itemStyle: {
				                emphasis: {
				                    shadowBlur: 10,
				                    shadowOffsetX: 0,
				                    shadowColor: 'rgba(0, 0, 0, 0.5)'
				                }
				            }
				        }
				    ]
				};
				if(this.otoption && typeof this.otoption === "object") {
					this.myAnalyticsChart.setOption(this.otoption, true);
				}
			}
			
		}
	}
</script>

<style>
</style>