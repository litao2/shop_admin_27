// 导入Vue
import Vue from 'vue'
// 1.导入路由模块
import Router from 'vue-router'

// 导入创建好的两个单文件组件
import Login from '@/components/login/Login'
import Home from '@/components/home/Home'
import Users from '@/components/users/Users'
import Roles from '@/components/roles/Roles'

// 导入权限列表组件
import Rights from '@/components/rights/Rights'

// 将路由通过use注册到vue中
Vue.use(Router)

// 2.创建路由实例，配置路由规则
const router = new Router({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      children: [
        { path: '/users', component: Users },
        { path: '/roles', component: Roles },
        { path: '/rights', component: Rights }
      ]
    }
  ]
})

// beforeEach方法 就是一个导航守卫（全局守卫）
router.beforeEach((to, from, next) => {
  // 思路：
  // 1.如果访问的是登录页，直接展示登录页面
  if (to.path === '/login') {
    return next()
  }
  // 2.判断有没有登录
  const token = localStorage.getItem('token')
  if (token) {
    // 登录，直接展示当前要访问的路由内容
    next()
  } else {
    // 没有登录，就重新跳转到 登录页面，让用户登录
    next('/login')
  }
  // from 表示从哪来，也就是：当前要离开的路由
  // to 表示到哪去，也就是：要进入的路由
  // next() 一定要调用这个钩子函数，否则页面不会展示任何内容
  // console.log('导航守卫执行了')
  // console.log('to:', to)
  // console.log('from:', from)

  // next()
})
// 导出路由
export default router
