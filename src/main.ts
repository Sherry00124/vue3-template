import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import i18n from "@/i18n/index";
import "@/assets/style/global.css";
import Loading from "@/components/Loading/index";

const app = createApp(App);
app.use(Antd);
app.use(i18n);
app.use(store);
app.use(router);
app.use(Loading);
app.mount("#app");

export default app;
