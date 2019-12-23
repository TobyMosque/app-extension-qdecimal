import QDecimal from 'quasar-app-extension-qdecimal/src/component/QDecimal.js'

export default ({ Vue, ssrContext }) => {
  Vue.component('q-decimal', QDecimal({ ssrContext }))
}