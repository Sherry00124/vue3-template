import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import i18n from "@/i18n/index";
import {
  OrderedListOutlined,
  AppstoreOutlined,
  AlignLeftOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons-vue";

import Layout from "@/layout/index.vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from "@/utils/storage/auth";
NProgress.configure({ showSpinner: false });

const whiteList = ["/login"];
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login",
    meta: { hidden: true },
  },
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
    path: "/dashboard",
    component: () => import(/* webpackChunkName: "about" */ "../layout/index.vue"),
    meta: { hidden: false },
    redirect: "/dashboard/index",
    children: [
      {
        path: "/dashboard/index",
        name: "dashboard",
        meta: {
          hidden: false,
          title: i18n.global.t("dashboard.title"),
          icon: AppstoreOutlined,
          breadcrumb: true,
        },
        component: () => import(/* webpackChunkName: "about" */ "../views/dashboard/index.vue"),
      },
    ],
  },
  {
    path: "/gcash",
    component: Layout,
    meta: { hidden: false },
    redirect: "/gcash/index",
    children: [
      {
        path: "/gcash/index",
        name: "gcash",
        meta: {
          hidden: false,
          title: i18n.global.t("gcashAccount.title"),
          icon: OrderedListOutlined,
          breadcrumb: true,
        },
        component: () => import(/* webpackChunkName: "about" */ "../views/gcashAccount/index.vue"),
      },
    ],
  },
  {
    path: "/transaction",
    component: Layout,
    meta: { hidden: false },
    redirect: "/transaction/index",
    children: [
      {
        path: "/transaction/index",
        name: "transaction",
        meta: {
          hidden: false,
          title: i18n.global.t("transaction.title"),
          icon: AlignLeftOutlined,
          breadcrumb: true,
        },
        component: () => import(/* webpackChunkName: "about" */ "../views/transaction/index.vue"),
      },
    ],
  },
  {
    path: "/deposit",
    component: Layout,
    meta: { hidden: false },
    redirect: "/deposit/index",
    children: [
      {
        path: "/deposit/index",
        name: "deposit",
        meta: {
          hidden: false,
          title: i18n.global.t("deposit.title"),
          icon: VerticalAlignBottomOutlined,
          breadcrumb: true,
        },
        component: () => import(/* webpackChunkName: "about" */ "../views/deposit/index.vue"),
      },
    ],
  },
];

// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   routes,
// });

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const hasToken = getToken();
  NProgress.start();
  if (hasToken) {
    next();
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next(`/login`);
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
