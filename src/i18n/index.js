
import VueI18n from 'vue-i18n'

function loadLocaleMessages () {
  const locales = ()=> require.context('../languages', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

let currentLang = 'uz'
let defaultLang = localStorage.getItem('language');
if(defaultLang){
  currentLang = defaultLang
}
export default i18n =  VueI18n.createI18n ({
  locale: currentLang,
  fallbackLocale: 'uz',
  formatFallbackMessages: true,
  messages:loadLocaleMessages()  ,
})

