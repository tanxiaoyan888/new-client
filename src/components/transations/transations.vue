<template>
	<div class="o-content">
		<table class="table table-striped oc-table">
			<thead>
				<tr>
					<td>发起者</td>
					<td>交易Id</td>
					<td>交易类型</td>
					<td>所属链码</td>
					<td>时间戳</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(data,index) in currentData">
					<td>{{data.creator_msp_id}}</td>
					<td>
						<a class="alertmodel02" @click="showPopupWindow(index)">{{data.txhash.substring(0,6)}}</a>
					</td>
					<td style="width: 100px;">{{data.type}}</td>
					<td>{{data.chaincodename}}</td>
					<td style="width: 100px;">{{data.createdt.split('T')[0]+" "+data.createdt.split('T')[1].split('.')[0]}}</td>
				</tr>
				
			</tbody>
		</table>
		<v-networkPage :listLength="networkDataLength" v-if="flag" @send-pageSize="getPageSize" @send-currentPage='getcurrentPage'></v-networkPage>
		<v-popupWindow :datadetail='dataDetail' v-if="popupWindowShow" v-show="popupWindowShow" @send-close='closewindow'></v-popupWindow>
	</div>
</template>

<script>
	import networkPage from './page.vue'
	import popupWindow from './popupWindow.vue'
	
	export default {	
		components: {
			'v-networkPage':networkPage,
			'v-popupWindow':popupWindow
		},
		data() {
			return {
				networkData:'',
				networkDataLength:'',
				flag:false,
				pageSize:5,
				actulPageSize:'',
				currentData:[],
				currentPage:1,
				startList:0,
				endList:'',
				popupWindowShow:false,
				dataDetail:''
			}
		},
		mounted(){
			this.$nextTick(() => {
				this.getData();
			})
		},
		methods: {
			showPopupWindow(index){				
				this.dataDetail=this.currentData[index];
				this.popupWindowShow=true;
			},
			getData(){
				this.axios.get(this.Url+'api/txList/mychannel/0/0/',{
					params: { 
						limitrows: this.pageSize,
						offset:this.startList
					}
				}).then((response) => {
					this.currentData=response.data.rows;
					this.networkDataLength=response.data.total;
					this.flag = true;
					
				})
			},
			getPageSize(pagesize){
				this.currentData=[];
				this.pageSize=pagesize;
				this.startList=0;
				console.log(this.pageSize+"父组件");
				if(this.networkDataLength>this.pageSize){
					this.actulPageSize=this.pageSize;
					
				}else{
					this.actulPageSize=this.networkDataLength;
				}
				this.getData();
			},
			getcurrentPage(currentPage){
				this.currentData=[];
				this.currentPage=currentPage;
				this.startList=(this.currentPage-1)*this.pageSize+1;
				
				if(this.currentPage*this.pageSize>this.networkDataLength){
					this.endList=this.networkDataLength;
				}else{
					this.endList=this.currentPage*this.pageSize;
				}
				this.getData();
			},
			closewindow(close){
				this.popupWindowShow=close;
				console.log(this.popupWindowShow);
			}
			
		}
		
	}
</script>

<style>
</style>