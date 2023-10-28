<template>
  <v-card color="transparent">
    <v-tabs v-model="tab" align-tabs="center" class="main-tabs">
      <v-tab value="liveAuctions">Live</v-tab>
      <v-tab value="upcomingAuctions">Upcoming</v-tab>
      <v-tab value="completedAuctions">recent</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item
        v-for="n in ['liveAuctions', 'upcomingAuctions', 'completedAuctions']"
        :key="n"
        :value="n"
      >
        <v-container fluid>
          <v-row>
            <v-col
              v-for="auction in auctions[n]"
              :key="auction.id"
              cols="12"
              md="4"
            >
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
      </v-window-item>
    </v-window>
  </v-card>
</template>

<script>
import AuctionCard from "../components/AuctionCard.vue";
import auctionApi from "@/services/auctionApi";
export default {
  components: { AuctionCard },
  data() {
    return {
      tab: "liveAuctions",
      auctions: [],
    };
  },
  async created() {
    await this.getAuctionList();
  },
  methods: {
    async getAuctionList() {
      auctionApi
        .getAuctionList()
        .then((result) => {
          if (result.data.success) {
            this.auctions = result.data.data.auctionData;
            console.log(this.auctions);
          }
        })
        .catch((error) => {
          this.$toast.error(error.response.data.msg);
        });
    },
  },
  computed: {
    auctionsLength() {
      return this.auctions[this.tab]?.length;
    },
  },
};
</script>

<style scoped>
.main-tabs {
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(17, 25, 40, 0.75);
  border-radius: 12px;
  /* border: 1px solid rgba(255, 255, 255, 0.125); */
  color: white;
}
</style>