<template>
    <div>
        <div class="d-flex align-center justify-center" style="height: 100vh" v-if="mode === 'login'">
            <v-sheet width="400" class="mx-auto">
                <v-form fast-fail @submit.prevent="login">
                    <v-text-field type="email" variant="underlined" v-model="loginCredentials.email"
                        label="Email"></v-text-field>

                    <v-text-field type="password" variant="underlined" v-model="loginCredentials.password"
                        label="password"></v-text-field>

                    <v-btn type="submit" variant="outlined" color="primary" block class="mt-2">Sign in</v-btn>
                </v-form>
                <div class="mt-2">
                    <p class="text-body-2">
                        Don't have an account?
                        <a href="#" @click="mode = 'signup'">Sign Up</a>
                    </p>
                </div>
            </v-sheet>
        </div>
        <div class="d-flex align-center justify-center" style="height: 100vh" v-else>
            <v-sheet width="400" class="mx-auto">
                <v-form fast-fail @submit.prevent="signup">
                    <v-text-field variant="underlined" v-model="signupCredentials.fname" label="First Name"></v-text-field>
                    <v-text-field variant="underlined" v-model="signupCredentials.lname" label="Last Name"></v-text-field>
                    <v-text-field type="email" variant="underlined" v-model="signupCredentials.email"
                        label="Email"></v-text-field>
                    <v-text-field variant="underlined" v-model="signupCredentials.contactNo"
                        label="Contact no."></v-text-field>

                    <v-text-field type="password" variant="underlined" v-model="signupCredentials.password"
                        label="password"></v-text-field>

                    <v-btn type="submit" variant="outlined" color="primary" block class="mt-2">Sign up</v-btn>
                </v-form>
                <div class="mt-2">
                    <p class="text-body-2">
                        Already have an account?
                        <a href="#" @click="mode = 'login'">Sign In</a>
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
            const result = (await userApi.loginUser(this.loginCredentials)).data;
            console.log(result);
            if (result.success) {
                this.$cookies.set('token', result.data.token)
                this.$router.push("/");
            }
        },
        async signup() {
            const result = await userApi.signupUser(this.signupCredentials);
            if (result.success) {
                this.$cookies.set('token', result.data.token)
                this.$router.push("/");
            }
        },
    },
};
</script>

<style></style>