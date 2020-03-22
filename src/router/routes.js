const routers = [
  {
    path: '/login',
    component: () => import('@/views/login.vue')
  }, {
    path: '/',
    redirect: '/index'
  }, {
    path: '/index',
    component: () => import('@/views/index.vue')
  }, {
    path: '*',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/error/404.vue')
  }
]
export default routers
