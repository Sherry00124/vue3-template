import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/Dashboard/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/index",
    name: "index",
    meta: {
      hidden: false,
      title: "Dashboard",
    },
    component: () => import(/* webpackChunkName: "about" */ "../views/dashboard/index.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: {
      hidden: true,
      title: "Login",
    },
    component: () => import(/* webpackChunkName: "about" */ "../views/login/index.vue"),
  },
  {
    path: "/gcash",
    name: "gcash",
    meta: {
      hidden: false,
      title: "Gcash Account",
    },
    component: () => import(/* webpackChunkName: "about" */ "../views/gcashAccount/index.vue"),
  },
  {
    path: "/transaction",
    name: "transaction",
    meta: {
      hidden: false,
      title: "Transaction",
    },
    component: () => import(/* webpackChunkName: "about" */ "../views/transaction/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
