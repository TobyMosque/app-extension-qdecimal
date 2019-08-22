<template>
  <q-page class="flex flex-center">
    <div class="full-width row q-pa-md">
      <div class="col col-6 q-pa-md">
        <q-select
            outlined
            v-model="language"
            :options="languages"
            label="Language"
            option-label="nativeName"
            option-value="isoName"
            map-options
            emit-value
            @input="onLanguageInput">
        </q-select>
      </div>
      <div class="col col-6 q-pa-md">
        <q-select
            outlined
            v-model="currency"
            :options="currencies"
            label="Currency"
            option-label="label"
            option-value="value"
            map-options
            emit-value>
        </q-select>
      </div>
      <div class="col col-lg-3 col-md-6 col-12 q-pa-md">
        <q-card>
          <q-card-section>
            <div class="text-h6">Decimal</div>
          </q-card-section>
          <q-separator inset />
          <q-card-section>
            <q-decimal class="q-mb-md" label="right aligned" outlined v-model="decimal" input-style="text-align: right"></q-decimal>
            <q-decimal class="q-mb-md" label="right aligned with prefix" outlined v-model="decimal" input-style="text-align: right" prefix="Px"></q-decimal>
            <q-decimal class="q-mb-md" label="left aligned" outlined v-model="decimal"></q-decimal>
            <q-decimal class="q-mb-md" label="left aligned with suffix" outlined v-model="decimal" suffix="Sx"></q-decimal>
          </q-card-section>
        </q-card>
      </div>
      <div class="col col-lg-3 col-md-6 col-12 q-pa-md">
        <q-card>
          <q-card-section>
            <div class="text-h6">Percent</div>
          </q-card-section>
          <q-separator inset />
          <q-card-section>
            <q-decimal class="q-mb-md" label="right aligned" outlined mode="percent" v-model="decimal" input-style="text-align: right"></q-decimal>
            <q-decimal class="q-mb-md" label="right aligned with prefix" outlined mode="percent" v-model="decimal" input-style="text-align: right" :prefix="true"></q-decimal>
            <q-decimal class="q-mb-md" label="left aligned" outlined mode="percent" v-model="decimal"></q-decimal>
            <q-decimal class="q-mb-md" label="left aligned with suffix" outlined mode="percent" v-model="decimal" :suffix="true"></q-decimal>
          </q-card-section>
        </q-card>
      </div>
      <div class="col col-lg-3 col-md-6 col-12 q-pa-md">
        <q-card>
          <q-card-section>
            <div class="text-h6">Currency</div>
          </q-card-section>
          <q-separator inset />
          <q-card-section>
            <q-decimal class="q-mb-md" label="right aligned" outlined mode="currency" :currency="currency" v-model="decimal" input-style="text-align: right"></q-decimal>
            <q-decimal class="q-mb-md" label="right aligned with prefix" outlined mode="currency" :currency="currency" v-model="decimal" input-style="text-align: right" :prefix="true"></q-decimal>
            <q-decimal class="q-mb-md" label="left aligned" outlined mode="currency" :currency="currency" v-model="decimal"></q-decimal>
            <q-decimal class="q-mb-md" label="left aligned with suffix" outlined mode="currency" :currency="currency" v-model="decimal" :suffix="true"></q-decimal>
          </q-card-section>
        </q-card>
      </div>
      <div class="col col-lg-3 col-md-6 col-12 q-pa-md">
        <q-card>
          <q-card-section>
            <div class="text-h6">Currency - Code</div>
          </q-card-section>
          <q-separator inset />
          <q-card-section>
            <q-decimal class="q-mb-md" label="right aligned" outlined mode="currency" :currency="currency" display="code" v-model="decimal" input-style="text-align: right"></q-decimal>
            <q-decimal class="q-mb-md" label="right aligned with prefix" outlined mode="currency" :currency="currency" display="code" v-model="decimal" input-style="text-align: right" :prefix="true" ></q-decimal>
            <q-decimal class="q-mb-md" label="left aligned" outlined mode="currency" :currency="currency" display="code" v-model="decimal"></q-decimal>
            <q-decimal class="q-mb-md" label="left aligned with suffix" outlined mode="currency" :currency="currency" display="code" v-model="decimal" :suffix="true"></q-decimal>
          </q-card-section>
        </q-card>
      </div>
      <div class="col col-lg-3 col-md-6 col-12 q-pa-md">
        <q-card>
          <q-card-section>
            <div class="text-h6">Currency - Name</div>
          </q-card-section>
          <q-separator inset />
          <q-card-section>
            <q-decimal class="q-mb-md" label="right aligned" outlined mode="currency" :currency="currency" display="name" v-model="decimal" input-style="text-align: right"></q-decimal>
            <q-decimal class="q-mb-md" label="right aligned with prefix" outlined mode="currency" :currency="currency" display="name" v-model="decimal" input-style="text-align: right" :prefix="true"></q-decimal>
            <q-decimal class="q-mb-md" label="left aligned" outlined mode="currency" :currency="currency" display="name" v-model="decimal"></q-decimal>
            <q-decimal class="q-mb-md" label="left aligned with suffix" outlined mode="currency" :currency="currency" display="name" v-model="decimal" :suffix="true"></q-decimal>
          </q-card-section>
        </q-card>
      </div>
      <div class="col col-lg-3 col-md-6 col-12 q-pa-md">
        <q-card>
          <q-card-section>
            <div class="text-h6">Custom - Bitcoin with Precision 8</div>
          </q-card-section>
          <q-separator inset />
          <q-card-section>
            <q-decimal class="q-mb-md" label="right aligned with suffix" outlined v-model="bitcoin" :places="1" :precision="8" input-style="text-align: right" suffix="₿"></q-decimal>
            <q-decimal class="q-mb-md" label="right aligned with prefix" outlined v-model="bitcoin" :places="1" :precision="8" input-style="text-align: right" prefix="₿"></q-decimal>
            <q-decimal class="q-mb-md" label="left aligned with prefix" outlined v-model="bitcoin" :places="1" :precision="8" prefix="₿"></q-decimal>
            <q-decimal class="q-mb-md" label="left aligned with suffix" outlined v-model="bitcoin" :places="1" :precision="8" suffix="₿"></q-decimal>
          </q-card-section>
        </q-card>
      </div>
      <div class="col col-lg-3 col-md-6 col-12 q-pa-md">
        <q-card>
          <q-card-section>
            <div class="text-h6">Validation</div>
          </q-card-section>
          <q-separator inset />
          <q-card-section>
            <q-form ref="form">
              <q-decimal class="q-mb-md" :rules="[validate]" label="right aligned" outlined v-model="decimal" input-style="text-align: right"></q-decimal>
              <q-decimal class="q-mb-md" :rules="[validate]" label="left aligned" outlined v-model="decimal"></q-decimal>
            </q-form>
          </q-card-section>
          <q-card-actions>
            <q-btn color="positive" class="full-width" label="Validate" @click="submit" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <div class="full-width row q-pa-md">
      <div class="col col-md-6 col-12 q-pa-md">
        <q-banner rounded class="bg-primary text-white">
          <template v-slot:avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
            </q-avatar>
          </template>
          New to Quasar? Don't miss the chance to know the best Framework based on Vue
          <template v-slot:action>
            <a href="https://quasar.dev">
              <q-btn flat color="white" label="Show me" />
            </a>
          </template>
        </q-banner>
      </div>
      <div class="col col-md-6 col-12 q-pa-md">
        <q-banner rounded class="bg-grey-10 text-white">
          <template v-slot:avatar>
            <q-avatar>
              <img src="statics/git-octupus.png">
            </q-avatar>
          </template>
          Quasar App Extension QDecimal Repository
          <template v-slot:action>
            <a href="https://github.com/TobyMosque/app-extension-qdecimal">
              <q-btn flat color="white" label="Show me" />
            </a>
          </template>
        </q-banner>
      </div>
    </div>
  </q-page>
</template>

<style>
</style>

<script>
import languages from 'quasar/lang/index.json'
export default {
  name: 'PageIndex',
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
  },
  methods: {
    async onLanguageInput () {
      let lang = await import(`quasar/lang/${this.language}`)
      this.$q.lang.set(lang.default)
    },
    validate (value) {
      return this.decimal > 0 || 'error'
    },
    submit () {
      this.$refs.form.validate()
    }
  }
}
</script>
