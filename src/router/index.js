import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index/index.vue'
import Network from '@/components/network/network.vue'
import Transations from '@/components/transations/transations.vue'
import Blocks from '@/components/blocks/blocks.vue'
import Chaincodes from '@/components/chaincodes/chaincodes.vue'
import Channels from '@/components/channels/channels.vue'

Vue.use(Router)

export default new Router({
	linkActiveClass: 'active',
    routes: [
	{
    	path: '/',
      	redirect:'/index',
   	},
   {
      	path: '/index',
	    name: 'Index',
	    component: Index,
   },
   {
      	path: '/network',
	    name: 'Network',
	    component: Network,
   },
   {
      	path: '/transations',
	    name: 'Transations',
	    component: Transations,
   },
   {
      	path: '/blocks',
	    name: 'Blocks',
	    component: Blocks,
   },
   {
      	path: '/chaincodes',
	    name: 'Chaincodes',
	    component: Chaincodes,
   },
   {
      	path: '/channels',
	    name: 'Channels',
	    component: Channels,
   }
  ]
})
