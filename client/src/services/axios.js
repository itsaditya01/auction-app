import axios from "axios";
import VueCookies from "vue-cookies";

const api = axios.create({
  baseURL: "http://localhost:3000/api/",
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
