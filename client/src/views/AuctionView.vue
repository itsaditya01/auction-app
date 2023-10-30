<template>
  <v-row class="mx-auto mt-4" style="width: 95%">
    <v-col cols="3">
      <auction-user-list></auction-user-list>
    </v-col>
    <v-col cols="5">
      <auction-details :auction="auction"></auction-details>
    </v-col>
    <v-col cols="4">
      <bidding-window></bidding-window>
    </v-col>
  </v-row>
</template>

<script>
import { socket } from "../services/socket";
import AuctionUserList from "../components/AuctionUserList.vue";
import AuctionDetails from "../components/AuctionDetails.vue";
import auctionApi from "@/services/auctionApi";
import BiddingWindow from "../components/biddingWindow.vue";
export default {
  components: { AuctionUserList, AuctionDetails, BiddingWindow },
  data() {
    return {
      messages: [],
      auction: {},
    };
  },
  created() {
    this.getAuctionDetails();
    console.log("asda");
    socket.connect();

    socket.emit(
      "join",
      { username: "sdasd", userId: "adjksndkjk", room: "5" },
      (error) => {
        if (error) {
          this.$toast.error("Error in joining auction");
        } else {
          this.$toast.success("You're now connected to this auction");
        }
      }
    );

    
  },
  unmounted() {
    socket.disconnect();
  },
  methods: {
    getAuctionDetails() {
      auctionApi
        .getAuction(this.$route.params.id)
        .then((result) => {
          if (result.data.success) {
            this.auction = result.data.data.auctionData;
          }
        })
        .catch((error) => {
          this.$toast.error(error.response.data.msg || error.message);
        });
    },
  },
};
</script>

<style>
</style>