<template>
  <div class="krpano">
    <Nav />
    <!-- <PanoList :active="active" v-if="show" @on-click="onListClick" /> -->
    <Sidebar :krpano="krpano" />
    <Krpano @init="onInitKrpano" @change="onSceneChanged" ref="krpano" :xml="xml" :scene="scene" />
  </div>
</template>

<script>
import { Krpano } from '@/components'
import { Sidebar, Nav, PanoList } from './components'
import config from '@/config'
import hotspot from '@/mixins/hotspot'
import { ImagePreview } from 'vant'
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
      xml: './krpano/balcony.xml',
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
      }, 1000)
    },
    // 生成热点和查看按钮
    createHotSpot () {
      config.hotspot[this.scene].to.forEach(item => {
        this.addhotspot(item, (current, next) => {
          this.scene = item.name
        })
      })
      let look = config.hotspot[this.scene].look
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
      const { krpano } = this
      this.scene = item.scene
    })
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
