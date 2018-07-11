<template>
	<div class="o-content">
		<table class="table table-striped oc-table">
			<thead>
				<tr>
					<td>ID</td>
					<td>链码名字</td>
					<td>通道Hash</td>
					<td>区块</td>
					<td>交易</td>
					<td>时间戳</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(data,index) in currentData">
					<td>{{data.id}}</td>
					<td>{{data.channelname}}</td>
					<td style="width: 100px;">{{data.channel_hash}}</td>
					<td>{{data.blocks}}</td>
					<td>{{data.transactions}}</td>
					<td style="width: 100px;" v-if="data.createdt">{{data.createdat.split('T')[0]+" "+data.createdt.split('T')[1].split('.')[0]}}</td>
				</tr>
			</tbody>
		</table>
		<v-networkPage :listLength="networkDataLength" v-if="flag" @send-pageSize="getPageSize" @send-currentPage='getcurrentPage'></v-networkPage>
	</div>
</template>

<script>
	import networkPage from './page.vue'
	
	export default {	
		components: {
			'v-networkPage':networkPage
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
				this.axios.get(this.Url+'api/channels/info').then((response) => {
					this.networkData=response.data.channels;
					this.networkDataLength=response.data.channels.length;
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