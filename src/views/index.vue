<template>
  <div class="krpano">
    <van-overlay :show="overlay" :custom-style="style" @click="onOverlayClick" />
    <Nav @on-click="onNavClick" />
    <transition name="van-slide-up">
      <PanoList :active="active" v-if="show" @on-click="onListClick" />
    </transition>
    <Sidebar :krpano="krpano" />
    <Krpano @init="onInitKrpano" @change="onSceneChanged" ref="krpano" :xml="xml" :scene="scene" />
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
    // 切换场景
    onListClick (item, index) {
      this.active = index
      const { krpano } = this
      this.scene = item.scene
    },
    onSceneChanged (krpano, name) {
      addhotspot(krpano, '180', '0', params => {
        console.log('我被点了')
      })
    },
    onOverlayClick () {
      this.overlay = true
      this.show = false
    },
    onInitKrpano (krpano) {
      this.krpano = krpano
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
