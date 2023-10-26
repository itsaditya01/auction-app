import api from "./axios";

export default {
  loginUser(credentials) {
    return api.post("user/login", credentials);
  },

  signupUser(credentials) {
    return api.post("user/signup", credentials);
  },
};
