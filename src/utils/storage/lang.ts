const LangKey = "lang";

export function getLang() {
  return sessionStorage.getItem(LangKey);
}

export function setLang(lang: any) {
  return sessionStorage.setItem(LangKey, lang);
}

export function removeLang() {
  return sessionStorage.removeItem(LangKey);
}
