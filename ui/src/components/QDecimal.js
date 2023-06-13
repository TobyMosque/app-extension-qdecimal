import { h, ref, toRefs, defineComponent, computed } from 'vue'
import { QInput } from 'quasar'
import { useLocaleState, usePreset, getNumberFormatter, getValueFormatter } from '../composables/locale'

/**
 * @type {import('../..').DefineQDecimal}
 */
const defineQInput = defineComponent

export default defineQInput({
  name: 'QDecimal',
  emits: [...QInput.emits],
  /**
   * @type {import('../..').QDecimalProps}
   */
  props: {
    ...QInput.props,
    modelValue: Number,
    preset: {
      type: String,
      default() {
        return '_default'
      }
    },
    suffix: {
      type: [Boolean, String],
      default() {
        return undefined
      }
    },
    prefix: {
      type: [Boolean, String],
      default() {
        return undefined
      }
    },
    type: {
      type: String,
      default() {
        return undefined
      }
    },
    lang: String,
    mode: {
      type: String,
      validation (value) {
        return ["decimal", "currency", "percent"].indexOf(value) !== -1
      },
      default() {
        return undefined
      }
    },
    currency: {
      type: String,
      validation (value) {
        return !value || value.length === 3
      },
      default() {
        return undefined
      }
    },
    display: {
      type: String,
      validation (value) {
        return ["symbol", "code", "name"].indexOf(value) !== -1
      },
      default() {
        return undefined
      }
    },
    places: {
      type: Number,
      validation (value) {
        return value >= 1 && value <= 16
      },
      default() {
        return undefined
      }
    },
    precision: {
      type: Number,
      validation (value) {
        return value >= 0 && value <= 15
      },
      default() {
        return undefined
      }
    },
    step: {
      type: Number,
      validation (value) {
        return value >= 0
      },
      default() {
        return undefined
      }
    }
  },
  setup (
    /**
     * @type {import('../..').QDecimalProps}
     */
    props, 
    { 
      slots,
      attrs,
      emit,
      expose
    }
  ) {
    const propsRef = toRefs(props)
    /**
     * @type {import('vue').Ref<QInput>}
     */
    const root = ref()

    const { locale: curLocale } = useLocaleState()
    const preset = computed(() => usePreset(propsRef.preset.value))
    const locale = computed(() => propsRef.lang.value || curLocale.value)

    const type = computed(() => {
      return propsRef.type.value === undefined ? preset.value.type.value : propsRef.type.value
    })

    const mode = computed(() => {
      return propsRef.mode.value === undefined ? preset.value.mode.value : propsRef.mode.value
    })

    const currency = computed(() => {
      return propsRef.currency.value === undefined ? preset.value.currency.value : propsRef.currency.value
    })

    const display = computed(() => {
      return propsRef.display.value === undefined ? preset.value.display.value : propsRef.display.value
    })

    const places = computed(() => {
      return propsRef.places.value === undefined ? preset.value.places.value : propsRef.places.value
    })

    const precision = computed(() => {
      if (mode.value === 'percent') {
        return 0
      }
      return propsRef.precision.value === undefined ? preset.value.precision.value : propsRef.precision.value
    })

    const step = computed(() => {
      return propsRef.step.value === undefined ? preset.value.step.value : propsRef.step.value
    })

    const intl = computed(() => {
      return getValueFormatter(locale.value, mode.value, currency.value, display.value, precision.value)
    })

    const apprendText = computed(() => {
      switch (propsRef.mode.value) {
        case 'decimal': return ''
        case 'percent': return '%'
        default: return intl.value.text
      }
    })

    const preffix = computed(() => {
      const prefixPre = propsRef.prefix.value === undefined ? preset.value.preffix.value : propsRef.prefix.value
      return prefixPre ? (typeof prefixPre === "boolean" ? apprendText.value : prefixPre) : null
    }) 

    const suffix = computed(() => {
      const suffixPre = propsRef.suffix.value === undefined ? preset.value.suffix.value : propsRef.suffix.value
      return suffixPre ? (typeof suffixPre === "boolean" ? apprendText.value : suffixPre) : null
    }) 

    const propsParsed = computed(() => {
      return Object.entries(propsRef).reduce((parsed, [key, ref]) => {
        parsed[key] = ref.value
        return parsed
      }, {})
    })

    const formatter = computed(() => {
      if (!preffix.value && !suffix.value) {
        return intl.value.formatter
      }
      return getNumberFormatter(locale.value, precision.value)
    })

    const modelValue = computed({
      get () {
        return formatter.value.format(propsRef.modelValue.value)
      },
      set (value) {
        let onlyNumbers = value.replace(/\D/gi, '') || '0'
        let limit = places.value && places.value + precision.value <= 16 ? places.value + precision.value : 16
        if (onlyNumbers.length > limit) {
          onlyNumbers = onlyNumbers.substring(onlyNumbers.length - limit)
        }
        let interger = parseInt(onlyNumbers)
        let decimal = interger / Math.pow(10, precision.value)
        emit('update:modelValue', parseFloat(decimal))
      }
    })

    const rules = computed(() => {
      if (!propsRef.rules.value || propsRef.rules.value.length) {
        return undefined
      }
      return propsRef.rules.value.map(rule => {
        return () => rule(modelValue.value)
      })
    })

    function validate () {
      return root.value.validate()
    }

    function onFocus () {
      if (!process.env.SERVER) {
        const el = root.value.$el.querySelector('input')
        window.setTimeout(function () {
          el.selectionStart = el.selectionEnd = el.value.length;
        })
      }
    }

    let evt = null
    function updateCursor(event) {
      if (!evt) {
        return
      }
      let len, inc, pos = 1
      switch (true) {
        case !evt.shiftKey && [38, 40].indexOf(evt.keyCode) !== -1:
        case evt.keyCode === 46:
          event.target.selectionStart = event.target.selectionEnd = evt.end
          break
        case evt.keyCode === 8:
        case evt.value !== event.target.value:
          len = { new: event.target.value.length, old: evt.value.length }
          inc = len.new - len.old
          pos = evt.end + inc < 0 ? evt.end : evt.end + inc
          event.target.selectionStart = event.target.selectionEnd = pos
          break
      }
    }
    function checkCursor(event) {
      if (evt && [46, 8].indexOf(evt.keyCode) !== -1 && evt.start === evt.end) {
        let start = evt.keyCode === 46 ? evt.end : evt.end - 1
        let deleted = modelValue.value.substring(start, start + 1)
        if (/\D/.test(deleted)) {
          let pos = evt.keyCode === 46 ? evt.end + 1 : evt.end - 1
          event.target.selectionStart = event.target.selectionEnd = pos
          event.preventDefault();
          return
        }
      }
      setTimeout(() => updateCursor(event), 0)
    }

    function onKeydown (event) {
      evt = {
        start: event.target.selectionStart,
        end: event.target.selectionEnd,
        value: event.target.value,
        shiftKey: event.shiftKey,
        keyCode: event.keyCode
      }
      checkCursor(event)
    }

    function onInput (event) {
      checkCursor(event)
    }

    function onKeyup (event) {
      if (!event.shiftKey) {
        if (event.target !== event.currentTarget) {
          return
        }
        switch (event.keyCode) {
          case 38: 
            emit('update:modelValue', propsRef.modelValue.value + step.value) 
            return
          case 40: 
            const proporsal = propsRef.modelValue.value - step.value
            if (proporsal > 0) {
              emit('update:modelValue', proporsal)
            } else {
              emit('update:modelValue', 0)
            }
            return
        }
      }
      checkCursor(event)
      evt = null
    }

    expose({ validate })

    return () => h(QInput, {
      ref: root,
      class: 'QDecimal',
      ...attrs,
      ...propsParsed.value,
      type: type.value,
      prefix: preffix.value,
      suffix: suffix.value,
      rules: rules.value,
      modelValue: modelValue.value,
      'onUpdate:modelValue' (val) { 
        modelValue.value = val
      },
      onFocus,
      onKeydown,
      onInput,
      onKeyup
    }, slots)
  }
})
