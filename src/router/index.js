import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import login from "../components/login.vue";
import User from "../components/User.vue";
import Gudang from "@/components/Gudang";
import Supplier from "@/components/Supplier";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: "/",
  //   name: "Home",
  //   component: Home,
  // },
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
    path: "/Unit",
    name: "Unit",
    component: () =>
      import(/* webpackChunkName: "Unit" */ "../components/Unit.vue"),
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
  {
    path: "/Gudang",
    name: "Gudang",
    component: Gudang,
    meta: {
      auth: true,
    },
  },
  {
    path: "/Supplier",
    name: "Supplier",
    component: Supplier,
    meta: {
      auth: true,
    },
  },
  {
    path: "/Barang",
    name: "Barang",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/Barang.vue"),
    meta: {
      auth: true,
    },
  },
  {
    path: "/MataUang",
    name: "MataUang",
    component: () =>
      import(/* webpackChunkName: "MataUang" */ "../components/MataUang.vue"),
    meta: {
      auth: true,
    },
  },
  {
    path: "/DaftarHarga",
    name: "DaftarHarga",
    component: () =>
      import(/* webpackChunkName: "about" */ "../components/DaftarHarga.vue"),
    meta: {
      auth: true,
    },
  },
  {
    path: "/Periode",
    name: "Periode",
    component: () =>
      import(/* webpackChunkName: "Periode" */ "../components/Periode.vue"),
    meta: {
      auth: true,
    },
  },
  {
    path: "/Customers",
    name: "Customers",
    component: () =>
      import(/* webpackChunkName: "customer" */ "../components/Customers.vue"),
    meta: {
      auth: true,
    },
  },
  {
    path: "/JobOrder",
    name: "JobOrder",
    component: () =>
      import(/* webpackChunkName: "JobOrder" */ "../components/WorkOrder.vue"),
    meta: {
      auth: true,
    },
  },
  {
    path: "/PurchaseOrderJasa",
    name: "PurchaseOrderJasa",
    component: () =>
      import(
        /* webpackChunkName: "PurchaseOrderJasa" */ "../components/PurchaseOrderJasa.vue"
      ),
    meta: {
      auth: true,
    },
  },
  {
    path: "/paymentVoucher",
    component: () => import("../components/PaymentVoucher.vue"),
    name: "Payment Voucher",
    meta: {
      auth: true,
    },
  },

  {
    path: "/Mutasikas",
    name: "Mutasikas",
    component: () =>
      import(/* webpackChunkName: "Mutasikas" */ "../components/MutasiKas.vue"),
    meta: {
      auth: true,
    },
  },
  {
    path: "/MutasiBank",
    name: "MutasiBank",
    component: () =>
      import(
        /* webpackChunkName: "MutasiBank" */ "../components/MutasiBank.vue"
      ),
    meta: {
      auth: true,
    },
  },
  {
    path: "/PembayaranPiutang",
    name: "PembayaranPiutang",
    component: () =>
      import(
        /* webpackChunkName: "PembayaranPiutang" */ "../components/PembayaranPiutang.vue"
      ),
    meta: {
      auth: true,
    },
  },
  {
    path: "/PembayaranHutang",
    name: "PembayaranHutang",
    component: () =>
      import(
        /* webpackChunkName: "PembayaranHutang" */ "../components/PembayaranHutang.vue"
      ),
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
// middleware for auth, permissions, and actions
router.beforeEach((to, from, next) => {
  // console.log('to',to)
  // check next component need meta auth or not
  // if(to.path == '/reportx'){
  //   router.addRoute({path:'/reportx',name:'reportx',component:()=>import('../components/Report.vue')})
  // }
  if (to.matched.some((record) => record.meta.auth)) {
    // check token exist or not
    if (localStorage.getItem("token") !== null) {
      // get allowed menu
      const menu_user = JSON.parse(localStorage.getItem("Menus"));
      let action = null;
      let contextMenu = null;
      let printOut = null;
      // checking permission menu yang dimiliki user ada apa tidak dengan menu yang di tuju
      if (menu_user.some((record) => record.link == to.path))
        // get all action for this menu
        (action = menu_user.find(
          (obj) => obj.link == to.path && obj.pivot.permission != ""
        ) ?? { pivot: { permission: "No Actions" } }),
          (contextMenu = menu_user.find(
            (obj) => obj.link == to.path && obj.pivot.context_menu != ""
          ) ?? { pivot: { context_menu: "No Context Menu" } }),
          (printOut = menu_user.find(
            (obj) => obj.link == to.path && obj.pivot.print_out != ""
          ) ?? { pivot: { print_out: "No Printed Document" } }),
          // sent actions to component menu with params
          (to.params["action"] = action.pivot.permission),
          (to.params["contextMenu"] = contextMenu.pivot.context_menu),
          (to.params["printOut"] = printOut.pivot.print_out),
          // let's go to the page :D
          next();
      else alert("You dont have permission for this page"), next("/Dashboard");
    } else {
      next("/login");
    }
  }
  next();
});

export default router;
