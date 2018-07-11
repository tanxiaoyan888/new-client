<template>
	<div class="Peers-health">
		<h2 class="ac-title">运行状态</h2>
		<div class="table-box">
			<button class="refresh btn btn-info" @click="refresh">刷新</button>
			<table class="table table-striped Peers-table">
				<thead>
					<tr>
						<td>节点名称</td>
						<td>状态</td>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(data,index) in peerdata">
						<td>{{data.server_hostname}}</td>
						<td v-if="data.status === 'RUNNING'">运行中</td>
						<td v-else="data.status === 'DOWN'">下线</td>
					</tr>
					
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	export default{
		data() {
			return {
				peerdata:''
			}
		},
		mounted(){
			this.$nextTick(() => {
				this.getData();
			})
		},
		methods: {
			getData(){
				this.axios.get(this.Url+'api/peersStatus/mychannel').then((response) => {
					this.peerdata=response.data.peers;
				})
			},
			refresh(){
				this.getData();
			}
		}
	}
</script>

<style>
</style>