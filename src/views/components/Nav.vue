<template>
<van-goods-action>
  <div class="tc" @click="onClick">
    <van-icon class="scene-btn" name="wap-nav" size="6vw" color="#fff" />
    <p>场景选择</p>
  </div>
  <div class="vui-flex-item tr">
    <div class="vui-flex vui-flex-right">
      <div class="tc mr30">
        <van-icon class="scene-btn" name="good-job-o" size="6vw" color="#fff" />
        <p>5</p>
      </div>
      <div class="tc">
        <van-icon class="scene-btn" name="chat-o" size="6vw" color="#fff" />
        <p>说一说</p>
      </div>
    </div>
  </div>
</van-goods-action>
</template>
<script>
export default {
  methods: {
    onClick () {
      this.$emit('on-click')
    }
  }
}
</script>
<style lang="less" scoped>
.van-goods-action {
  padding: 10px;
  color: #fff;
  font-size: 14px;
  background: transparent;
  z-index: 99;
  height: 120px;
  .scene-btn{
    margin: auto;
    width: 56px;
    height: 56px;
    border-radius: 100px;
  }
}
</style>