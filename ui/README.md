# Component QDecimal

[![npm](https://img.shields.io/npm/v/quasar-ui-qdecimal.svg?label=quasar-ui-qdecimal)](https://www.npmjs.com/package/quasar-ui-qdecimal)
[![npm](https://img.shields.io/npm/dt/quasar-ui-qdecimal.svg)](https://www.npmjs.com/package/quasar-ui-qdecimal)

**Compatible with Quasar UI v2 and Vue 3**.


# Component QDecimal
> in short, `QDecimal` is a `QInput` powered by the `Intl.NumberFormat`




# Usage

## Quasar CLI project


Install the [App Extension](../app-extension).

**OR**:


Create and register a boot file:

```js
import Vue from 'vue'
import Plugin from '@toby.mosque/quasar-ui-qdecimal'
import '@toby.mosque/quasar-ui-qdecimal/dist/index.css'

Vue.use(Plugin)
```

**OR**:

```html
<style src="@toby.mosque/quasar-ui-qdecimal/dist/index.css"></style>

<script>
import { Component as QDecimal } from '@toby.mosque/quasar-ui-qdecimal'

export default {
  components: {
    QDecimal
  }
}
</script>
```

## Vue CLI project

```js
import Vue from 'vue'
import Plugin from '@toby.mosque/quasar-ui-qdecimal'
import '@toby.mosque/quasar-ui-qdecimal/dist/index.css'

Vue.use(Plugin)
```

**OR**:

```html
<style src="@toby.mosque/quasar-ui-qdecimal/dist/index.css"></style>

<script>
import { Component as QDecimal } from '@toby.mosque/quasar-ui-qdecimal'

export default {
  components: {
    QDecimal
  }
}
</script>
```

## UMD variant

Exports `window.qDecimal`.

Add the following tag(s) after the Quasar ones:

```html
<head>
  <!-- AFTER the Quasar stylesheet tags: -->
  <link href="https://cdn.jsdelivr.net/npm/@toby.mosque/quasar-ui-qdecimal/dist/index.min.css" rel="stylesheet" type="text/css">
</head>
<body>
  <!-- at end of body, AFTER Quasar script(s): -->
  <script src="https://cdn.jsdelivr.net/npm/@toby.mosque/quasar-ui-qdecimal/dist/index.umd.min.js"></script>
</body>
```
If you need the RTL variant of the CSS, then go for the following (instead of the above stylesheet link):
```html
<link href="https://cdn.jsdelivr.net/npm/@toby.mosque/quasar-ui-qdecimal/dist/index.rtl.min.css" rel="stylesheet" type="text/css">
```

# QInput similarities and differences

let's review the QInput description

> The QInput component is used to capture text input from the user. It uses `v-model`, similar to a regular input. It has support for errors and validation, and comes in a variety of styles, colors, and types.

## Similarities

everything what applies to the `QInput` also applies to the `QDecimal`, so let say you wanna to style the `QDecimal` as `dense` and `filled` and configure the `append slot` to show a icon, you follow the `QInput` docs and do that:

```html
<template>
  <q-decimal filled dense v-model="number">
    <template v-slot:append>
      <q-avatar>
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg">
      </q-avatar>
    </template>
  </q-decimal>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const number = ref(12.34);
</script>
```

## Differences

`QDecimal` overrides the behavior of that 6 properties.

| Property | Detail |
|---|---|
| **modelValue** | the `modelValue`/`v-model` only accept decimal values, so you can't pass a string as you would do with the `QInput`. |
| **type** | the default value is `tel` instead of `text`, that ensures a numerical keyboard will appear instead of the full one. I opted by the `tel` instead of the `number` because of the odd behaviors of the later one. |
| **min** | `min` will prevent the user to input values smaller than the expected. |
| **max** | `max` will prevent the user to input values greater than the expected. |
| **prefix** | will also accept a boolean, if `true`, the prefix will depend of the combination of the `mode` and the `currency`. e.g: if `mode: currency` and `currency: EUR` so the displayed preffix will be `€`  |
| **suffix** | will also accept a boolean, if `true`, the prefix will depend of the combination of the `mode` and the `currency`. e.g: if `mode: currency` and `currency: EUR` so the displayed preffix will be `€` |

# QDecimal additional properties

| Property | Default | Detail |
|---|---|---|
| **preset** | `_default` | `preset` is a preconfigure and reusable set of properties, for example, you can configure a `preset` called  `de-money` with `mode: 'currency'` and `places: 2`, in this case, you set `preset="money"` instead of `mode="currency" :places="2"` |
| **lang** | -- | A string with a BCP 47 language tag. e.g.: `en-US`, `en`, `pt-BR`, `es`. the default will be same as the `quasar lang package`. |
| **mode** | `decimal` | The formatting style to use. possivel values: `decimal`, `currency`, `percent` or `unit` |
| **currency** | `max` | A string with the ISO 4217 currency codes. e.g.: `USD`, `EUR` or `BRL`.  |
| **places** | -- | The maximum number of significant digits to use.  |
| **precision** | 2 | The maximum number of fraction digits to use. |
| **step** | 1 | the values what would be increated when `↑` is pressed or decreased when `↓` is pressed. |

# Composables

We`d two composables who helps to configure the presets:

## createPreset

createPreset allow the dev to create a new preset what can be used later.

**type**
```ts
interface PresetPayload {
  type?: string
  suffix?: string | boolean,
  prefix?: string | boolean,
  mode?: "decimal" | "currency" | "percent"
  currency?: string,
  display?: "symbol" | "code" | "name",
  places?: number,
  precision?: number,
  step?: number
}

export function createPreset(name: string, {
  type = 'tef',
  preffix = undefined,
  suffix = undefined,
  mode = 'decimal',
  currency = undefined,
  display = 'symbol',
  places = undefined,
  precision = 2,
  step = 1
}: PresetPayload = {}) {

}
```

**usage**
```ts
import { createPreset } from '@toby.mosque/quasar-ui-qdecimal'

createPreset('money', {
  preffix: true,
  mode: 'currency',
  currency: 'EUR',
})
```

## usePreset

usePreset allow modify a previously created preset.

**type**
```ts
import type { ToRefs } from 'vue'
interface PresetPayload {
  type?: string
  suffix?: string | boolean,
  prefix?: string | boolean,
  mode?: "decimal" | "currency" | "percent"
  currency?: string,
  display?: "symbol" | "code" | "name",
  places?: number,
  precision?: number,
  step?: number
}

export function usePreset(name: string) : ToRefs<PresetPayload> {

}
```

**usage**
```html
<template>
  <q-form class="row q-col-gutter-sm">
    <div class="col">
      <q-select label="Mode" v-model="mode" :options="modes"></q-select>
    </div>
    <div class="col">
      <q-select label="Currency" v-model="currency" :options="currencies"></q-select>
    </div>
    <div class="col">
      <q-checkbox label="Preffix" v-model="preffix"></q-checkbox>
    </div>
    <div class="col">
      <q-decimal preset="money" v-model="number"></q-decimal>
    </div>
  <q-form>
</template>
<script setup lang="ts">
import { usePreset } from '@toby.mosque/quasar-ui-qdecimal'
import { ref } from 'vue'

const { preffix, mode, currency } = usePreset('money')
const modes = ['decimal', 'currency', 'percentage']
const currencies = ['EUR', 'USD', 'BRL']
const number = ref(12.34);
</script>
```

# Setup
```bash
$ yarn
```

# Developing
```bash
# start dev in SPA mode
$ yarn dev

# start dev in UMD mode
$ yarn dev:umd

# start dev in SSR mode
$ yarn dev:ssr

# start dev in Cordova iOS mode
$ yarn dev:ios

# start dev in Cordova Android mode
$ yarn dev:android

# start dev in Electron mode
$ yarn dev:electron
```

# Building package
```bash
$ yarn build
```

# Adding Testing Components
in the `ui/dev/src/pages` you can add Vue files to test your component/directive. When using `yarn dev` to build the UI, any pages in that location will automatically be picked up by dynamic routing and added to the test page.

# Adding Assets
If you have a component that has assets, like language or icon-sets, you will need to provide these for UMD. In the `ui/build/script.javascript.js` file, you will find a couple of commented out commands that call `addAssets`. Uncomment what you need and add your assets to have them be built and put into the `ui/dist` folder.

# Donate
If you appreciate the work that went into this, please consider [donating to Quasar](https://donate.quasar.dev).

# License
MIT (c) Tobias Mesquita <tobias.mesquita@gmail.com>
