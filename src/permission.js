import Vue from 'vue'
import router from './router'
import store from './store'

import NProgress from 'nprogress'
import notification from 'ant-design-vue/es/notification'
import { ACCESS_TOKEN } from '@/store/mutation-types'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login'] // no redirect whitelist
const defaultRoutePath = '/'
const LOGIN_PAGE = '/login'

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 有token
  if (Vue.ls.get(ACCESS_TOKEN)) {
    // 在登录页跳转首页
    if (to.path === LOGIN_PAGE) {
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      // 如果没有用户信息获取用户信息
      if (store.getters.userInfo) {
        store.dispatch('GetInfo').then(res => {
          console.log(res)
          const { code } = res
          // 获取用户信息成功跳转首页
          if (code === 200) {
            next()
          } else {
            // token过时跳转登录页
            store.dispatch('Logout').then(() => {
              notification.error({
                message: '错误',
                description: '用户信息失效，请重新登录'
              })
              next({ path: LOGIN_PAGE })
            })
          }
        }).catch(() => {
          notification.error({
            message: '错误',
            description: '请求用户信息失败，请重试'
          })
        })
      } else {
      // 有用户信息直接跳转
        next()
      }
    }
  } else {
    // 无token 在免登录白名单，直接进入
    if (whiteList.includes(to.path)) {
      next()
    } else {
    // 否则去登录页
      next({ path: LOGIN_PAGE })
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
