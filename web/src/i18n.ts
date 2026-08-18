import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import enTranslations from './messages/en.json'
import viTranslations from './messages/vi.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: enTranslations,
      vi: viTranslations,
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
