<template>
  <div
    class="vue-krpano"
    :id="id"
    v-bind="$attrs"
  ></div>
</template>

<script>
export default {
  data () {
    return {
      krpano: null
    }
  },
  watch: {
    '$attrs.name' (newXml) {
      if (this.krpano && newXml) {
        this.krpano.call(`loadpano(${newXml}.xml,null,IGNOREKEEP);loadscene(scene_01);`)
        this.createHotSpot()
      }
    }
  },
  computed: {
    id () {
      return `krpano-${this._uid}`
    }
  },
  methods: {
    createPano () {
      const { embedpano, removepano } = window
      if (!(embedpano && removepano)) {
        throw new Error('需要krpano播放器')
      }
      if (!this.createLock && !this.krpanoObj) {
        this.createLock = true
        embedpano({
          // 当前全景id，javascript接口调用会使用此id
          id: `${this.id}-obj`,
          // 嵌入容器id
          target: this.id,
          // swf: './public/vtour/tour.swf',
          xml: `./vtour/scene/${this.$attrs.name}.xml`,
          // 背景颜色
          // bgcolor: '#000000',
          // html5模式
          html5: 'only',
          // flash：'auto', // flash模式
          // vars:{},// 在xml加载解析后设置启动变量
          // initvars: {},// 在xml加载解析前设置启动变量，可以在地址进行查询（our.html?initvars.variable=value）
          // 基本路径 （相对于krpano.swf）
          basepath: './vtour/',
          consolelog: false,
          // 是否启用鼠标滚轮
          mwheel: true,
          // 启用url查询参数（ html5, flash, wmode, mobilescale, fakedevice, initvars）作为变量传递，如tour.html?html5=only&startscene=scene2&initvars.design=flat
          passQueryParameters: true,
          // 准备就绪回调函数
          onready: krpano => {
            this.krpano = krpano
            this.createHotSpot()
            this.$emit('init', this.krpano)
          }
        })
      }
    },
    // 动态创建热点
    createHotSpot () {
      setTimeout(() => {
        const { krpano } = this
        const _this = this
        this.scene = krpano.get('xml.scene')
        const { look } = require(`../../public/vtour/hotspot/json/${this.$attrs.name}.json`)[this.scene] || []
        look && look.forEach(({ id, name = '', ath, atv, text, icon = '', type = '' }) => {
          name += `hs${((Date.now() + Math.random()) | 0)}`
          krpano.call(`addhotspot(${name})`)
          if (icon === 'pointer') {
            krpano.call(`hotspot[${name}].loadstyle(hotspot_skin_pointer)`)
          } else {
            krpano.call(`hotspot[${name}].loadstyle(hotspot_skin_look)`)
          }
          krpano.set(`hotspot[${name}].ath`, ath)
          krpano.set(`hotspot[${name}].atv`, atv)
          krpano.set(`hotspot[${name}].scale`, 0.5)
          krpano.set(`hotspot[${name}].tooltip`, text)
          krpano.set(`hotspot[${name}]._id`, id)
          krpano.set(`hotspot[${name}]._type`, type)
          if (krpano.get('device.html5')) {
            krpano.set(`hotspot[${name}].onclick`, function (params) {
              const hotspot = krpano.get(`hotspot[${name}]`)
              _this.$emit('hotspot-click', hotspot)
            }.bind(null, name))
          }
        })
      }, 1000)
    }
  },
  mounted () {
    this.createPano()
    // 切换场景
    window.changeScene = krpano => {
      this.createHotSpot()
      this.$emit('change', krpano)
    }
  },
  beforeDestroy () {
    const { removepano } = window
    if (this.krpano) {
      removepano(this.krpano.id)
      delete this.krpano
    }
  }
}
</script>

<style lang="less" scoped>
.vue-krpano {
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  position: absolute;
}
</style>
