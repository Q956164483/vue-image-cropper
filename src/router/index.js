import Vue from 'vue'
import Router from 'vue-router'
import Case from '../views/case.vue'

Router.prototype.goBack = function () {
  this.isBack = true
  window.history.go(-1)
}
Vue.use(Router)

export default new Router({
  history: true,
  saveScrollPosition: true,
  routes: [
    {
      path: '/',
      component: Case,
      children: [
        {
          path: '/',
          component: Case,
          meta: {
            pageTitle: '图片裁剪上传',
            keepAlive: true // 需要被缓存
          }
        }
      ]
    }
  ]
})
