<template>
  <div id="auctionDetails">
    <div class="text-center image-container">
      <v-img
        v-if="!auction.fileUrl"
        cover
        height="450"
        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
      ></v-img>

      <img
        v-if="!isVideo"
        style="max-width: 100%; height: 450px"
        :src="auction.fileUrl"
      />
      <video
        v-else
        :src="auction.fileUrl"
        style="max-width: 100%; height: 450px"
        autoplay
      ></video>
      <img
        v-if="!isLive && !isUpcoming"
        :src="require('../assets/sold_image.png')"
        class="sold-image"
      />
    </div>

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
          >{{ startTime?.split("T")[0] }}
          {{ startTime?.split("T")[1].slice(0, 5) }}</v-chip
        >
        <div class="text-center me-1 d-flex align-center">to</div>
        <v-chip
          >{{ endTime?.split("T")[0] }}
          {{ endTime?.split("T")[1].slice(0, 5) }}</v-chip
        >
      </v-chip-group>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    console.log(this.isLive);
  },
  props: ["auction", "isLive", "startTime", "endTime", "isVideo", "isUpcoming"],
};
</script>

<style scoped>
#auctionDetails {
  color: white;
}

.sold-image {
  position: absolute;
  top: 0;
  height: 400px;
}

.image-container {
  position: relative;
  display: flex;
  justify-content: center;
  height: 450px;
}
</style>