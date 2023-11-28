import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMetaStore = defineStore('metaStore', () => {
  const title = ref('未定義')
  function setTitle(newTitle) {
    title.value = newTitle
  }
  return { title, setTitle }
})
