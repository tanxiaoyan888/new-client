<template>
	<div class="Activity">
		<h2 class="ac-title">区块增加</h2>
		<div class="ac-content" id="box">
			<ul class="acc-text" id="ul1">
				<li v-for="(data,index) in blockdata">
					<div class="add-head">区块<span>{{index+1}}</span>增加</div>
					<h1 class="Datahash">区块数据hash:</h1>
					<p class="block-text">{{data.datahash}}</p>
					<div style="text-indent: 20px;">
						<span class="Datahash">交易量: </span>
						<span>{{data.txcount}}</span>
					</div>
					<!--<div class="block-time"></div>-->
				</li>
				
			</ul>
			<ul id="ul2"></ul>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				box:'',
				ul1:'',
				ul2:'',
				timer:'',
				blockdata:''
			}
		},
		mounted(){
			this.$nextTick(() => {
				this.getData();
			})
		},
		methods: {
			roll(t){
				this.ul1 = document.getElementById("ul1");
	            this.ul2 = document.getElementById("ul2");
	            this.box = document.getElementById("box");
	            this.ul2.innerHTML = this.ul1.innerHTML;
	            this.box.scrollTop = 0;
	            var timer = setInterval(this.rollStart, t);	
	            var rollStart=this.rollStart;
	            this.box.onmouseover = function () {
	                clearInterval(timer);
	            }
	            this.box.onmouseout = function () {
	                timer = setInterval(rollStart, t);
	            }
			},
			rollStart(){
				if (this.box.scrollTop >= this.ul1.scrollHeight) {
	                this.box.scrollTop = 0;
	            } else {
	                this.box.scrollTop++;
	            }
			},
			getData(){
				this.axios.get(this.Url+'api/blockAndTxList/mychannel/0').then((response) => {
					this.blockdata=response.data.rows;
					console.log(response.data.rows);
					this.roll(50);
				})
			}
		}
	}
</script>

<style>
</style>