<template>
  <v-card color="transparent">
    <v-tabs v-model="tab" align-tabs="center" class="main-tabs">
      <v-tab :value="1">Live</v-tab>
      <v-tab :value="2">Upcoming</v-tab>
      <v-tab :value="3">recent</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item v-for="n in 3" :key="n" :value="n">
        <v-container fluid>
          <v-row>
            <v-col v-for="i in 6" :key="i" cols="12" md="4">
              <div class="d-flex flex-wrap" style="gap: 35px">
                <auction-card v-for="i in [2, 345, 5]" :key="i"></auction-card>
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
export default {
  components: { AuctionCard },
  data() {
    return {
      tab: null,
    };
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