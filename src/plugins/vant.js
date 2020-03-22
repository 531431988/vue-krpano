import Vue from 'vue'
import {
  Button,
  Icon,
  Image,
  Popup,
  Toast,
  Overlay,
  ActionSheet,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton
} from 'vant'
import '../less/theme.less'
const components = {
  Button,
  Icon,
  Image,
  Popup,
  Toast,
  Overlay,
  ActionSheet,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton
}
Object.keys(components).forEach(key => {
  Vue.component(components[key].name, components[key])
})
