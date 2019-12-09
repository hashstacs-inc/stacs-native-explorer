import Vue from 'vue'

// 引入国际化插件
import VueI18n from 'vue-i18n'
import messages from '../lang'
import { getLanguage } from "@/utils/localStorage"
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n);
const i18n = new VueI18n({
	locale: getLanguage(),
	messages: {
		'en-GB': Object.assign(messages['en-GB'], enLocale),
		'zh-CN': Object.assign(messages['zh-CN'], zhLocale)
	}
});
export default i18n;
