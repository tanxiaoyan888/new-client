<template>
	<ul class="project-items">
		<li>
			<div class="pi-body">
				<!--<transition :duration="700" >-->
					<h1 class="pi-num animated" :class="{flipInX:flag01}" :duration="500">{{latestBlock}}</h1>
  				<!--</transition>-->				
				<div class="pi-title">区块</div>
			</div>
		</li>
		<li>
			<div class="pi-body">
				<!--<transition name="fade" enter-active-class="flipOutX"  :duration="700">-->
					<h1 class="pi-num animated" :class="{flipInX:flag02}" :duration="500">{{txCount}}</h1>
  				<!--</transition>-->
				<div class="pi-title">交易</div>
			</div>
		</li>
		<li>
			<div class="pi-body">
				<!--<transition name="fade" enter-active-class="flipOutX"  :duration="700">-->
					<h1 class="pi-num animated" :class="{flipInX:flag03}" :duration="500">{{peerCount}}</h1>
  				<!--</transition>-->
				<div class="pi-title">节点</div>
			</div>
		</li>
		<li>
			<div class="pi-body">
				<!--<transition name="fade" enter-active-class="flipOutX"  :duration="700">-->
					<h1 class="pi-num animated" :class="{flipInX:flag04}" :duration="500">{{chaincodeCount}}</h1>
  				<!--</transition>-->
				<div class="pi-title">链码</div>
			</div>
		</li>
	</ul>
</template>

<script>
	export default{
		data(){
			return{
				chaincodeCount:'',
				latestBlock:'',
				peerCount:'',
				txCount:'',
				flag01:false,
				flag02:false,
				flag03:false,
				flag04:false,
				index01:0,
				index02:0,
				index03:0,
				index04:0
				
			}
		},
		methods:{
			getData(){
				this.axios.get(this.Url+'api/status/mychannel').then((response) => {
					if(this.chaincodeCount!=response.data.chaincodeCount){
						this.chaincodeCount=response.data.chaincodeCount;
						this.flag04=!this.flag04;
						this.index04=1;
					}
					if(this.latestBlock!=response.data.latestBlock){
						this.latestBlock=response.data.latestBlock;
						this.flag01=!this.flag01;
						this.index01=1;
					}
					if(this.peerCount!=response.data.peerCount){
						this.peerCount=response.data.peerCount;
						this.flag03=!this.flag03;
						this.index03=1;
					}
					if(this.txCount!=response.data.txCount){
						this.txCount=response.data.txCount;
						this.flag02=!this.flag02;
						this.index02=1;
					}
				})
			}
		},
		mounted(){
			this.$nextTick(() => {
				this.getData();				
				window.myTimout05=setInterval(() => {
	        		this.getData();
	        		if(this.index01==1){
	        			this.flag01=!this.flag01;
	        			this.index01=0;
	        		}
	     			if(this.index02==1){
	        			this.flag02=!this.flag02;
	        			this.index02=0;
	        		}
	     			if(this.index03==1){
	        			this.flag03=!this.flag03;
	        			this.index03=0;
	        		}
	     			if(this.index04==1){
	        			this.flag04=!this.flag04;
	        			this.index04=0;
	        		}
	      		}, 1000)
			})
		}
	}
</script>

<style>
</style>