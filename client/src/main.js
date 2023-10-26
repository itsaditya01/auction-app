import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import vuetify from "./plugins/vuetify";
import VueCookies from "vue-cookies";

createApp(App)
  .use(store)
  .use(vuetify)
  .use(router)
  .use(VueCookies)
  .mount("#app");
