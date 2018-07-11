<template>
	<div class="page">
		<div class="pagenumber">
			<div class="item-num">共<span>{{totalList}}</span>条记录</div>
			<div class="pagesize">
				<select class="form-control" @change="pageSizeShow()">
					<option><span>5</span>条一页</option>
					<option><span>10</span>条一页</option>
					<option><span>20</span>条一页</option>
					<option><span>50</span>条一页</option>
					<option><span>100</span>条一页</option>
				</select>
			</div>
			<div class="currentPage" style="margin-right: 20px;margin-left: 5px;">
				当前第&nbsp;&nbsp;<span>{{currentPage}}</span>&nbsp;&nbsp;页
			</div>
			<div class="pageBtn">
				<button class="form-control" :disabled="currentPage == 1" @click="toStartPage">首页</button>
			</div>
			<div class="pageBtn">
				<button class="form-control" :disabled="currentPage == 1" @click="toPrev">上一页</button>
			</div>
			<div class="pageBtn">
				<button class="form-control" :disabled="currentPage == endPage" @click="toNext">下一页</button>
			</div>
			<div class="pageBtn">
				<button class="form-control" :disabled="currentPage == endPage" @click="toEndPage">尾页</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {	
		props: ['listLength'],
		data(){
			return{
				pageSize:5,
				totalList:this.listLength,
				currentPage:1,
				endPage:''
			}
		},
		mounted(){
			this.pageSizeShow();
		},
		methods:{
			pageSizeShow(){
				var opt=document.getElementsByTagName("select")[0];
				var value = opt.options[opt.selectedIndex].value; // 选中值
				this.pageSize=value.split("条")[0];
				this.currentPage=1;
				this.$emit('send-pageSize',this.pageSize);
				if(this.totalList<this.pageSize){
					this.endPage=1;
				}else{
					if(this.totalList / this.pageSize<=parseInt(this.totalList/this.pageSize)){
						this.endPage=parseInt(this.totalList/this.pageSize);
					}else{
						this.endPage=parseInt(this.totalList/this.pageSize)+1;
					}
					
				}
			},
			toNext(){
				if(this.currentPage==this.endPage){
					return false;
				}else{
					this.currentPage++;
				}
				
				this.$emit('send-currentPage',this.currentPage);
				
			},
			toPrev(){
				this.currentPage--;
				this.$emit('send-currentPage',this.currentPage);
			},
			toEndPage(){
				this.currentPage=this.endPage;
				this.$emit('send-currentPage',this.currentPage);
			},
			toStartPage(){
				this.currentPage=1;
				this.$emit('send-currentPage',this.currentPage);
			},
			toWantedPage(){
				this.$emit('send-currentPage',this.currentPage);
				
			}
		}
	}
</script>

<style>
</style>