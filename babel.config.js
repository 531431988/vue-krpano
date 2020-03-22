const plugins = ['@vue/babel-plugin-transform-vue-jsx']
// 生产环境移除console
if (process.env.NODE_ENV === 'production') {
  plugins.push('transform-remove-console')
}
module.exports = {
  presets: [
    [
      '@vue/app',
      {
        modules: false,
        targets: {
          browsers: ['> 1%', 'last 2 versions', 'not ie <= 8', 'Android >= 4', 'iOS >= 8']
        },
        useBuiltIns: 'entry'
      }
    ]
  ],
  plugins: [
    ...plugins,
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'lib',
        style: name => `${name}/style/less`
      }, 'vant'
    ]
  ]
}
