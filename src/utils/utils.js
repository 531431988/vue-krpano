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
