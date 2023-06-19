<template>
  <q-page padding>
    <QDecimal filled min="-5" max="20" currency="BRL" prefix v-model="value" />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const value = ref(12.34)
</script>

<style lang="sass" scoped>
.directive-target
  width: 50px
  height: 50px
</style>
