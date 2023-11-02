import axios from "axios";
import VueCookies from "vue-cookies";

const serverUrl = process.env.VUE_APP_SERVER_URL;
const api = axios.create({
  baseURL: serverUrl,
});

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = `Bearer ${VueCookies.get("token")}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
