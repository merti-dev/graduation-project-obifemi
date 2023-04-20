<template lang="pug">
div
    h1 {{name}}
    h2 {{counter.count}}
    button(@click="counter.increment") +
    button(@click="counter.decrement") -
</template>

<script setup>
import { useGlobalCounterStore } from '../stores/globalCounter'

defineProps({
  name: {
    type: String,
    required: true
  }
})

const counter = useGlobalCounterStore()
</script>
