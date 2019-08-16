QDecimal (quasar-app-extension-qdecimal)
===

QDecimal is a `UI App Extension` for [Quasar Framework v1](https://v1.quasar-framework.org/). It will not work with legacy versions of Quasar Framework.

This work is currently in `alpha` and minor changes may still happen. Your help with testing is greatly appreciated.

# Notes
Minimum required version is Quasar 1.0.0.

# Installation
To add this App Extension to your Quasar application, run the following (in your Quasar app folder):
```
quasar ext add qdecimal
```

# Describe
You can use `quasar describe QDecimal`

# Demo
Can be found [here](https://qdecimal.netlify.com/#/).

# Example Code
```html
<q-decimal class="q-mb-md" label="decimal right aligned" outlined v-model="decimal" input-style="text-align: right"></q-decimal>
<q-decimal class="q-mb-md" label="decimal right aligned with prefix" outlined v-model="decimal" input-style="text-align: right" prefix="Px"></q-decimal>
<q-decimal class="q-mb-md" label="decimal left aligned" outlined v-model="decimal"></q-decimal>
<q-decimal class="q-mb-md" label="decimal left aligned with suffix" outlined v-model="decimal" suffix="Sx"></q-decimal>

<q-decimal class="q-mb-md" label="currency - right aligned" outlined mode="currency" :currency="currency" v-model="decimal" input-style="text-align: right"></q-decimal>
<q-decimal class="q-mb-md" label="currency - right aligned with prefix" outlined mode="currency" :currency="currency" v-model="decimal" input-style="text-align: right" :prefix="true"></q-decimal>
<q-decimal class="q-mb-md" label="currency - left aligned" outlined mode="currency" :currency="currency" v-model="decimal"></q-decimal>
<q-decimal class="q-mb-md" label="currency - left aligned with suffix" outlined mode="currency" :currency="currency" v-model="decimal" :suffix="true"></q-decimal>

<q-decimal class="q-mb-md" label="bitcoin - left aligned with prefix" outlined v-model="bitcoin" :precision="8" prefix="₿"></q-decimal>
<q-decimal class="q-mb-md" label="bitcoin - right aligned with suffix" outlined v-model="bitcoin" :precision="8" input-style="text-align: right" suffix="₿"></q-decimal>
```
and the data...
```js
data () {
  return {
    decimal: 0,
    bitcoin: 0,
    currency: 'EUR',
    language: 'en-us',
    languages,
    currencies: [
      { value: 'EUR', label: 'Euros' },
      { value: 'USD', label: 'US Dollars' },
      { value: 'BRL', label: 'Brazilian Reals' }
    ]
  }
}
```

# QInput Properties

`QDecimal` is a transparent wrapper for `QInput`, so `QDecimal` will aceppt and undestand any property related to the `QInput`

# QDecimal Vue Properties
| Vue&nbsp;Property | Type	|  Description |
|---|---|---|
| value | Number | value must be a number (decimal or integer). (eg: `v-model="1.23"`) |
| lang | String | Language identifier (default: $q.lang.isoName) |
| suffix | Boolean or String | Suffix, the value can be either a string or a boolean, if that is a boolean, the suffix value will be defined by the mode |
| prefix | Boolean or String | Prefix, the value can be either a string or a boolean, if that is a boolean, the prefix value will be defined by the mode |
| type | String | The input type (default: `tel`) |
| mode | String | The formatting style to use. Possible values are `decimal` for plain number formatting, `currency` for currency formatting, and `percent` for percent formatting (default: `decimal`) |
| currency | String | The currency to use in currency formatting. Possible values are the ISO 4217 currency codes, such as `USD` for the US dollar, `EUR` for the euro, or `CNY` for the Chinese. There is no default value, if the mode is `currency`, the currency property must be provided. |
| display | String | How to display the currency in currency formatting. Possible values are `symbol` to use a localized currency symbol such as €, `code` to use the ISO currency code, `name` to use a localized currency name such as `dollar` (default: `symbol`) |
| places | Number | The number of integer digits to use in the integer part. Possible values are from `1` to `16`. places plus precision must be equal or less than `16`. the default is (`16 - precision`). |
| precision | Number | The number of integer digits to use in the fraction part. Possible values are from `0` to `15`. places plus precision must be equal or less than `16`. the default is `2`. |
| step | Number | The step property specifies the legal number intervals (eg: `1`, `0.2`, `3.3`) (default: `2`) |

# Donate
If you like (and use) this App Extension, please consider becoming a Quasar [GitHub Supporter](https://donate.quasar.dev).