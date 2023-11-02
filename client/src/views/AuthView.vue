<template>
  <div :style="{ backgroundImage: 'url(' + require('@/assets/bg5.jpg') + ')' }">
    <div
      class="d-flex align-center justify-center"
      style="height: 100vh"
      v-if="mode === 'login'"
    >
      <v-sheet
        width="400"
        class="mx-auto"
        style="background-color: transparent; color: white"
      >
        <v-form fast-fail @submit.prevent="login">
          <v-text-field
            type="email"
            variant="underlined"
            v-model="loginCredentials.email"
            label="Email"
          ></v-text-field>

          <v-text-field
            type="password"
            variant="underlined"
            v-model="loginCredentials.password"
            label="password"
          ></v-text-field>

          <v-btn
            type="submit"
            variant="outlined"
            color="black"
            block
            class="mt-2"
            >Sign in</v-btn
          >
        </v-form>
        <div class="mt-2">
          <p class="text-body-2">
            Don't have an account?
            <a @click="mode = 'signup'">Sign Up</a>
          </p>
        </div>
      </v-sheet>
    </div>
    <div
      class="d-flex align-center justify-center"
      style="height: 100vh"
      v-else
    >
      <v-sheet
        width="400"
        class="mx-auto"
        style="background-color: transparent; color: white"
      >
        <v-form fast-fail @submit.prevent="signup">
          <v-text-field
            variant="underlined"
            v-model="signupCredentials.fname"
            label="First Name"
          ></v-text-field>
          <v-text-field
            variant="underlined"
            v-model="signupCredentials.lname"
            label="Last Name"
          ></v-text-field>
          <v-text-field
            type="email"
            variant="underlined"
            v-model="signupCredentials.email"
            label="Email"
          ></v-text-field>
          <v-text-field
            variant="underlined"
            v-model="signupCredentials.contactNo"
            label="Contact no."
          ></v-text-field>

          <v-text-field
            type="password"
            variant="underlined"
            v-model="signupCredentials.password"
            label="password"
          ></v-text-field>

          <v-btn
            type="submit"
            variant="outlined"
            color="black"
            block
            class="mt-2"
            >Sign up</v-btn
          >
        </v-form>
        <div class="mt-2">
          <p class="text-body-2">
            Already have an account?
            <a @click="mode = 'login'">Sign In</a>
          </p>
        </div>
      </v-sheet>
    </div>
  </div>
</template>

<script>
import userApi from "../services/userApi";

export default {
  data() {
    return {
      mode: "login",
      loginCredentials: {
        email: "asssad@gmai.cpm",
        password: "asdasdas",
      },
      signupCredentials: {
        fname: "",
        lname: "",
        email: "",
        contactNo: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      try {
        const result = (await userApi.loginUser(this.loginCredentials)).data;
        console.log(result);
        if (result.success) {
          this.$cookies.set("token", result.data.token);
          this.$cookies.set("id", result.data.id);
          this.$cookies.set("username", result.data.username);
          this.$router.push("/home");
        }
      } catch (error) {
        console.log(error);
        this.$toast.error(error.response?.data.msg || error.message);
      }
    },
    async signup() {
      try {
        const result = await userApi.signupUser(this.signupCredentials);
        if (result.data.success) {
          this.$cookies.set("token", result.data.token);
          this.$cookies.set("id", result.data.id);
          this.$cookies.set("username", result.data.username);
          this.$router.push("/home");
        }
      } catch (error) {
        this.$toast.error(error.response?.data.msg || error.message);
      }
    },
  },
};
</script>

<style scoped>
p a {
  color: rgb(187, 167, 167);
  cursor: pointer;
}
</style>