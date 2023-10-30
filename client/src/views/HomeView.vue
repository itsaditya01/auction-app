<template>
  <!-- <v-app style="background: linear-gradient(120deg, #1d976c, #2c3e50)"> -->
  <v-app
    :style="{ backgroundImage: 'url(' + require('@/assets/bg5.jpg') + ')' }"
  >
    <NavBar></NavBar>
    <v-container v-if="$route.name !== 'AuctionView'">
      <router-view></router-view>
    </v-container>
    <router-view v-else></router-view>
  </v-app>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar.vue";

export default {
  name: "HomeView",
  components: {
    NavBar,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>