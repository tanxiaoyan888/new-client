<template>
	<div class="modal-xxx" id="myModal01">
		<div class="mx-content" id="myModal01Content">
			<h1 class="mxc-title">区块明细</h1>
			<span class="close" @click="closePopupWindow">X</span>
			<div class="table-model-box">
				<table class="table table-striped">
					<tbody>
						<tr>
							<td>所属通道名称：</td>
							<td>{{datadetail01.channelname}}</td>
						</tr>
						<tr>
							<td>ID：</td>
							<td>{{datadetail01.id}}</td>
						</tr>
						<tr>
							<td>区块数量：</td>
							<td>{{datadetail01.blocknum}}</td>
						</tr>
						<tr>
							<td>创建时间：</td>
							<td>{{datadetail01.createdt.split('T')[0]+" "+datadetail01.createdt.split('T')[1].split('.')[0]}}</td>
						</tr>
						<tr>
							<td>区块交易数：</td>
							<td>{{datadetail01.txcount}}</td>
						</tr>
						<tr>
							<td>区块Hash：</td>
							<td>{{datadetail01.blockhash}}</td>
						</tr>
						<tr>
							<td>区块数据Hash：</td>
							<td>{{datadetail01.datahash}}</td>
						</tr>
						<tr>
							<td>区块前序hash：</td>
							<td>{{datadetail01.prehash}}</td>
						</tr>
					</tbody>
					
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props: ['datadetail01'],
		data(){
			return{
				marginTop:'',
				windowHeight:'',
				popupWindowClose01:false
			}
		},
		mounted(){
			this.$nextTick(() => {
				this.cssTop();
				window.onresize = () => {
		            this.cssTop();
		        }
			})			
		},
		methods:{
			cssTop(){
				if(document.getElementById('myModal01')){
					this.windowHeight=document.getElementById('myModal01').offsetHeight;
					document.getElementById('myModal01Content').style.marginTop=(this.windowHeight-document.getElementById('myModal01Content').offsetHeight)/2+'px';
				}
				
			},
			closePopupWindow(){
				this.$emit('send-close01',this.popupWindowClose01);
			}
		}
	}
</script>

<style>
</style>