<template>
  <v-card :loading="loading" class="main-card" max-width="354">
    <template v-slot:loader="{ isActive }">
      <v-progress-linear
        :active="isActive"
        color="deep-purple"
        height="4"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      v-if="!auction.fileUrl"
      cover
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <img
      v-if="auction.fileUrl && !isVideo"
      height="250"
      :src="auction.fileUrl"
    />

    <video
      v-if="auction.fileUrl && isVideo"
      height="250"
      :src="auction.fileUrl"
      autoplay
    ></video>

    <v-card-item>
      <v-card-title>{{ auction.itemName }}</v-card-title>

      <v-card-subtitle>
        <span class="">item tag</span>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <div class="mb-3 text-subtitle-2">
        Start bid with ${{ auction.startingPrice }}
      </div>

      <div>
        {{ auction.itemDescription }}
      </div>
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-title>Auction time</v-card-title>

    <div class="px-4">
      <v-chip-group v-model="selection">
        <v-chip
          >{{ auction.startTime.split("T")[0] }}
          {{ auction.startTime.split("T")[1].slice(0, 5) }}</v-chip
        >
        <div class="text-center me-1 d-flex align-center">to</div>
        <v-chip
          >{{ auction.endTime.split("T")[0] }}
          {{ auction.endTime.split("T")[1].slice(0, 5) }}</v-chip
        >
      </v-chip-group>
    </div>

    <v-card-actions>
      <v-btn color="deep-purple-lighten-2" variant="text">
        <router-link :to="'/auction/' + auction._id"> Know more </router-link>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    selection: 1,
    image: null,
    isVideo: false,
  }),
  props: ["auction"],
  created() {
    if (
      this.auction.fileUrl &&
      this.auction.fileUrl.slice(
        ((this.auction.fileUrl.lastIndexOf(".") - 1) >>> 0) + 2
      ) === "mp4"
    ) {
      this.isVideo = true;
    }

    if (this.auction.itemPhoto) {
      var base64Flag =
        "data:" + this.auction.itemPhoto.contentType + ";base64,";
      var imageStr = this.arrayBufferToBase64(this.auction.itemPhoto.data.data);
      this.image = base64Flag + imageStr;
    }
  },
  methods: {
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
    },
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