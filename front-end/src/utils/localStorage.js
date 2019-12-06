let storage = window.localStorage;

let languageKey = 'om_lang'

// 获取当前语言
export function getLanguage() {
	return storage.getItem(languageKey) || 'en-GB';
}

// 设置当前语言
export function setLanguage(lang) {
	return storage.setItem(languageKey, lang);
}