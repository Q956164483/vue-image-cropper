import Vue from 'vue'
import App from './App'
import router from './router'
import store from '@/store'
import '@/assets/js/remChange'
import '@/assets/js/request'
import '@/assets/css/common.scss'
import config from '@/assets/js/config'
import filters from '@/assets/js/filters'

Vue.config.productionTip = false

// 初始化全局过滤器
Object.keys(filters).forEach(item => {
  Vue.filter(item, filters[item])
})

Vue.prototype.$config = config

// 路由切换时改变页面标题
router.beforeEach((to, from, next) => {
  document.querySelector('title').innerHTML = to.name
  // 统计代码
  next()
})

/* eslint-disable no-new */
const app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
