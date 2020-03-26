import Cookies from 'js-cookie'
import config from '@/config'

export const TOKEN_KEY = 'token'

export const setToken = (token, name = TOKEN_KEY) => {
  Cookies.set(name, token, { expires: config.cookieExpires || 1 })
}

export const getToken = (name = TOKEN_KEY) => {
  const token = Cookies.get(name)
  return token || false
}

export const loadScript = (src, obj) => {
  if (typeof window[obj] === 'function') {
    // 如果已经加载就直接放回
    return Promise.resolve()
  } else {
    return new Promise(resolve => {
      var script = document.createElement('script')
      script.src = src
      script.async = true
      script.onload = script.onreadystatechange = function () {
        if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
          resolve()
          script.onload = script.onreadystatechange = null
        }
      }
      document.getElementsByTagName('head')[0].appendChild(script)
    })
  }
}
