import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const popupState = ref(true)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  function checkPopup(value: boolean) {
    popupState.value = value
  }
  return { count, doubleCount, increment }
})
