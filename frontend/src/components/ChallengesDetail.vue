<script setup>
import { ref } from 'vue'

defineProps({
  challengedetails: {
    type: String,
    required: true
  }
})
</script>

<template lang="pug">
div
  | {{ challengedetails }}

</template>
