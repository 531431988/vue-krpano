module.exports = {
  plugins: {
    autoprefixer: {},
    // px to vw
    'postcss-px-to-viewport': {
      unitToConvert: 'px',
      viewportWidth: 750,
      unitPrecision: 5,
      propList: ['*', '!border-width'],
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: ['.exclude'],
      minPixelValue: 1,
      mediaQuery: false,
      replace: true,
      exclude: [],
      landscape: false,
      landscapeUnit: 'vw',
      landscapeWidth: 1334,
      viewportHeight: 1334
    },
    // VW兼容适配
    // "postcss-viewport-units": {},
  }
}
