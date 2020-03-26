<template>
<div id="app">
  <Krpano @init="onInitKrpano" @change="onSceneChanged" ref="krpano" :xml="xml" :scene="scene" />
  <Nav ref="nav" />
  <Sidebar :krpano="krpano" />
</div>
</template>

<script>
import { Krpano } from '@/components'
import { Sidebar, Nav } from './components'
import config from '@/config'
import hotspot from '@/mixins/hotspot'
import { ImagePreview } from 'vant'
export default {
  components: {
    Krpano,
    Sidebar,
    Nav
  },
  mixins: [hotspot],
  data () {
    return {
      xml: './krpano/scene/balcony.xml',
      scene: 'balcony',
      krpano: null,
      active: 0
    }
  },
  provide () {
    return {
      getContext: () => ({
        active: this.active
      })
    }
  },
  methods: {
    // 场景切换成功
    onSceneChanged (krpano, name) {
      // 生成查看热点
      this.active = Object.keys(config.hotspot).findIndex(item => item === name)
      this.createHotSpot()
    },
    onInitKrpano (krpano) {
      this.krpano = krpano
      setTimeout(() => {
        // 生成跳转热点
        this.createHotSpot()
      }, 400)
    },
    // 生成热点和查看按钮
    createHotSpot () {
      const {to, look = null} = config.hotspot[this.scene]
      to.forEach(item => {
        this.addhotspot(item, (current, next) => {
          this.scene = item.name
        })
      })
      look && look.forEach(item => {
        this.addhotspot(item, (current, next) => {
          ImagePreview([
            'https://img.yzcdn.cn/1.jpg',
            'https://img.yzcdn.cn/2.jpg'
          ])
        })
      })
    }
  },
  mounted () {
    this.$bus.$on('on-pano-list-click', (item, index) => {
      this.active = index
      this.scene = item.scene
      this.$refs.nav.showBar = true
    })
  }

}
</script>
<style lang="less" scoped>
</style>
