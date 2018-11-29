// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// 导入自己封装的路由模块
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 3将路由实例 与Vue实例关联到一起
  router,
  components: { App },
  template: '<App/>'
})
