<template>
  <div class="vue-krpano" :id="id"></div>
</template>

<script>
export default {
  props: {
    xml: {
      type: String,
      required: true
    },
    bgcolor: {
      type: String
    },
    scene: {
      type: String
    }
  },
  data () {
    return {
      createLock: false,
      krpano: null
    }
  },
  watch: {
    xml (newXml) {
      if (this.krpano && newXml) {
        this.krpano.call(`loadpano(${newXml},null,IGNOREKEEP)`)
        this.$emit('xmlChanged', newXml)
        this.log(`xml changed: ${newXml}`)
      }
    },
    scene: function () {
      this.loadScene()
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
        throw new Error('krpano player is required')
      }
      if (!this.createLock) {
        this.createLock = true
        embedpano({
          swf: './public/krpano/krpano.swf',
          xml: this.xml,
          // 嵌入容器id
          target: this.id,
          // 当前全景id，javascript接口调用会使用此id
          id: `${this.id}-obj`,
          // 背景颜色
          bgcolor: '#000000',
          // html5模式
          html5: 'prefer',
          // flash：'auto', // flash模式
          // vars:{},// 在xml加载解析后设置启动变量
          // initvars: {},// 在xml加载解析前设置启动变量，可以在地址进行查询（our.html?initvars.variable=value）
          // 基本路径 （相对于krpano.swf）
          basepath: './',
          consolelog: false,
          // 是否启用鼠标滚轮
          mwheel: true,
          // 启用url查询参数（ html5, flash, wmode, mobilescale, fakedevice, initvars）作为变量传递，如tour.html?html5=only&startscene=scene2&initvars.design=flat
          passQueryParameters: true,
          // 准备就绪回调函数
          onready: this.krpanoOnreadyCallback
        })
      }
    },
    krpanoOnreadyCallback (krpano) {
      this.krpano = krpano
      this.log('创建成功')
      this.$emit('init', this.krpano)
      this.createLock = false
    },
    loadScene () {
      const { krpano, scene } = this
      if (krpano) {
        if (scene) {
          krpano.call(`loadscene(${scene}, null, MERGE, BLEND(1))`)
          krpano.call('lookat(145, 0, 130)')
          krpano.call('set(view.architectural, 1.0)')
          krpano.call('wait(BLEND)')
          krpano.call('tween(view.architectural, 0.0, 2.0)')
          krpano.call('oninterrupt( tween(view.architectural, 0.0, 0.5))')
          krpano.call('lookto(0, 0, 130, smooth(100, 100, 200))')
          this.log(`scene changed: ${scene}`)
          this.$emit('change', krpano, scene)
        } else {
          krpano.call('loadscene(get(scene[0].name),null,MERGE,BLEND(0.5))')
        }
      }
    },
    log (content) {
      if (this.debug) {
        if (this.krpano) {
          content = `[${this.krpano.id}]${content}`
        }
        console.debug(content)
      }
    }
  },
  mounted () {
    this.createPano()
    this.$on(['init', 'xmlChanged'], this.loadScene)
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
  width: 100%;
  height: 100%;
}
</style>
