<template>
  <div class="sidebar vui-flex vui-flex-dir-top vui-flex-wrap">
    <van-icon name="qr" @click="showQrcode = true" />
    <van-icon name="music-o" :class="{active: isAutoPlay}" @click="onClick('music')" />
    <van-icon name="replay" :class="{active: isAutoRotate}" @click="onClick('auto')" />
    <van-icon name="expand-o" :class="{active: isFullscreen}" @click="onClick('fullscreen')" />
    <van-overlay :show="showQrcode" @click="showQrcode = false">
      <div class="qrcode">
        <van-image @click.stop width="10rem" height="10rem" fit="cover" :src="qrcode" />
      </div>
    </van-overlay>
  </div>
</template>
<script>
import qrcode from '../../assets/imgs/qrcode'
export default {
  props: ['krpano'],
  components: {
  },
  data () {
    return {
      qrcode: qrcode,
      showQrcode: false,
      isAutoRotate: false,
      isFullscreen: false,
      isAutoPlay: true
    }
  },
  methods: {
    onClick (name) {
      const { krpano } = this
      switch (name) {
        case 'auto':
          // 设置自动旋转
          this.isAutoRotate = !this.isAutoRotate
          krpano.call('switch(autorotate.enabled)')
          // 获取当前视角
          var hlookat = krpano.get('view.hlookat')
          var vlookat = krpano.get('view.vlookat')
          var fov = krpano.get('view.fov')
          var distortion = krpano.get('view.distortion')
          console.log(`hlookat="${hlookat.toFixed(2)}" vlookat="${vlookat.toFixed(2)}" fov="${fov.toFixed(2)}" distortion="${distortion.toFixed(2)}"`)
          break
        case 'fullscreen':
          // krpano.call('switch(fullscreen)')
          this.$fullscreen.toggle(document.querySelector('#app'), {
            wrap: false,
            callback: (fullscreen) => {
              this.isFullscreen = fullscreen
            }
          })
          break
        case 'music':
          this.isAutoPlay = !this.isAutoPlay
          console.log(this.isAutoPlay)
          if (this.isAutoPlay) {
            krpano.call('bgsnd_start')
          } else {
            krpano.call('bgsnd_stop')
          }
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
  // height: calc(100% - 120px);
  top: 0;
  right: 0;
  padding: 15px;
  z-index: 1000;
  .van-icon {
    height: 36px;
    width: 36px;
    line-height: 36px;
    border-radius: 50%;
    background-color: rgba(52, 58, 64, 0.65);
    text-align: center;
    margin-bottom: 10px;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    &.active {
      background: @primary-color;
    }
  }
  .qrcode {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}
</style>
