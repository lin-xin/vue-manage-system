import { createI18n } from 'vue-i18n';
import zhCN from './lang/zh-CN';
import enUS from './lang/en-US';

// 从localStorage获取语言设置，默认中文
const locale = localStorage.getItem('locale') || 'zh-CN';

const i18n = createI18n({
  legacy: false, // 使用Composition API必须设置为false
  locale,
  fallbackLocale: 'zh-CN', // 默认语言
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  }
});

export default i18n;