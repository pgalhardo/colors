import { createI18n, useI18n } from 'vue-i18n'
import { createVueI18nAdapter } from 'vuetify/locale/adapters/vue-i18n'
import { en, pt } from 'vuetify/locale'

const messages = {
  en: {
    $vuetify: {
      ...en
    },
    ...(await import('../locales/en.json')).default
  },
  pt: {
    $vuetify: {
      ...pt
    },
    ...(await import('../locales/pt.json')).default
  }
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

const i18nAdapter = createVueI18nAdapter({ i18n, useI18n })

export { i18n, i18nAdapter }
