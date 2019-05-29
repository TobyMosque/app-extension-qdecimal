import Vue from 'vue'

import {
  QField,
  QInput
} from 'quasar'

export default function (ssrContext) {
  return Vue.extend({
    name: 'QDecimal',
    mixins: [ QField ],
    props: {
      value: Number,
      lang: String,
      suffix: [String, Boolean],
      prefix: [String, Boolean],
      type: {
        type: String,
        default: "tel"
      },
      mode: {
        type: String,
        default: "decimal",
        validation (value) {
          return ["decimal", "currency", "percent"].indexOf(value) !== -1
        }
      },
      currency: {
        type: String,
        validation (value) {
          return !value || value.length === 3
        }
      },
      display: {
        type: String,
        default: "symbol",
        validation (value) {
          return ["symbol", "code", "name"].indexOf(value) !== -1
        }
      },
      precision: {
        type: Number,
        default: 2,
        validation (value) {
          return value >= 0
        }
      },
      step: {
        type: Number,
        default: 1,
        validation (value) {
          return value >= 0
        }
      }
    },
    data () {
      return {
        currencyText: ''
      }
    },
    computed: {
      language () {
        return (this.lang || this.$q.lang.isoName || navigator.language) + '-u-nu-latn'
      },
      intl () {
        return {
          language: this.language,
          options: { 
            style: this.mode, 
            currency: this.currency, 
            currencyDisplay: this.display, 
            minimumFractionDigits: this.cPrecision, 
            maximumFractionDigits: this.cPrecision
          }
        }
      },
      valueFormatter () {
        return Intl.NumberFormat(this.intl.language, this.intl.options)
      },
      numberFormatter () {
        return Intl.NumberFormat(this.intl.language, { style: 'decimal', minimumFractionDigits: this.cPrecision, maximumFractionDigits: this.cPrecision })
      },
      formatter () {
        if (!this.prefix && !this.suffix) {
            return this.valueFormatter
        }
        if (typeof this.prefix === "boolean" || typeof this.suffix === "boolean") {
            return this.numberFormatter
        }
        return this.valueFormatter
      },
      cPrecision () {
        return this.mode === 'percent' ? 0 : this.precision
      },
      cPrefix () {
        return this.prefix ? (typeof this.prefix === "boolean" ? this.currencyText : this.prefix) : null
      },
      cSuffix () {
        return this.suffix ? (typeof this.suffix === "boolean" ? this.currencyText : this.suffix) : null
      },
      cValue: {
        get () { 
          return this.formatter.format(this.value)
        },
        set (value) {
          let onlyNumbers = value.replace(/\D/gi, '') || '0'
          let interger = parseInt(onlyNumbers)
          let decimal = interger / Math.pow(10, this.cPrecision)
          this.$emit('input', parseFloat(decimal))
        },
      }
    },
    watch: {
      intl: {
        immediate: true,
        handler () {
          switch(this.mode)
          {
            case 'decimal': 
              this.currencyText = ''
              break
            case 'percent': 
              this.currencyText = '%'
              break
            default:
              var number = 12.34
              var texts = {
                value: this.valueFormatter.format(number),
                number: this.numberFormatter.format(number)
              }
              this.currencyText = texts.value.replace(texts.number, '').trim()
              break
          }
        }
      }
    },
    render (h) {
      var self = this
      var attrs = { ...self.$attrs };
      var props = { ...self.$props, value: self.cValue }
      props.prefix = self.cPrefix
      props.suffix = self.cSuffix
      return h(QInput, {
        ref: 'input',
        props: props,
        attrs: attrs,
        on: {
          input (value) {
            self.cValue = value
          },
          keyup (event) {
            if (event.target !== event.currentTarget) {
              return
            }
            if (!event.shiftKey) {
              switch (event.keyCode) {
                case 38: 
                  self.$emit('input', self.value + self.step) 
                  break
                case 40: 
                  if (self.value - self.step > 0) {
                    self.$emit('input', self.value - self.step)
                  } else {
                    self.$emit('input', 0)
                  }
                  break
              }
            }
          },
          focus () {
            var el = self.$refs.input.$refs.input
            window.setTimeout(function () {
              el.selectionStart = el.selectionEnd = el.value.length;
            })
          }
        }
      }, [])
    }
  })
}