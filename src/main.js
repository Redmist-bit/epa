import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import i18n from "@/plugins/i18n";
import router from "./router";
import vuetify from "./plugins/vuetify";
import "./plugins/vuetify-money.js";
import CountryFlag from "vue-country-flag";
const options = {
  name: "_blank",
  specs: ["fullscreen=yes", "titlebar=yes", "scrollbars=yes"],
  styles: [
    "https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900",
    "https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css",
    "https://cdn.jsdelivr.net/npm/vuetify@2.x/dist/vuetify.min.css",
  ],
  timeout: 1000, // default timeout before the print window appears
  autoClose: true, // if false, the window will not close after printing
  windowTitle: window.document.title, // override the window title
};
Vue.use(options);
Vue.component("bendera-negara", CountryFlag);
Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
