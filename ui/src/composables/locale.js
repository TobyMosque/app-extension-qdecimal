import { computed, reactive, toRefs, useSSRContext } from 'vue'
import { Quasar } from 'quasar'

/**
 * @type {Map<string, { formatter: Intl.NumberFormat, text: String }>}
 */
const valueFormatters = new Map()
/**
 * @type {Map<string, Intl.NumberFormat>}
 */
const numberFormatters = new Map()
/**
 * @type {Map<string, import('vue').ToRefs<import('../..').QDecimalPreset>>}
 */
const presets = new Map()

function detectLocale () {
  let languages = []
  if (process.env.SERVER) {
    const ssrContext = useSSRContext()
    if (ssrContext) {
      languages = (ssrContext.req.headers['accept-language'] || '')
        .split(',')
        .map((locale) => {
          const parts = locale.split(';');
          return {
          lang: parts[0],
          q: parts.length > 1 ? parseFloat(parts[1].substring(2)) : 1,
          };
        })
        .sort((a, b) => b.q - a.q)
        .map((item) => item.lang);
    }
  } else {
    languages = [...window.navigator.languages];
  }
  return languages && languages.length ? languages[0] : 'en'
}

/**
 * 
 * @param {String} lang 
 * @param {Number} precision
 * @returns {Intl.NumberFormat}
 */
export function getNumberFormatter(lang, precision) {
  const name = `${lang}-${precision}`
  if (!numberFormatters.has(name)) {
    const formatter = new Intl.NumberFormat(lang, {
      style: 'decimal',
      minimumFractionDigits: precision,
      maximumFractionDigits: precision
    })
    numberFormatters.set(name, formatter)
  }
  return numberFormatters.get(name)
}

/**
 * 
 * @param {String} lang 
 * @param {String} style 
 * @param {String} currency 
 * @param {String} display 
 * @param {Number} precision
 * @returns {{ formatter: Intl.NumberFormat, text: String }}
 */
export function getValueFormatter(lang, style, currency, display, precision) {
  const name = `${lang}-${style}-${currency}-${display}-${precision}`
  if (!valueFormatters.has(name)) {
    const formatter = new Intl.NumberFormat(lang, {
      style: style,
      currency: currency,
      currencyDisplay: display,
      minimumFractionDigits: precision,
      maximumFractionDigits: precision
    })

    const numberFormatter = getNumberFormatter(lang, precision)
    const value = 12.34
    const formatted = {
      value: formatter.format(value),
      numeric: numberFormatter.format(value)
    }
    const text = formatted.value.replace(formatted.numeric, '').trim()
    valueFormatters.set(name, { formatter, text })
  }
  
  return valueFormatters.get(name)
}

export function createPreset(
  /**
   * @type {string}
   */
  name, 
  /**
   * @type {import('../..').QDecimalPreset | undefined}
   */
  {
    type = 'tef',
    preffix = undefined,
    suffix = undefined,
    mode = 'decimal',
    currency = undefined,
    display = 'symbol',
    places = undefined,
    precision = 2,
    step = 1
  } = {}) {
  const refs = toRefs(reactive({ type, preffix, suffix, mode, currency, display, places, precision,step }))
  presets.set(name, refs)
}

export function usePreset(
  /**
   * @type {string | undefined}
   */
  name
) {
  if (!presets.has(name || _default)) {
    createPreset(name || _default)
  }
  return presets.get(name || _default)
}

export function useLocaleState() {
  const initial = detectLocale()
  const locale = computed(() => Quasar.lang.isoName || initial)

  return {
    locale
  }
}