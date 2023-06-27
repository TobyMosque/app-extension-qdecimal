import { QInputSlots } from 'quasar'
import { QInput, QInputProps } from 'quasar'
import { defineComponent, Plugin } from 'vue'
import Component from './src/components/QDecimal'
import { createPreset, usePreset } from './src/composables/locale'

const version: string
const install: Plugin

export {
  version,
  Component,
  createPreset,
  usePreset,
  install
}

export interface QDecimalProps extends QInputProps {
  override modelValue: number
  override type: string
  override suffix: string | boolean,
  override prefix: string | boolean,
  preset: string,
  lang: string,
  mode: "decimal" | "currency" | "percent"
  currency: string,
  display: "symbol" | "narrowSymbol" | "code" | "name",
  places: number,
  precision: number,
  step: number
}

export interface QDecimalPreset {
  type?: string
  suffix: string | boolean,
  prefix: string | boolean,
  mode?: "decimal" | "currency" | "percent"
  currency?: string,
  display?: "symbol" | "code" | "name",
  places?: number,
  precision?: number,
  step?: number
}

export interface QDecimalSlots extends QInputSlots {

}

export type DefineQDecimal = typeof defineComponent<QInputProps, unknown, unknown, QDecimalSlots>