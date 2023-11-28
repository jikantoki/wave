import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLocaleStore = defineStore(
  'localeStore',
  () => {
    const locale = ref(null)
    function setLocale(newLocale) {
      locale.value = newLocale
    }
    return { locale, setLocale }
  },
  {
    /** データ保存設定 */
    persist: {
      storage: persistedState.localStorage,
    },
  },
)
