import { getLang, setLang } from "@/utils/storage/lang";
import { Module, Commit } from "vuex";

import i18n from "@/i18n/index";

interface LangState {
  lang: string;
}
const sidebarStatus = getLang() || "en";
const state: {
  currentLang: LangState;
} = {
  currentLang: {
    lang: sidebarStatus,
  },
};

const mutations = {
  TOGGLE_LANG: (state: { currentLang: LangState }, lang: string) => {
    state.currentLang.lang = lang;
  },
};

const actions = {
  toggleLang({ commit }: { commit: Commit }, data: string) {
    i18n.global.locale = data;
    commit("TOGGLE_LANG", data);
    setLang(data);
    location.reload();
  },
};

const langModule: Module<any, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
};

export default langModule;
