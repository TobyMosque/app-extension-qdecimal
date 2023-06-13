/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

function extendWebpackConf (conf) {
  // register our boot file
  conf.boot.push('~@toby.mosque/quasar-app-extension-qdecimal/src/boot/register.js')

  // make sure app extension files & ui package gets transpiled
  conf.build.transpileDependencies.push(/@toby.mosque[\\/]quasar-app-extension-qdecimal[\\/]src/)

  // make sure the stylesheet goes through webpack to avoid SSR issues
  conf.css.push('~@toby.mosque/quasar-ui-qdecimal/src/index.sass')
}

function extendViteConf (conf) {
  // register our boot file
  conf.boot.push('~@toby.mosque/quasar-app-extension-qdecimal/src/boot/register.js')

  // make sure the stylesheet goes through webpack to avoid SSR issues
  conf.css.push('~@toby.mosque/quasar-ui-qdecimal/src/index.sass')
}

module.exports = function (api) {
  // Quasar compatibility check; you may need
  // hard dependencies, as in a minimum version of the "quasar"
  // package or a minimum version of "@quasar/app-*" CLI
  api.compatibleWith('quasar', '^2.0.0')
  if (api.hasVite) {
    api.compatibleWith('@quasar/app-vite', '^1.0.0')
    // We extend /quasar.conf.js
    api.extendQuasarConf(extendViteConf)
  }
  else if (api.hasWebpack) {
    api.compatibleWith('@quasar/app-webpack', '^3.4.0')
    // We extend /quasar.conf.js
    api.extendQuasarConf(extendWebpackConf)
  }

  // Uncomment the line below if you provide a JSON API for your component
  // api.registerDescribeApi('QDecimal', '~@toby.mosque/quasar-ui-qdecimal/src/components/QDecimal.json')
}
