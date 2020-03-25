<template>
  <div class="krpano">
    <van-overlay :show="overlay" :custom-style="style" @click="onOverlayClick" />
    <Nav @on-click="onNavClick" />
    <transition name="van-slide-up">
      <PanoList :active="active" v-if="show" @on-click="onListClick" />
    </transition>
    <Sidebar :krpano="krpano" />
    <Krpano @init="onInitKrpano" ref="krpano" :xml="xml" :scene="scene" />
  </div>
</template>

<script>
import { Krpano } from '@/components'
import { Sidebar, Nav, PanoList } from './components'
import { addhotspot } from '@/utils/krpano'
export default {
  components: {
    Krpano,
    Sidebar,
    Nav,
    PanoList
  },
  data () {
    return {
      overlay: true,
      show: false,
      xml: './krpano/balcony.xml',
      scene: '',
      krpano: null,
      active: 0
    }
  },
  computed: {
    style () {
      return {
        background: 'transparent',
        visibility: this.show ? 'initial' : 'hidden'
      }
    }
  },
  methods: {
    onNavClick () {
      this.show = !this.show
    },
    onListClick (item, index) {
      this.active = index
      const { krpano } = this
      // this.scene = item.scene
      // this.xml = `./${item.scene}.xml`
      krpano.call(`loadscene(${item.scene}, null, MERGE, BLEND(1))`)
      krpano.call('lookat(145, 0, 130)')
      krpano.call('set(view.architectural, 1.0)')
      krpano.call('wait(BLEND)')
      krpano.call('tween(view.architectural, 0.0, 2.0)')
      krpano.call('oninterrupt( tween(view.architectural, 0.0, 0.5))')
      krpano.call('lookto(0, 0, 130, smooth(100, 100, 200))')
      // this.krpano.call(`loadpano(./${item.scene}.xml, null, MERGE, BLEND(0.5));`)
    },
    onOverlayClick () {
      this.overlay = true
      this.show = false
    },
    onInitKrpano (krpano) {
      this.krpano = krpano
      setTimeout(() => {
        if (krpano) {
          // addhotspot(krpano, '180', '0')

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
  .enter-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
}
</style>
