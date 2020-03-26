import Vue from 'vue'
import App from '@/views/App.vue'
import '@/libs/core'
import '@babel/polyfill'
import '@/plugins/vant'
import 'normalize.css'
import '@/less/WMlib.less'

if (process.env.NODE_ENV !== 'production') require('@/mock')
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
