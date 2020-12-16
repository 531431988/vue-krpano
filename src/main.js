import App from '@/views/App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import Vue from 'vue'
Vue.config.productionTip = false
Vue.use(Antd)
new Vue({
  render: h => h(App)
}).$mount('#app')
