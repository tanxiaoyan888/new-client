<template>
	<div class="o-content">
		<table class="table table-striped oc-table">
			<thead>
				<tr>
					<td>节点名称</td>
					<td>请求Url</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(data,index) in currentData">
					<td>{{data.server_hostname}}</td>
					<td>{{data.requests}}</td>
				</tr>
			</tbody>
		</table>
		<v-networkPage :listLength="networkDataLength" v-if="flag" @send-pageSize="getPageSize" @send-currentPage='getcurrentPage'></v-networkPage>
		<v-PeerDistribution></v-PeerDistribution>
	</div>
</template>

<script>
	import networkPage from './page.vue'
	import PeerDistribution from './PeerDistribution.vue'
	
	export default {	
		components: {
			'v-networkPage':networkPage,
			'v-PeerDistribution':PeerDistribution
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
				startList:'',
				endList:''
			}
		},
		mounted(){
			this.$nextTick(() => {
				this.getData();
			})
		},
		methods: {
			getData(){
				this.axios.get(this.Url+'api/peers/mychannel').then((response) => {
					this.networkData=response.data.peers;
					this.networkDataLength=response.data.peers.length;
					this.flag = true;
					
				})
			},
			getPageSize(pagesize){
				this.currentData=[];
				this.pageSize=pagesize;
				console.log(this.pageSize+"父组件");
				if(this.networkDataLength>this.pageSize){
					this.actulPageSize=this.pageSize;
					
				}else{
					this.actulPageSize=this.networkDataLength;
				}
				for(var i=0;i<this.actulPageSize;i++){
					this.currentData.push(this.networkData[i]);
				}
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
				
				for(var i=this.startList;i<this.endList+1;i++){
					this.currentData.push(this.networkData[i-1]);
					
				}
			}
		}
		
	}
</script>

<style>
</style>