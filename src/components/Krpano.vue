<template>
  <div v-bind="$attrs">
    <Vtour
      @hotspot-click="onHotspotClick"
      :name="$attrs.name"
    />
    <a-modal
      :visible="detialModal"
      centered
      title="详情"
      :mask="false"
      @cancel="detialModal = false"
      @ok="detialModal = false"
    >
      详情
    </a-modal>
    <a-modal
      :visible="videoModal"
      centered
      title="视频"
      :mask="false"
      @cancel="videoModal = false"
      @ok="videoModal = false"
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

<style lang="less" scoped>
</style>
