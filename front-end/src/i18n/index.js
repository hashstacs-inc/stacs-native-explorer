import Vue from 'vue'

// 引入国际化插件
import VueI18n from 'vue-i18n'
import messages from '../lang'
import { getLanguage } from "@/utils/localStorage"

Vue.use(VueI18n);
const i18n = new VueI18n({
	locale: getLanguage(),
	messages
});
export default i18n;
