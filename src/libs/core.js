import Vue from 'vue'
import VueStorage from 'vue-ls'
import { VueAxios } from '@/libs/request'
import config from '@/config'
import Bus from './bus'
import importDirective from '@/directive'

importDirective()
Vue.use(VueAxios)
Vue.use(VueStorage, config.storageOptions)
Vue.prototype.$config = config
Vue.prototype.$bus = Bus
Vue.prototype.$active = 0

window.document.title = config.title
