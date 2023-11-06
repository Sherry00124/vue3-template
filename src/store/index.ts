import { createApp } from "vue";
import { createStore, Store } from "vuex";
import getters from "./getters";

// 导入 user 模块
import user from "./modules/user";
import appModule from "./modules/app";
// 创建一个 Vue 3 应用实例
const app = createApp({});

// 使用 createVuexStore 创建 Vuex Store 类型
const store: Store<any> = createStore({
  modules: {
    user, // 添加 user 模块
    appModule,
  },
  getters,
});

// 在应用实例中使用 Vuex
app.use(store);

// 然后挂载应用到 DOM 中
app.mount("#app"); // 请替换为你的根 DOM 元素 ID

export default store;
