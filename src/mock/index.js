import Mock from 'mockjs'
import Login from './login'
import User from './user'

Mock.mock('/auth/login', Login)
Mock.mock('/user/info', User)
Mock.mock('/auth/logout', 'post', {
  msg: '[测试接口] 注销成功',
  code: 0
})
