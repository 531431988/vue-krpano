
const path = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
const env = process.env.NODE_ENV === 'production'
const resolve = dir => path.join(__dirname, dir)
module.exports = {
  chainWebpack: config => {
    // 来将 svg 图标作为 Vue 组件导入
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear();
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
    // 修复HMR
    // config.resolve.symlinks(true)
    // 删除moment除zh-cn中文包外的其它语言包，无需在代码中手动引入zh-cn语言包。
    // config
    //   .plugin('ignore')
    //   .use(
    //     new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn$/)
    //   )
    // 添加别名
    config.resolve.alias
      //内部为正则表达式  vue结尾的
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))

    config.module
      .rule('swf')
      .test(/\.swf$/)
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        return {
          limit: 10000
        }
      })
    config.module
      .rule('xml')
      .test(/\.xml$/)
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        return {
          limit: 10000
        }
      })
    // 压缩图片
    config.module
      .rule('images')
      .use('image-webpack-loader')
      .loader('image-webpack-loader')
      .options({
        mozjpeg: { progressive: true, quality: 65 },
        optipng: { enabled: false },
        pngquant: { quality: '65-90', speed: 4 },
        gifsicle: { interlaced: false },
        webp: { quality: 75 }
      })
    return config
  },
  configureWebpack: config => {
    config.resolve.extensions = ['.vue', '.js', '.jsx', '.json', '.less', '.css', '.scss', '.jpg', '.png', '.svg']
    if (env) {
      const plugins = []
      // 开启 gzip 压缩
      plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      )
      config.plugins = [...config.plugins, ...plugins]

      // 利用splitChunks单独打包第三方模块
      config.optimization = {
        splitChunks: {
          cacheGroups: {
            libs: {
              name: 'chunk-libs',
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              chunks: 'initial'
            },
            antvUI: {
              name: 'chunk-antvUI',
              priority: 20,
              test: /[\\/]node_modules[\\/]ant-design-vue[\\/]/,
              chunks: 'all'
            }
          }
        }
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  // LESS全局变量
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [resolve('./src/less/theme.less')]
    },
  },
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  productionSourceMap: false
}
