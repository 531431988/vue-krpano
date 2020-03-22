import Vue from 'vue'
import style from './style'

const importDirective = () => {
  Object.keys(style).forEach(key => {
    Vue.directive(key, style[key])
  })
}

export default importDirective
