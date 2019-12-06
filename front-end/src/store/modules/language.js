import {  getLanguage, setLanguage } from "@/utils/localStorage"

const language = {
	state: {
		lang: getLanguage(),//默认英文版
	},

	mutations: {
		//	设置本地语言环境
		CHANGE_LANG: (state, lang) => {
			state.lang = lang;
			setLanguage(lang);
		}
	},

	actions: {
		//设置语言
		setLocalLang({ commit }, lang) {
			return new Promise((resolve, reject) => {
				commit('CHANGE_LANG', lang);
				resolve("success");
			});
		},
	}
};
export default language
