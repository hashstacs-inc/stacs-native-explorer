import {  getLanguage, setLanguage } from "@/utils/localStorage"

const language = {
	state: {
		lang: getLanguage(),
	},

	mutations: {
		CHANGE_LANG: (state, lang) => {
			state.lang = lang;
			setLanguage(lang);
		}
	},

	actions: {
		setLocalLang({ commit }, lang) {
			return new Promise((resolve, reject) => {
				commit('CHANGE_LANG', lang);
				resolve("success");
			});
		},
	}
};
export default language
