import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import i18n from "@/i18n/index";
import {
  OrderedListOutlined,
  AppstoreOutlined,
  AlignLeftOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons-vue";

import Layout from "@/layout/index.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    meta: {
      hidden: true,
      title: i18n.global.t("login.title"),
      breadcrumb: false,
    },
    component: () => import(/* webpackChunkName: "about" */ "../views/login/index.vue"),
  },
  {
    path: "/index",
    name: "index",
    meta: {
      hidden: false,
      title: i18n.global.t("dashboard.title"),
      icon: AppstoreOutlined,
      breadcrumb: true,
    },
    component: () => import(/* webpackChunkName: "about" */ "../views/dashboard/index.vue"),
  },
  {
    path: "/gcash",
    name: "gcash",
    meta: {
      hidden: false,
      title: i18n.global.t("gcashAccount.title"),
      icon: OrderedListOutlined,
      breadcrumb: true,
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
      breadcrumb: true,
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
      breadcrumb: true,
    },
    component: () => import(/* webpackChunkName: "about" */ "../views/deposit/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
