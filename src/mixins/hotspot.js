export default {
  // 动态添加 hotspot
  methods: {
    addhotspot ({ name, ath, atv, title, scene }, callback) {
      const { krpano } = this
      if (!name) {
        name = `hs${((Date.now() + Math.random()) | 0)}`
        krpano.call(`addhotspot(${name})`)
        krpano.set(`hotspot[${name}].url`, './krpano/look.png')
        krpano.set(`hotspot[${name}].distorted`, true)
      } else {
        krpano.call(`addhotspot(${name})`)
        krpano.call(`hotspot[${name}].loadstyle(hotspot_skin)`)
      }
      krpano.set(`hotspot[${name}].ath`, ath)
      krpano.set(`hotspot[${name}].atv`, atv)
      krpano.set(`hotspot[${name}].tooltip`, title)
      krpano.set(`hotspot[${name}].scene`, scene)
      if (krpano.get('device.html5')) {
        krpano.set(`hotspot[${name}].onclick`, function (params) {
          callback && callback(krpano.get('xml.scene'), params)
        }.bind(null, name))
      }
    },
    // 点击 hotspot
    hotspotClick (name) {
      this.scene = name
      // const { krpano } = this
      // krpano.call(`loadscene(${name} , null, MERGE, BLEND(1))`)
      // krpano.call('lookat(145, 0, 130)')
      // krpano.call('set(view.architectural, 1.0)')
      // krpano.call('wait(BLEND)')
      // krpano.call('tween(view.architectural, 0.0, 2.0)')
      // krpano.call('oninterrupt( tween(view.architectural, 0.0, 0.5))')
      // krpano.call('lookto(get(ath),get(atv), 130, smooth(100, 100, 200))')
    }
  }
}
