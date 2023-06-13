import Component from './components/QDecimal'
import { createPreset, usePreset } from './composables/locale'


const version = __UI_VERSION__

function install (app) {
  app.component(Component.name, Component)

}

export {
  version,
  Component,
  createPreset,
  usePreset,
  install
}
