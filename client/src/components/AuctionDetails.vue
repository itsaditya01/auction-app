<template>
  <div id="auctionDetails">
    <v-img
      v-if="!auction.itemPhoto"
      cover
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <img v-if="auction.itemPhoto" height="250" :src="image" />

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
          >{{ auction.startTime?.split("T")[0] }}
          {{ auction.startTime?.split("T")[1].slice(0, 5) }}</v-chip
        >
        <div class="text-center me-1 d-flex align-center">to</div>
        <v-chip
          >{{ auction.endTime?.split("T")[0] }}
          {{ auction.endTime?.split("T")[1].slice(0, 5) }}</v-chip
        >
      </v-chip-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      image: null,
    };
  },
  props: ["auction"],
  created() {
    console.log(this.auction);
    if (this.auction.itemPhoto) {
      var base64Flag =
        "data:" + this.auction.itemPhoto.contentType + ";base64,";
      var imageStr = this.arrayBufferToBase64(this.auction.itemPhoto.data.data);
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
#auctionDetails {
    color: white;
}
</style>