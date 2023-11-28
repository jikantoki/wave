import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('themeStore', () => {
  const theme = ref('light')
  function setTheme(newTheme) {
    theme.value = newTheme
  }
  return { theme, setTheme }
})
