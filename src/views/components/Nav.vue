<template>
  <div class="bottom-bar">
    <van-goods-action v-if="showBar">
      <div class="tc" @click="onChange">
        <van-icon name="wap-nav" />
        <p>切换场景</p>
      </div>
      <div class="vui-flex-item tr">
        <div class="vui-flex vui-flex-right">
          <div class="tc mr30" @click="onStar">
            <van-icon name="good-job-o" />
            <p>5</p>
          </div>
          <div class="tc" @click="onComment">
            <van-icon name="chat-o" />
            <p>说一说</p>
          </div>
        </div>
      </div>
    </van-goods-action>
    <van-overlay :show="overlay" :custom-style="style" @click="onOverlayClick" />
    <transition name="fade">
      <PanoList v-if="show" />
    </transition>
  </div>
</template>
<script>
import PanoList from './PanoList'
import { Toast } from 'vant'
export default {
  components: {
    PanoList
  },
  data () {
    return {
      showBar: true,
      overlay: true,
      show: false
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
    onChange () {
      this.show = true
      this.showBar = false
    },
    onOverlayClick () {
      this.overlay = true
      this.show = false
      this.showBar = true
    },
    onStar () {
      Toast('点赞')
    },
    onComment () {
      Toast('说一说')
    }
  }
}
</script>
<style lang="less" scoped>
.bottom-bar {
  .van-goods-action {
    padding: 10px;
    color: #fff;
    font-size: 14px;
    background: transparent;
    z-index: 99;
    .van-icon {
      color: #fff;
      font-size: 24px;
      margin: auto;
      cursor: pointer;
    }
  }
}
.van-overlay {
  z-index: 999;
}
</style>
