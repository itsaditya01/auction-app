import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import vuetify from "./plugins/vuetify";
import VueCookies from "vue-cookies";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

createApp(App)
  .use(ToastPlugin)
  .use(store)
  .use(vuetify)
  .use(router)
  .use(VueCookies)
  .mount("#app");
