import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalCounterStore = defineStore('globalCounter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }
  function decrement() {
    count.value--
  }
  console.log('count:', count.value)
  console.log('increment:', increment)
  console.log('decrement:', decrement)
  return { count, increment, decrement }
})
