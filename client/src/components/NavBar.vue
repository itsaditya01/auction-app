<template>
  <div>
    <nav class="my_nav d-none d-md-block p-2">
      <v-container
        class="fill-height d-flex justify-space-between align-center mx-auto"
      >
        <div class="logo">
          <router-link to="/" target="_blank_"
            ><img width="120" :src="logo" alt="online auction"
          /></router-link>
        </div>
        <div class="links">
          <router-link
            class="link text-decoration-none white--text"
            v-for="(items, i) in links"
            :key="i"
            :to="items.url"
          >
            <span class="white underline_left"></span>
            {{ items.title }}
            <span class="white underline_right"></span>
          </router-link>
        </div>
        <div class="action_btn"><button class="btn">Logout</button></div>
      </v-container>
    </nav>
    <nav class="my_nav d-block d-md-none p-3">
      <v-container
        class="fill-height d-flex justify-space-between align-center mx-auto"
      >
        <div class="logo">
          <router-link to="/" target="_blank_"
            ><img width="120" :src="logo" alt="online auction"
          /></router-link>
        </div>
        <div class="links">
          <router-link
            class="link text-decoration-none white--text"
            v-for="(items, i) in links"
            :key="i"
            :to="items.url"
          >
            <span class="white underline_left"></span>
            <v-icon>{{ items.icon }}</v-icon>
            <span class="white underline_right"></span>
          </router-link>
        </div>
        <div class="action_btn">
          <v-btn fab small><v-icon>mdi mdi-logout</v-icon></v-btn>
        </div>
      </v-container>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logo: require("@/assets/logo.png"),
      links: [
        {
          url: "/auctions",
          icon: "mdi mdi-home",
          title: "Home",
        },
        {
          url: "/purchases",
          icon: "mdi mdi-purse",
          title: "Purchases",
        },
        {
          url: "/about",
          icon: "mdi mdi-information-outline",
          title: "About",
        },
      ],
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.cdnfonts.com/css/event-horizon");
* {
  margin: 0;
  padding: 0;
  text-decoration: none;
  font-family: "Event Horizon", sans-serif;
}
#app {
  background-color: #090a0f;
  background: radial-gradient(
    ellipse at bottom,
    rgba(27, 39, 53, 1),
    rgba(9, 10, 15, 1)
  );
  overflow: hidden;
  z-index: 1;
}
.my_nav {
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(17, 25, 40, 0.473);
  border: 1px solid rgba(255, 255, 255, 0.125);
  color: white;
}
.link {
  padding: 10px 20px;
  position: relative;
  color: white;
}
.link .underline_left,
.link .underline_right {
  display: block;
  position: absolute;
  height: 4px;
  width: 0px;
  bottom: -4px;
  transition: 0.25s;
}
.link .underline_left {
  left: 50%;
  border-radius: 2px 0 0 2px;
}
.link .underline_right {
  right: 50%;
  border-radius: 0 2px 2px 0;
}
.link:hover .underline_left {
  width: 50%;
  left: 0;
}
.link:hover .underline_right {
  width: 50%;
  right: 0;
}

.btn {
  position: relative;
  border: none;
  background: #fff1;
  backdrop-filter: blur(10px);
  color: white;
  padding: 10px 20px;
  letter-spacing: 2px;
  text-transform: uppercase;
  overflow: hidden;
  border: 1px solid #fff5;
  border-radius: 1px;
  transition: 0.25s;
}
.btn:hover {
  box-shadow: 5px 5px 5px #0005;
  color: white;
  transform: scale(1.025);
}
.btn:active {
  box-shadow: 0 0 0 #0005;
  transform: scale(1);
}
.btn::before {
  position: absolute;
  content: "";
  height: 100%;
  width: 100%;
  background: -webkit-linear-gradient(
    left,
    rgba(255, 255, 255, 0.411) 0,
    rgba(255, 255, 255, 0.25) 50%,
    transparent 50%
  );
  top: 0;
  left: -80%;
  color: white;
  transform: skew(-45deg);
  transition: 0.5s;
}
.btn:hover::before {
  left: 120%;
}

/*------ cradit -------------- */
.cradit {
  position: fixed;
  font-size: 12px;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
}
</style>