<template>
  <div class="sidebar vui-flex vui-flex-dir-top vui-flex-wrap">
    <van-icon name="qr" size="6vw" color="#fff" />
    <van-icon name="music-o" size="6vw" color="#fff" />
    <van-icon name="replay" size="6vw" color="#fff" @click="onClick('auto')" />
    <!-- <van-icon name="expand-o" size="6vw" color="#fff" @click="onClick('fullscreen')" /> -->
  </div>
</template>
<script>
export default {
  props: ['krpano'],
  data () {
    return {
      isAutoRotate: true
    }
  },
  methods: {
    onClick (name) {
      const { krpano } = this
      switch (name) {
        case 'auto':
          // 设置自动旋转
          this.isAutoRotate = !this.isAutoRotate
          krpano.set('autorotate.enabled', this.isAutoRotate)
          // 获取当前视角
          var hlookat = krpano.get('view.hlookat')
          var vlookat = krpano.get('view.vlookat')
          var fov = krpano.get('view.fov')
          var distortion = krpano.get('view.distortion')
          console.log(`hlookat="${hlookat.toFixed(2)}" vlookat="${vlookat.toFixed(2)}" fov="${fov.toFixed(2)}" distortion="${distortion.toFixed(2)}"`)
          break
        case 'fullscreen':
          krpano.set('fullscreen', true)
          break
        default:
          break
      }
    }
  }
}
</script>
<style lang="less" scoped>
.sidebar {
  position: absolute;
  height: calc(100% - 120px);
  top: 0;
  right: 0;
  padding: 15px;
  z-index: 300;
  .van-icon {
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background-color: rgba(52, 58, 64, 0.65);
    text-align: center;
    line-height: 72px;
    margin-bottom: 20px;
  }
}
</style>
