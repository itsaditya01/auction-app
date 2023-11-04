<template>
  <v-row class="mx-auto mt-4 pb-5 mb-0" style="width: 95%">
    <v-col cols="3">
      <auction-user-list :users="users"></auction-user-list>
    </v-col>
    <v-col cols="5">
      <auction-details
        :isVideo="isVideo"
        :auction="auction"
        :startTime="startTime"
        :isUpcoming="isUpcoming"
        :endTime="endTime"
        :isLive="isLive"
      ></auction-details>
    </v-col>
    <v-col cols="4">
      <bidding-window
        :isLive="isLive"
        :startingBid="startingBid"
        :bids="bids"
        :highestBid="highestBid"
        :isOwner="isOwner"
        @addBid="addBid"
        @changeHighestBid="changeHighestBid"
        @getUsersList="getUsersList"
      ></bidding-window>
    </v-col>
  </v-row>
</template>

<script>
import { socket } from "../services/socket";
import AuctionUserList from "../components/AuctionUserList.vue";
import AuctionDetails from "../components/AuctionDetails.vue";
import auctionApi from "@/services/auctionApi";
import bidApi from "@/services/bidApi";
import BiddingWindow from "../components/BiddingWindow.vue";

export default {
  components: { AuctionUserList, AuctionDetails, BiddingWindow },
  data() {
    return {
      bids: [],
      auction: {},
      users: [],
      isLive: false,
      startingBid: null,
      highestBid: null,
      isOwner: false,
      timeoutFn: null,
      startTime: null,
      endTime: null,
      isvideo: false,
      isUpcoming: false,
    };
  },
  created() {
    this.getAuctionDetails();
    this.getUsersList();
    this.getBids();

    socket.emit(
      "join",
      {
        username: this.$cookies.get("username"),
        userId: this.$cookies.get("id"),
        room: this.$route.params.id,
      },
      (error) => {
        if (error) {
          this.$toast.error("Error in joining auction");
        } else {
          this.$toast.success("You're now connected to this auction");
        }
      }
    );

    socket.on("bid", (bid) => {
      this.getUsersList();
      this.highestBid = bid.bidAmount;
      this.bids.push({
        bidAmount: bid.bidAmount,
        user: {
          firstName: bid.username.split(" ")[0],
          lastName: bid.username.split(" ")[1],
        },
        _id: bid.userId,
      });
    });
  },
  unmounted() {
    socket.disconnect();
    clearTimeout(this.timeoutFn);
  },
  methods: {
    changeHighestBid(bidAmount) {
      this.highestBid = bidAmount;
    },
    addBid(bid) {
      this.bids.push(bid);
    },
    getBids() {
      bidApi.getBids(this.$route.params.id).then((result) => {
        if (result.data.success) {
          this.bids = result.data.data.bidsData;
          this.highestBid = result.data.data.highestBid;
        }
      });
    },
    getUsersList() {
      bidApi.getUsersList(this.$route.params.id).then((result) => {
        if (result.data.success) {
          this.users = result.data.data.usersList;
        }
      }).catch((error) => {
          this.$toast.error(error.response?.data?.msg || error.message);
        });;
    },
    arrayBufferToBase64(buffer) {
      let binary = "";
      let bytes = [].slice.call(new Uint8Array(buffer));
      bytes.forEach((b) => (binary += String.fromCharCode(b)));
      return window.btoa(binary);
    },
    updateBuyer() {
      auctionApi
        .updateBuyer(this.$route.params.id, {
          soldTo: this.users[0]._id?.userId,
          sellingPrice: this.highestBid,
        })
        .then((result) => {
          if (result.data.success) {
            this.$toast.success("Buyer has been updated.");
          }
        })
        .catch((error) => {
          this.$toast.error(error.response?.data?.msg || error.message);
        });
    },
    getAuctionDetails() {
      auctionApi
        .getAuction(this.$route.params.id)
        .then((result) => {
          if (result.data.success) {
            this.auction = result.data.data.auctionData;
            this.startingBid = this.auction.startingPrice;
            this.startTime = result.data.data.startTime;
            this.endTime = result.data.data.endTime;

            if (this.auction.addedBy === this.$cookies.get("id")) {
              this.isOwner = true;
            }

            if (
              this.auction.fileUrl.slice(
                ((this.auction.fileUrl.lastIndexOf(".") - 1) >>> 0) + 2
              ) === "mp4"
            ) {
              this.isVideo = true;
            }

            const currDate = new Date();
            const startTime = new Date(this.auction.startTime);
            const endTime = new Date(this.auction.endTime);

            if (currDate >= startTime && currDate <= endTime) {
              const timestamp = endTime.getTime() - currDate.getTime();
              socket.connect();
              this.isLive = true;

              this.timeoutFn = setTimeout(() => {
                socket.disconnect();
                this.isLive = false;
                this.getAuctionDetails();
                if (this.isOwner) {
                  this.updateBuyer();
                }
              }, timestamp);
            } else if (currDate < startTime) {
              this.isUpcoming = true;
              this.$toast.warning("Auction will be live soon");
            } else {
              this.$toast.warning("Auction has been ended");
            }
          }
        })
        .catch((error) => {
          this.$toast.error(error.response?.data?.msg || error.message);
        });
    },
  },
};
</script>

<style>
</style>