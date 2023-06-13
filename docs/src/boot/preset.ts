import { boot } from 'quasar/wrappers'
import { createPreset } from '@toby.mosque/quasar-ui-qdecimal'
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  createPreset('money', {
    preffix: true,
    mode: 'currency',
    currency: 'BRL',
  })
})
