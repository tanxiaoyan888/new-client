<template>
	<div class="content">
		<v-banner></v-banner>
		<v-ProjectItem></v-ProjectItem>
		<v-Analytics></v-Analytics>
		<v-ContaintBanner></v-ContaintBanner>
		<v-OrganizationTransactions></v-OrganizationTransactions>
		<v-Activity></v-Activity>
		<v-PeerHealth></v-PeerHealth>
	</div>
</template>

<script>
	import Banner from './banner.vue'
	import ProjectItem from './projectItems.vue'
	import Analytics from './Analytics.vue'
	import ContaintBanner from './containtBanner.vue'
	import OrganizationTransactions from './OrganizationTransactions.vue'
	import Activity from './Activity.vue'
	import PeerHealth from './PeersHealth.vue'
	
	export default {	
		components: {
			'v-banner':Banner,
			'v-ProjectItem':ProjectItem,
			'v-Analytics':Analytics,
			'v-ContaintBanner':ContaintBanner,
			'v-OrganizationTransactions':OrganizationTransactions,
			'v-Activity':Activity,
			'v-PeerHealth':PeerHealth,
		},
		beforeRouteLeave (to, from, next) {
    		if(window.myTimout01){
    			clearInterval(window.myTimout01);
    		}
    		if(window.myTimout02){
    			clearInterval(window.myTimout02);
    		}
    		if(window.myTimout03){
    			clearInterval(window.myTimout03);
    		}
    		if(window.myTimout04){
    			clearInterval(window.myTimout04);
    		}
    		if(window.myTimout05){
    			clearInterval(window.myTimout05);
    		}
    		if(window.myTimout06){
    			clearInterval(window.myTimout06);
    		}
    		next();
		}
		
	}
</script>

<style>
	.router-link-exact-active{
		background: #145886;
	}
	@media screen and (max-width: 1600px) { 

		.router-link-exact-active{
			background: #0BA1D6;
		}
	
	} 
</style>