// 导入Vue
import Vue from 'vue'
// 1.导入路由模块
import Router from 'vue-router'

// 导入创建好的两个单文件组件
import Login from '@/components/login/Login'
import Home from '@/components/home/Home'

// 将路由通过use注册到vue中
Vue.use(Router)

// 2.创建路由实例，配置路由规则
const router = new Router({
  routes: [
    { path: '/login', component: Login },
    { path: '/home', component: Home }
  ]
})
// 导出路由
export default router
