<template>
  <div id="app">
  	<Header></Header>
  	<!--<Loading v-show="showLoading"></Loading>-->
  	<router-view></router-view>
  </div>
</template>

<script>
	import Header from '@/components/header/header.vue'
//	import Loading from '@/components/loading/loading.vue'
	
	export default {
		components: {
			Header,
//			Loading
		}
	}
</script>

<style>
	

</style>
