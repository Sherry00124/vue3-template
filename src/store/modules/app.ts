import { getSidebar, setSidebar, removeSidebar } from "@/utils/storage/sidebar";
import { Module } from "vuex";
interface SidebarState {
  opened: boolean;
  withoutAnimation: boolean;
}
const sidebarStatus = getSidebar() || "0";
const state: {
  sidebar: SidebarState;
} = {
  sidebar: {
    opened: !!+sidebarStatus,
    withoutAnimation: false,
  },
};

const mutations = {
  TOGGLE_SIDEBAR: (state: { sidebar: SidebarState }) => {
    state.sidebar.opened = !state.sidebar.opened;
    state.sidebar.withoutAnimation = false;
    if (state.sidebar.opened) {
      setSidebar("1");
    } else {
      setSidebar("0");
    }
  },
};

const actions = {
  toggleSideBar({ commit }: { commit: (mutation: string) => void }) {
    commit("TOGGLE_SIDEBAR");
  },
};

const appModule: Module<any, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
};

export default appModule;
