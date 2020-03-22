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
    wmode: {
      type: String, default: "opaque"
    },
    vars: {
      type: Object
    },
    initvars: {
      type: Object
    },
    basepath: {
      type: String
    },
    mwheel: {
      type: Boolean, default: false
    },
    focus: {
      type: Boolean, default: true
    },
    consolelog: {
      type: Boolean, default: false
    },
    mobilescale: {
      type: Number, default: 0.5
    },
    fakedevice: {
      type: String
    },
    passQueryParameters: {
      type: Boolean, default: false
    },
    webglsettings: {
      type: Object
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
        this.krpano.call(`loadpano(${newXml},null,IGNOREKEEP)`);
        this.$emit("xmlChanged", newXml);
        this.log("xml changed: " + newXml);
      }
    },
    scene: function () {
      this.loadScene();
    }
  },
  computed: {
    id () {
      return `krpano-${this._uid}`
    }
  },
  methods: {
    createPano () {
      const { embedpano, removepano } = window;
      if (!(embedpano && removepano)) {
        throw new Error("krpano player is required");
      }
      if (!this.createLock) {
        this.createLock = true;
        embedpano({
          swf: './public/krpano/krpano.swf',
          id: `${this.id}-obj`,
          xml: this.xml,
          target: this.id,
          consolelog: true,
          passQueryParameters: true,
          html5: 'auto',
          onready: this.krpanoOnreadyCallback
        });
      }
    },
    krpanoOnreadyCallback (krpano) {
      this.krpano = krpano
      this.krpano.hooks = this.hooks;
      this.log('创建成功');
      this.$emit("panoCreated", this.krpano);
      this.createLock = false;
      console.log(this.krpano)
    },
    loadScene () {
      let scene = this.scene;
      if (this.krpano) {
        if (scene) {
          let str = `if(scene[${scene}]===null,
                        loadscene(get(scene[0].name),null,MERGE,BLEND(0.5)),
                        loadscene(${scene},null,MERGE,BLEND(0.5)))`;
          this.krpano.call(str);
          this.log("scene changed: " + scene);
          this.$emit("sceneChanged", scene);

        } else {
          this.krpano.call("loadscene(get(scene[0].name),null,MERGE,BLEND(0.5))");
        }
      }
    },
    log (content) {
      if (this.debug) {
        if (this.krpano) {
          content = "[" + this.krpano.id + "] " + content;
        }
        console.debug(content);
      }
    }
  },
  mounted () {
    this.createPano()
    this.$on(["panoCreated", "xmlChanged"], this.loadScene);
  },
  beforeDestroy () {
    this.$destroy(true)
    const { removepano } = window;
    if (this.krpano) {
      removepano(this.krpano.id);
      delete this.krpano;
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
