// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Url from './util/url'
import animate from 'animate.css'
import 'echarts/map/js/china.js'
//import Vuex from 'vuex'
import stores from './store/store.js'

Vue.config.productionTip = false

Vue.prototype.echarts = echarts;
Vue.use(VueAxios, axios,animate);
Vue.prototype.Url = Url;


//axios.interceptors.request.use(function(config){
//  stores.dispatch('showloader')
//  return config
//},function(err){
//  return Promise.reject(err)
//});
//axios.interceptors.response.use(function(response){
//  stores.dispatch('hideloader')
//  return response
//},function(err){
//  return Promise.reject(err)
//});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
//store:stores,
  components: { App },
  template: '<App/>'
})
