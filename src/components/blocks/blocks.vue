<template>
	<div class="o-content">
		<table class="table table-striped oc-table">
			<thead>
				<tr>
					<td>区块名称</td>
					<td>交易数量</td>
					<td>交易数据Hash</td>
					<td>区块Hash</td>
					<td>前序区块Hash</td>
					<td>交易集</td>

				</tr>
			</thead>
			<tbody>
				<tr v-for="(data,index) in currentData">
					<td>{{data.blocknum}}</td>
					<td>{{data.txcount}}</td>
					<td style="width: 100px;">{{data.datahash}}</td>
					<td>
						<a class="alertmodel01" @click="showPopupWindow01(index)">{{data.blockhash}}</a>
					</td>
					<td style="width: 100px;">{{data.prehash}}</td>
					<td style="width: 100px;">
						<a class="alertmodel02" @click="showPopupWindow(data.txhash[0])">{{data.txhash[0]}}</a>
					</td>
				</tr>
			</tbody>
		</table>
		<v-networkPage :listLength="networkDataLength" v-if="flag" @send-pageSize="getPageSize" @send-currentPage='getcurrentPage'></v-networkPage>
		<v-popupWindow01 v-if="popupWindowShow01" v-show="popupWindowShow01" :datadetail01='dataDetail01' @send-close01='closewindow01'></v-popupWindow01>
		<v-popupWindow02 v-if="popupWindowShow" v-show="popupWindowShow" :datadetail='dataDetail' @send-close='closewindow'></v-popupWindow02>
	</div>
</template>

<script>
	import networkPage from './page.vue'
	import popupWindow01 from './popupWindow01.vue'
	import popupWindow02 from './popupWindow02.vue'
	
	export default {	
		components: {
			'v-networkPage':networkPage,
			'v-popupWindow01':popupWindow01,
			'v-popupWindow02':popupWindow02
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
				dataDetail:'',
				popupWindowShow01:false,
				dataDetail01:''
			}
		},
		mounted(){
			this.$nextTick(() => {
				this.getData();
			})
		},
		methods: {
			showPopupWindow01(index){
				this.dataDetail01=this.currentData[index];
				this.popupWindowShow01=true;
			},
			showPopupWindow(id){	
				
				this.axios.get(this.Url+'api/transaction/mychannel/'+id).then((response) => {
					
					this.dataDetail=response.data.row;
				})
				
				this.popupWindowShow=true;
			},
			getData(){
				this.axios.get(this.Url+'api/blockAndTxList/mychannel/0',{
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
			},
			closewindow01(close){
				this.popupWindowShow01=close;
			}
			
		}
		
	}
</script>

<style>
</style>