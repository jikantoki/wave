import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useHumbergerStore = defineStore('humbergerStore', () => {
  /** Trueの時はハンバーガー開かない */
  const disabled = ref(false)
  function setDisabled(newValue) {
    disabled.value = newValue
  }
  return { disabled, setDisabled }
})
