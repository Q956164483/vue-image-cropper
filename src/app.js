import Vue from 'vue'
// import VueResource from 'vue-resource'
import App from './views/App.vue'
import router from './router'
import store from './vuex/store'
import './css/animate.scss'
import {remChange, setDPR} from './utils/remChange'
import ajax from './utils/ajax'
remChange()
Vue.use(ajax)
router.beforeEach(function (to, from, next) {
  store.state.isLoading = true
  setTimeout(() => {
    document.title = to.meta.pageTitle ? to.meta.pageTitle : '图片上传'
    next()
  },800*Math.random()+200)
  
})
router.afterEach(function (to) {
  store.state.isLoading = false
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

