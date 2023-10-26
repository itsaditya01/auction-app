<template>
  <!-- <v-app style="background: linear-gradient(120deg, #1d976c, #2c3e50)"> -->
  <v-app
    :style="{ backgroundImage: 'url(' + require('@/assets/bg5.jpg') + ')' }"
  >
    <NavBar></NavBar>
    <v-container>
      <router-view></router-view>
    </v-container>
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
#app {
  /*background: url(https://images.unsplash.com/photo-1551970634-747846a548cb?ixlib)
    center/cover no-repeat;*/
  background: linear-gradient(120deg, #1d976c, #2c3e50);
  height: 100%;
  overflow: hidden;
  z-index: 1;
}
</style>