export const addhotspot = (krpano, ath, atv, callback) => {
  let name = `hs${((Date.now() + Math.random()) | 0)}`

  ath = ath || krpano.get('view.hlookat')
  atv = atv || krpano.get('view.vlookat')
  krpano.call(`addhotspot(${name})`)
  krpano.set(`hotspot[${name}].url`, './krpano/look.png')
  // krpano.set(`hotspot[${name}].loadstyle(hotspot_skin)`)
  krpano.set(`hotspot[${name}].ath`, ath)
  krpano.set(`hotspot[${name}].atv`, atv)
  if (krpano.get('device.html5')) {
    krpano.set(`hotspot[${name}].onclick`, function (params) {
      callback && callback(params)
      // krpano.call('loadscene(parlour, null, MERGE, BLEND(1))')
      // krpano.call('lookat(145, 0, 130)')
      // krpano.call('set(view.architectural, 1.0)')
      // krpano.call('wait(BLEND)')
      // krpano.call('tween(view.architectural, 0.0, 2.0)')
      // krpano.call('oninterrupt( tween(view.architectural, 0.0, 0.5))')
      // krpano.call('lookto(0, 0, 130, smooth(100, 100, 200))')
    }.bind(null, name))
  }
}

