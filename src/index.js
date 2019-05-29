const extendDatetimePicker = function (conf) {
  conf.boot.push('~quasar-app-extension-qdecimal/src/boot/qdecimal.js')
  conf.build.transpileDependencies.push(/quasar-app-extension-qdecimal[\\/]src/)
  conf.css.push('~quasar-app-extension-qdecimal/src/component/qdecimal.styl')
}

module.exports = function (api) {
  var compatibleWith = api.compatibleWith || function (_, version) {
    return api.compatibleWithQuasarApp(version)
  }
  compatibleWith('@quasar/app', '^1.0.0-beta.23')

  api.registerDescribeApi('QDecimal', './component/QDecimal.json')
  api.extendQuasarConf(extendDatetimePicker)
}
