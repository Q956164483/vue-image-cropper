import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/js/remChange'
import '@/assets/css/common.scss'

Vue.config.productionTip = false

const app = new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

export default app
