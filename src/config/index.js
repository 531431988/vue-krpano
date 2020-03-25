
/**
 * 项目默认配置项
 * title       项目标题
 * primaryColor - 默认主题色
 * cookieExpires - cookie保存的天数
 * api - 接口地址
 * publicPath - 发布目录
 * storageOptions: {} - Vue-ls 插件配置项 (localStorage/sessionStorage)
 *
 */
export default {
  title: '全景测试',
  primaryColor: '#52C41A',
  cookieExpires: 1,
  api: process.env.VUE_APP_BASE_API,
  storageOptions: {
    namespace: 'ovit__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local' // storage name session, local, memory
  },
  hotspot: {
    balcony: {
      to: [{
        name: 'parlour',
        ath: 180,
        atv: 0,
        title: '客厅'
      }]
    },
    parlour: {
      to: [{
        name: 'balcony',
        ath: 0,
        atv: 0,
        title: '客厅'
      }, {
        name: 'bedroom1',
        ath: 135,
        atv: 0,
        title: '卧室1'
      }],
      look: [{
        ath: 180,
        atv: 0
      }]
    },
    bedroom1: {
      to: [{
        name: 'parlour',
        ath: -20,
        atv: 0,
        title: '客厅'
      }, {
        name: 'bedroom2',
        ath: 30,
        atv: 0,
        title: '卧室2'
      }, {
        name: 'bedroom3',
        ath: 90,
        atv: 0,
        title: '卧室3'
      }, {
        name: 'toilet',
        ath: 180,
        atv: 0,
        title: '厕所'
      }],
      look: [{
        ath: 180,
        atv: 0
      }]
    },
    bedroom2: {
      to: [{
        name: 'bedroom1',
        ath: -150,
        atv: 0,
        title: '卧室1'
      }],
      look: [{
        ath: 180,
        atv: 0
      }]
    },
    bedroom3: {
      to: [{
        name: 'bedroom1',
        ath: 90,
        atv: 0,
        title: '卧室1'
      }],
      look: [{
        ath: 180,
        atv: 0
      }]
    },
    toilet: {
      to: [{
        name: 'bedroom1',
        ath: -90,
        atv: 0,
        title: '卧室1'
      }],
      look: [{
        ath: 180,
        atv: 0
      }]
    }
  }
}
