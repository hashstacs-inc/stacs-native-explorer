let storage = window.localStorage;

let languageKey = 'om_lang'

export function getLanguage() {
	return storage.getItem(languageKey) || 'en-GB';
}

export function setLanguage(lang) {
	return storage.setItem(languageKey, lang);
}