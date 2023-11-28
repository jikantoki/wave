import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore(
  'userStore',
  () => {
    const userId = ref(null)
    const userToken = ref(null)
    const profile = ref(null)
    function setId(newId) {
      userId.value = newId
    }
    function setToken(newToken) {
      userToken.value = newToken
    }
    function setProfile(newProfile) {
      profile.value = newProfile
    }
    return {
      userId,
      userToken,
      profile,
      setId,
      setToken,
      setProfile,
    }
  },
  {
    /** データ保存設定 */
    persist: {
      storage: persistedState.localStorage,
    },
  },
)
