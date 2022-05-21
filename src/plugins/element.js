import ElementPlus from 'element-plus'
import { createI18n } from 'vue-i18n'
import 'element-plus/dist/index.css'
import localeZH from 'element-plus/es/locale/lang/zh-cn'
import localeEN from 'element-plus/es/locale/lang/en'
import messages from '../utils/i18n'

const i18n = createI18n({
  locale: localeZH.name,
  fallbackLocale: localeEN.name,
  messages,
})

export default (app) => {
  app.use(ElementPlus, { locale:localeZH })
  app.use(i18n)
}
