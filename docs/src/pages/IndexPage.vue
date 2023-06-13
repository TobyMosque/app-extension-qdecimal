<template>
  <q-page class="row items-center justify-evenly">
    <q-decimal filled v-model="number">
      <template v-slot:append>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg">
        </q-avatar>
      </template>
    </q-decimal>
    <q-decimal filled preset="money" v-model="number"></q-decimal>
    <q-decimal filled preset="money" currency="EUR" v-model="number"></q-decimal>
    <q-decimal filled mode="currency" :precision="4" currency="JPY" v-model="number"></q-decimal>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const number = ref(12.34);
</script>
