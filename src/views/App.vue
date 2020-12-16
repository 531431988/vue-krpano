<template>
  <div id="app">
    <a-tree-select
      v-model="value"
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
    <Krpano
      @init="onInitKrpano"
      @change="onSceneChanged"
      ref="krpano"
      :xml="xml"
    />
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
      value: undefined,
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
      xml: '../vtour/scene/zyg.xml',
      krpano: null
    }
  },
  methods: {
    onSelect (value, node) {
      this.xml = `../scene/${node.dataRef.scene}.xml`
      this.createHotSpot()
    },
    onInitKrpano (krpano) {
      this.krpano = krpano
      this.createHotSpot()
    },
    // 场景切换成功
    onSceneChanged (krpano) {
      console.log('场景切换成功')
      this.createHotSpot()
    },
    createHotSpot () {
      const name = 'demo'
      const { krpano } = this
      setTimeout(() => {
        if (krpano.get('device.html5')) {
          krpano.call(`addhotspot(${name})`)
          krpano.call(`hotspot[${name}].loadstyle(hotspot_skin_look)`)
          krpano.set(`hotspot[${name}].ath`, 171.925)
          krpano.set(`hotspot[${name}].atv`, 7.188)
          krpano.set(`hotspot[${name}].scale`, 0.5)
          krpano.set(`hotspot[${name}].tooltip`, '测试')
          krpano.set(`hotspot[${name}].onclick`, function (params) {
            console.log(krpano.get('xml.scene'), params)
            console.log(krpano.get('hotspot'))
          }.bind(null, name))
        }
      }, 500)
    }
  },
  mounted () {
  }

}
</script>
<style lang="less" scoped>
</style>
