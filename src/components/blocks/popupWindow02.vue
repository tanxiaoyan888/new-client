<template>
	<div class="modal-xxx" id="myModal02">
		<div class="mx-content" id="myModal02Content">
			<h1 class="mxc-title">交易明细</h1>
			<span class="close" @click="closePopupWindow">X</span>
			<div class="table-model-box">
				<table class="table table-striped">
					<tbody>
						<tr>
							<td>交易ID：</td>
							<td>{{datadetail.txhash}}</td>
						</tr>
						<tr>
							<td>发起者MSP：</td>
							<td>{{datadetail.creator_msp_id}}</td>
						</tr>
						<tr>
							<td>背书情况：</td>
							<td>{{datadetail.endorser_msp_id}}</td>
						</tr>
						<tr>
							<td>描述：</td>
							<td>{{datadetail.tx_desc}}</td>
						</tr>
						<tr>
							<td>链码名字：</td>
							<td>{{datadetail.chaincodename}}</td>
						</tr>
						<tr>
							<td>交易类型：</td>
							<td>{{datadetail.type}}</td>
						</tr>
						<tr>
							<td>交易时间：</td>
							<td v-if="datadetail.createdt">{{datadetail.createdt.split('T')[0]+" "+datadetail.createdt.split('T')[1].split('.')[0]}}</td>
						</tr>
						<tr>
							<td>读集合：</td>
							<td>
								<ul v-for="data01 in datadetail.read_set" style="width: 300px;">
									<li>{{data01.chaincode}}</li>
									<li v-for="(item,key) in data01.set">
										<span>{{key}}:{{item}}</span>
									</li>
								</ul>
							</td>
						</tr>
						<tr>
							<td>写集合：</td>
							<td>
								<ul v-for="data01 in datadetail.write_set" style="width: 300px;">
									<li>{{data01.chaincode}}</li>
									<li v-for="(item,key) in data01.set">
										<span>{{key}}:{{item}}</span>
									</li>
								</ul>
							</td>
							
						</tr>
					</tbody>
					
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props: ['datadetail'],
		data(){
			return{
				marginTop:'',
				windowHeight:'',
				popupWindowClose:false
			}
		},
		mounted(){
			this.$nextTick(() => {
				this.cssTop();
				console.log(this.datadetail);
				window.onresize = () => {
		            this.cssTop();
		        }
			})			
		},
		methods:{
			cssTop(){
				if(document.getElementById('myModal02')){
					this.windowHeight=document.getElementById('myModal02').offsetHeight;
					document.getElementById('myModal02Content').style.marginTop=(this.windowHeight-document.getElementById('myModal02Content').offsetHeight)/2+'px';
				}
				
			},
			closePopupWindow(){
				this.$emit('send-close',this.popupWindowClose);
			}
		}
	}
</script>

<style>
</style>