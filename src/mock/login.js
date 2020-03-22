import Mock from 'mockjs'
export default {
  code: 200,
  data: {
    'id': Mock.mock('@guid'),
    'name': Mock.mock('@name'),
    'username': 'admin',
    'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
    'token': '4291d7da9005377ec9aec4a71ea837f'
  },
  msg: '请求成功'
}
