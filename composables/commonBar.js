import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCommonBarStore = defineStore('commonBarStore', () => {
  const hidden = ref(false)
  const neverHidden = ref(false)
  function setHidden(isHidden) {
    hidden.value = isHidden
  }
  function setNeverHidden(isHidden) {
    neverHidden.value = isHidden
  }
  return { hidden, neverHidden, setHidden, setNeverHidden }
})
