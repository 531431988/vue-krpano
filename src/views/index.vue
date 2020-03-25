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
import config from '@/config'
import hotspot from '@/mixins/hotspot'
export default {
  components: {
    Krpano,
    Sidebar,
    Nav,
    PanoList
  },
  mixins: [hotspot],
  data () {
    return {
      overlay: true,
      show: false,
      xml: './krpano/balcony.xml',
      scene: 'balcony',
      krpano: null,
      active: 0,
      hotspot: {

      }
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
    // 场景切换成功
    onSceneChanged (krpano, name) {
      // 生成查看热点
      this.active = Object.keys(config.hotspot).findIndex(item => item === name)
      this.createHotSpot()
    },
    onOverlayClick () {
      this.overlay = true
      this.show = false
    },
    onInitKrpano (krpano) {
      this.krpano = krpano
      setTimeout(() => {
        // 生成跳转热点
        this.createHotSpot()
      }, 200)
    },
    // 生成热点和查看按钮
    createHotSpot () {
      config.hotspot[this.scene].to.forEach(item => {
        this.addhotspot(item, (current, next) => {
          this.scene = item.name
        })
      })
    }
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
