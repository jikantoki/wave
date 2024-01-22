import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useToastStore = defineStore('toastStore', () => {
  const message = ref('')
  function setMessage(newMessage) {
    message.value = newMessage
  }
  return { message, setMessage }
})
