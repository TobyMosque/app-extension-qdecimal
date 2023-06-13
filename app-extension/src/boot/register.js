import { boot } from 'quasar/wrappers'
import VuePlugin from '@toby.mosque/quasar-ui-qdecimal'

export default boot(({ app }) => {
  app.use(VuePlugin)
})
