<template>
  <div id="app">
    <a-tree-select
      style="position:absolute;z-index: 1;width: 200px"
      :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
      :tree-data="treeData"
      placeholder="选择站点"
      tree-default-expand-all
      @select="onSelect"
    >
      <span
        v-if="key === '0-0-1'"
        slot="title"
        slot-scope="{ key, value }"
        style="color: #08c"
      >
        中驿馆
      </span>
    </a-tree-select>
    <Krpano :name="name" />
  </div>
</template>

<script>
import { Krpano } from '@/components'
// import './vtour/hotspot/json/zyg.json'
export default {
  components: {
    Krpano
  },
  data () {
    return {
      treeData: [
        {
          title: '黄冈市',
          value: '0-0',
          key: '0-0',
          children: [
            {
              value: '0-0-1',
              key: '0-0-1',
              scene: 'zyg',
              scopedSlots: {
                title: 'title'
              }
            },
            {
              title: '黄梅馆',
              value: '0-0-2',
              key: '0-0-2',
              scene: 'hmg'
            }
          ]
        },
        {
          title: '黄石市',
          value: '0-1',
          key: '0-1'
        }
      ],
      name: 'zyg'
    }
  },
  methods: {
    onSelect (value, node) {
      this.name = node.dataRef.scene
    }

  },
  mounted () {
  }

}
</script>
<style lang="less" scoped>
</style>
