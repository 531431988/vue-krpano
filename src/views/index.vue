<template>
  <div class="krpano">
    <van-overlay :show="overlay" :custom-style="style" @click="onOverlayClick" />
    <Nav @on-click="onNavClick" />
    <transition name="van-slide-up">
      <PanoList :active="active" v-if="show" @on-click="onListClick" />
    </transition>
    <Sidebar @on-click="onSidebarClick" />
    <Krpano @init="onInitKrpano" ref="krpano" :xml="xml" />
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
      xml: './krpano/balcony.xml',
      krpano: null,
      isAutoRotate: false,
      active: 0
    }
  },
  methods: {
    onNavClick () {
      this.show = !this.show
    },
    onSidebarClick (name) {
      const { krpano } = this
      switch (name) {
        case 'auto':
          // 设置自动旋转
          this.isAutoRotate = !this.isAutoRotate
          krpano.set('autorotate.enabled', this.isAutoRotate);
          krpano.set('autorotate.waittime', 1.5);
          krpano.set('autorotate.speed', 10);
          krpano.set('autorotate.accel', 1);
          var hlookat = krpano.get("view.hlookat");
          var vlookat = krpano.get("view.vlookat");
          var fov = krpano.get("view.fov");
          var distortion = krpano.get("view.distortion");
          console.log(
            'hlookat="' + hlookat.toFixed(2) + '" ' +
            'vlookat="' + vlookat.toFixed(2) + '" ' +
            'fov="' + fov.toFixed(2) + '" ' +
            'distortion="' + distortion.toFixed(2) + '"')
          break
        case 'fullscreen':
          krpano.set('fullscreen', true);
          break
        default:
          break;
      }
    },
    onListClick (item, index) {
      this.xml = `./${item.scene}.xml`
      this.active = index
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
          // var h = krpano.get('view.hlookat')
          // var v = krpano.get('view.vlookat')
          // var hs_name = `hs${((Date.now() + Math.random()) | 0)}`
          // krpano.call(`addhotspot(${hs_name})`)
          // krpano.set(`hotspot[${hs_name}].url`, './krpano/test/vtourskin_hotspot.png')
          // krpano.set(`hotspot[${hs_name}].ath`, h)
          // krpano.set(`hotspot[${hs_name}].atv`, v)
          // krpano.set(`hotspot[${hs_name}].distorted`, true)
          // if (krpano.get('device.html5')) {
          //   krpano.set(`hotspot[${hs_name}].onclick`, function (hs) {
          //     alert(`hotspot ${hs} clicked`)
          //   }.bind(null, hs_name))
          // }
          krpano.set("fov_moveforce", -1);
          krpano.set('hlookat_moveforce', 1)
          setTimeout(() => {
            krpano.set('fov_moveforce', 0)
            krpano.set('hlookat_moveforce', 0)
            krpano.set('view.hlookat', 145)
            krpano.set('view.vlookat', 10)
            krpano.set('view.fov', 120)
          }, 1500);
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
