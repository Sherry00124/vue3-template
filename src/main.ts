import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import i18n from "@/i18n/index";
import "@/assets/style/global.css";

createApp(App).use(Antd).use(i18n).use(store).use(router).mount("#app");
