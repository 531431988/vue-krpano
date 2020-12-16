export const loadScript = (src, obj) => {
  if (typeof window[obj] === 'function') {
    // 如果已经加载就直接放回
    return Promise.resolve()
  } else {
    return new Promise(resolve => {
      var script = document.createElement('script')
      script.src = src
      script.async = true
      script.onload = script.onreadystatechange = function () {
        if (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete') {
          resolve()
          script.onload = script.onreadystatechange = null
        }
      }
      document.getElementsByTagName('head')[0].appendChild(script)
    })
  }
}
