<template>
  <v-container fluid>
    <div v-if="loading" class="loading">
      <div class="loadingio-spinner-eclipse-afh6smwet9o">
        <div class="ldio-hdy9ozyx8eu"><div></div></div>
      </div>
    </div>
    <v-row>
      <v-col v-for="auction in myAuctions" :key="auction.id" cols="12" md="4">
        <div class="d-flex flex-wrap" style="gap: 35px">
          <auction-card :auction="auction"></auction-card>
        </div>
      </v-col>
      <v-col cols="12" v-if="auctionsLength === 0">
        <div
          class="d-flex justify-center text-white align-center"
          style="height: 150px"
        >
          No auctions to show
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import auctionApi from "@/services/auctionApi";
import AuctionCard from "../components/AuctionCard.vue";

export default {
  components: { AuctionCard },
  data() {
    return {
      myAuctions: [],
      loading: false,
    };
  },
  created() {
    this.getMyAuctions();
  },
  methods: {
    getMyAuctions() {
      this.loading = true;
      auctionApi
        .getMyAuctions()
        .then((result) => {
          if (result.data.success) {
            this.myAuctions = result.data.data.auctionData;
            console.log(this.myAuctions);
          }
        })
        .catch((error) => {
          this.$toast.error(error.response?.data.msg || error.message);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style>
</style>