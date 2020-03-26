import Vue from 'vue'
import VueStorage from 'vue-ls'
import { VueAxios } from '@/libs/request'
import config from '@/config'
import Bus from './bus'
import vueFullscreen from 'vue-fullscreen'
import importDirective from '@/directive'

Vue.use(VueAxios)
Vue.use(VueStorage, config.storageOptions)
Vue.use(vueFullscreen)
Vue.prototype.$config = config
Vue.prototype.$bus = Bus
importDirective()

window.document.title = config.title
