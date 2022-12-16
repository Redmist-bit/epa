import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import login from "../components/login.vue";
import User from "../components/User.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/ChangePwd",
    name: "ChangePwd",
    component: () =>
      import(
        /* webpackChunkName: "resetpwd" */ "../components/ResetPassword.vue"
      ),
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "/User",
    name: "User",
    component: User,
    meta: {
      auth: true,
    },
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/ChartOfAccount",
    name: "ChartOfAccount",
    component: () =>
      import(
        /* webpackChunkName: "ChartOfAccount" */ "../components/ChartOfAccount.vue"
      ),
    meta: {
      auth: true,
    },
  },
  {
    path: "/Pembelian",
    name: "Pembelian",
    component: () =>
      import(/* webpackChunkName: "Pembelian" */ "../components/Pembelian.vue"),
    meta: {
      auth: true,
    },
  },
  {
    path: "/PurchaseOrder",
    name: "PurchaseOrder",
    component: () =>
      import(
        /* webpackChunkName: "PurchaseOrder" */ "../components/PurchaseOrder.vue"
      ),
    meta: {
      auth: true,
    },
  },
  {
    path: "/Invoice",
    name: "Invoice",
    component: () =>
      import(/* webpackChunkName: "Invoice" */ "../components/Invoice.vue"),
    meta: {
      auth: true,
    },
  },
  {
    path: "/Menus",
    name: "Menus",
    component: () =>
      import(/* webpackChunkName: "Menu" */ "../components/Menu.vue"),
    meta: {
      auth: true,
    },
  },
  {
    path: "/Menu",
    name: "Menu",
    component: () =>
      import(/* webpackChunkName: "menu" */ "../components/UserMenu.vue"),
    meta: {
      auth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
