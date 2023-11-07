import { login, getMerchantInfo } from "@/api/login.api";
import { getToken, setToken, setUserInfo, getUserInfo, removeToken } from "@/utils/storage/auth";
import { Commit, Module, ActionContext } from "vuex";

// State 接口
interface State {
  token: string | null;
  userInfo: object | null;
}

// Mutation 类型
enum MutationTypes {
  SET_TOKEN = "SET_TOKEN",
  SET_USERINFO = "SET_USERINFO",
}

// Mutation 接口
interface Mutations {
  [MutationTypes.SET_TOKEN](state: State, token: string): void;
  [MutationTypes.SET_USERINFO](state: State, userInfo: object): void;
  [key: string]: (state: State, payload: any) => void;
}
interface RootState {
  user: State; // 假设你有一个名为 "user" 的模块，并且它的状态是 State 类型
  // 其他模块的状态...
}
// Action 接口
interface Actions {
  login({ commit }: { commit: Commit }, input: any): Promise<void>;
  getMerchantInfo({ commit, state }: { commit: Commit; state: State }, data: any): Promise<void>;
  [key: string]: (context: ActionContext<State, RootState>, payload: any) => Promise<void>; // 添加 string 类型的索引签名
  logout({ commit }: { commit: Commit }): Promise<void>;
}

const state: State = {
  token: getToken(),
  userInfo: getUserInfo(),
};

const mutations: Mutations = {
  [MutationTypes.SET_TOKEN](state, token) {
    state.token = token;
  },
  [MutationTypes.SET_USERINFO](state, userInfo) {
    state.userInfo = userInfo;
  },
};

const actions: Actions = {
  async login({ commit }, input) {
    try {
      const response = await login(input);
      const result = response.result;
      commit(MutationTypes.SET_TOKEN, result.token);
      setToken(result.token);
    } catch (error) {
      throw error;
    }
  },

  async getMerchantInfo({ commit, state }) {
    try {
      const response = await getMerchantInfo();
      commit(MutationTypes.SET_USERINFO, response.result);
      setUserInfo(response.result);
    } catch (error) {
      throw error;
    }
  },

  async logout({ commit }) {
    removeToken();
  },
};

const userModule: Module<any, any> = {
  namespaced: true,
  state,
  mutations,
  actions,
};

export default userModule;
