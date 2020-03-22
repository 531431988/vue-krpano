<template>
  <div class="krpano">
    <Krpano ref="krpano" xml="./krpano/test/test.xml" />
    <van-overlay :show="overlay" :custom-style="style" @click="onClick"/>
    <Nav @on-click="onNavClick" />
    <transition name="van-slide-up">
      <PanoList v-if="show" />
    </transition>
  </div>
</template>

<script>
import { Krpano } from '@/components'
import { Nav, PanoList } from './components'
export default {
  components: {
    Krpano,
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
      show: false
    }
  },
  methods: {
    onNavClick () {
      this.show = !this.show
    },
    onClick () {
      this.overlay = true
      this.show = false
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
