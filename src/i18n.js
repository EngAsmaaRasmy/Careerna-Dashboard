import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enMessages from './locales/English.json'

Vue.use(VueI18n)

const messages = {
  English: {
    message: enMessages
  }
}
export default new VueI18n({
  locale: 'English',
  fallbackLocale: 'English',
  messages
})
