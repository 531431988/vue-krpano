<template>
  <div v-bind="$attrs">
    <Vtour
      @hotspot-click="onHotspotClick"
      :name="$attrs.name"
    />
    <a-modal
      wrapClassName="krpano-modal"
      :visible="detialModal"
      centered
      title="详情"
      :mask="false"
      @cancel="detialModal = false"
      :footer="null"
    >
      详情
    </a-modal>
    <a-modal
      wrapClassName="krpano-modal"
      :visible="videoModal"
      centered
      title="视频"
      :mask="false"
      @cancel="videoModal = false"
      :footer="null"
    >
      视频
    </a-modal>
  </div>
</template>

<script>
import Vtour from './Vtour'
export default {
  components: {
    Vtour
  },
  data () {
    return {
      detialModal: false,
      videoModal: false
    }
  },
  methods: {
    onHotspotClick (hotspot) {
      console.log(hotspot)
      if (hotspot._type === 'video') {
        this.videoModal = true
      } else {
        this.detialModal = true
      }
    }
    // 热点单击事件
  }
}
</script>

<style lang="less">
/* .krpano-modal {
  .ant-modal-header {
    background: #32c3ec;
  }
  .ant-modal-header,
  .ant-modal-footer {
    border: none;
  }
  .ant-modal-content {
    background: transparent;
  }
  .ant-modal-title {
    color: #082730;
    font-family: avenir !important;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  .ant-modal-body {
    color: #208fae;
    background: rgba(33, 90, 93, 0.7);
  }
} */
</style>
