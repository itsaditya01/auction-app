<template>
  <v-card class="main-card" width="344">
    <v-img
      v-if="!item.itemPhoto"
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
      cover
    ></v-img>

    <img v-if="item.itemPhoto" height="200" :src="image" />

    <v-card-title> {{ item.itemName }} </v-card-title>

    <v-card-subtitle> from name </v-card-subtitle>

    <v-card-text>
      <div class="text-subtitle-2">
        Purchased price ${{ item.sellingPrice }}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="orange-lighten-2" variant="text"> Explore </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        @click="show = !show"
      ></v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{ item.itemDescription }}
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    show: false,
    image: null,
  }),
  props: ["item"],
  created() {
    if (this.item.itemPhoto) {
      var base64Flag = "data:" + this.item.itemPhoto.contentType + ";base64,";
      var imageStr = this.arrayBufferToBase64(this.item.itemPhoto.data.data);
      this.image = base64Flag + imageStr;
    }
  },
  methods: {
    arrayBufferToBase64(buffer) {
      var binary = "";
      var bytes = [].slice.call(new Uint8Array(buffer));
      bytes.forEach((b) => (binary += String.fromCharCode(b)));
      return window.btoa(binary);
    },
  },
};
</script>

<style scoped>
.main-card {
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(17, 25, 40, 0.75);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  color: white;
}
.main-card::before {
  position: fixed;
  content: "";
  box-shadow: 0 0 100px 40px #ffffff94;
  top: -10%;
  left: -100%;
  transform: rotate(-45deg);
  height: 60rem;
  transition: 0.5s all;
}

.main-card:hover {
  border: 1px solid #ffffff44;
  box-shadow: 0 5px 10px 4px #000000aa;
  transform: scale(1.015);
  filter: brightness(1.3);
}
.main-card:hover::before {
  filter: brightness(0.5);
  top: -100%;
  left: 200%;
}
</style>
