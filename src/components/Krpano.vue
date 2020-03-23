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
          target: this.id,  // 嵌入容器id
          id: `${this.id}-obj`, // 当前全景id，javascript接口调用会使用此id
          bgcolor: '#000000', // 背景颜色
          html5: 'prefer',   // html5模式
          // flash：'auto', // flash模式
          // vars:{},// 在xml加载解析后设置启动变量
          // initvars: {},// 在xml加载解析前设置启动变量，可以在地址进行查询（our.html?initvars.variable=value）
          basepath: './',// 基本路径 （相对于krpano.swf）
          consolelog: false,
          mwheel: true,  // 是否启用鼠标滚轮
          // 启用url查询参数（ html5, flash, wmode, mobilescale, fakedevice, initvars）作为变量传递，如tour.html?html5=only&startscene=scene2&initvars.design=flat
          passQueryParameters: true,
          onready: this.krpanoOnreadyCallback  // 准备就绪回调函数
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
      let scene = this.scene
      if (this.krpano) {
        if (scene) {
          let str = `if(scene[${scene}]===null,
                        loadscene(get(scene[0].name),null,MERGE,BLEND(0.5)),
                        loadscene(${scene},null,MERGE,BLEND(0.5)))`
          this.krpano.call(str)
          this.log(`scene changed: ${scene}`)
          this.$emit('sceneChanged', scene)
        } else {
          this.krpano.call('loadscene(get(scene[0].name),null,MERGE,BLEND(0.5))')
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
    console.log(this.show)
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
