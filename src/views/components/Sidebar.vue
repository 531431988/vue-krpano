<template>
<div class="sidebar vui-flex vui-flex-dir-top vui-flex-wrap">
  <van-icon name="qr" size="6vw" color="#fff" />
  <van-icon name="music-o" size="6vw" color="#fff" />
  <van-icon name="replay" size="6vw" color="#fff" />
  <van-icon name="expand-o" size="6vw" color="#fff" />
</div>
</template>
<script>
export default {
  methods: {
  }
}
</script>
<style lang="less" scoped>
.sidebar{
  position: absolute;
  height: calc(100% - 120px);
  top: 0;
  right: 0;
  pointer-events: none;
  padding: 15px;
  z-index: 300;
  .van-icon{
    width: 72px;
    height: 72px;
    border-radius: 50%;
    background-color: rgba(52,58,64,.65);
    text-align: center;
    line-height: 72px;
    margin-bottom: 20px
  }
}
</style>