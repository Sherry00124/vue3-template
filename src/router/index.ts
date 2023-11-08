import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import i18n from "@/i18n/index";
import {
  OrderedListOutlined,
  AppstoreOutlined,
  AlignLeftOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons-vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/index",
    name: "index",
    meta: {
      hidden: false,
      title: i18n.global.t("dashboard.title"),
      icon: AppstoreOutlined,
    },
    component: () => import(/* webpackChunkName: "about" */ "../views/dashboard/index.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: {
      hidden: true,
      title: i18n.global.t("login.title"),
    },
    component: () => import(/* webpackChunkName: "about" */ "../views/login/index.vue"),
  },
  {
    path: "/gcash",
    name: "gcash",
    meta: {
      hidden: false,
      title: i18n.global.t("gcashAccount.title"),
      icon: OrderedListOutlined,
    },
    component: () => import(/* webpackChunkName: "about" */ "../views/gcashAccount/index.vue"),
  },
  {
    path: "/transaction",
    name: "transaction",
    meta: {
      hidden: false,
      title: i18n.global.t("transaction.title"),
      icon: AlignLeftOutlined,
    },
    component: () => import(/* webpackChunkName: "about" */ "../views/transaction/index.vue"),
  },
  {
    path: "/deposit",
    name: "deposit",
    meta: {
      hidden: false,
      title: i18n.global.t("deposit.title"),
      icon: VerticalAlignBottomOutlined,
    },
    component: () => import(/* webpackChunkName: "about" */ "../views/deposit/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
