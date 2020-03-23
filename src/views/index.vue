<template>
  <div class="krpano">
    <Krpano @init="onInitKrpano" ref="krpano" xml="./krpano/test/test.xml" />
    <van-overlay :show="overlay" :custom-style="style" @click="onClick" />
    <Nav @on-click="onNavClick" />
    <transition name="van-slide-up">
      <PanoList v-if="show" />
    </transition>
    <Sidebar />
  </div>
</template>

<script>
import { Krpano } from '@/components'
import { Sidebar, Nav, PanoList } from './components'
export default {
  components: {
    Krpano,
    Sidebar,
    Nav,
    PanoList
  },
  computed: {
    style () {
      return {
        background: 'transparent',
        visibility: this.show ? 'initial' : 'hidden'
      }
    }
  },
  data () {
    return {
      overlay: true,
      show: false,
      krpano: null
    }
  },
  methods: {
    onNavClick () {
      this.show = !this.show
    },
    onClick () {
      this.overlay = true
      this.show = false
    },
    onInitKrpano (krpano) {
      this.krpano = krpano
      setTimeout(() => {
        if (krpano) {
          var h = krpano.get('view.hlookat')
          var v = krpano.get('view.vlookat')
          var hs_name = `hs${((Date.now() + Math.random()) | 0)}`
          krpano.call(`addhotspot(${hs_name})`)
          krpano.set(`hotspot[${hs_name}].url`, './krpano/test/vtourskin_hotspot.png')
          krpano.set(`hotspot[${hs_name}].ath`, h)
          krpano.set(`hotspot[${hs_name}].atv`, v)
          krpano.set(`hotspot[${hs_name}].distorted`, true)
          if (krpano.get('device.html5')) {
            krpano.set(`hotspot[${hs_name}].onclick`, function (hs) {
              alert(`hotspot ${hs} clicked`)
            }.bind(null, hs_name))
          }
        }
      }, 1000)
    }
  },
  mounted () {

  }

}
</script>
<style lang="less" scoped>
.krpano {
  height: 100%;
  position: relative;
}
</style>
