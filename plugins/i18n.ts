import { createI18n } from 'vue-i18n'
import en from '../locales/en'
import ja from '../locales/ja'

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'ja',
    messages: {
      en,
      ja,
    },
  })

  vueApp.use(i18n)
})
