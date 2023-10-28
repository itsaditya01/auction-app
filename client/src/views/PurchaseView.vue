<template>
  <div
    class="d-flex flex-wrap"
    style="gap: 35px"
    v-if="purchasedItems.length > 0"
  >
    <purchased-item-card
      v-for="item in purchasedItems"
      :item="item"
      :key="item.id"
    ></purchased-item-card>
  </div>
  <div
    class="d-flex justify-center text-white align-center"
    v-else
    style="height: 500px"
  >
    <h5>No purchased items to show...</h5>
  </div>
</template>

<script>
import PurchasedItemCard from "@/components/PurchasedItemCard.vue";
import auctionApi from "@/services/auctionApi";
export default {
  components: {
    PurchasedItemCard,
  },
  data() {
    return {
      purchasedItems: [],
    };
  },
  created() {
    this.getPurchasedItems();
  },
  methods: {
    getPurchasedItems() {
      auctionApi
        .getPurchasedItems()
        .then((result) => {
          console.log("result");
          if (result.data.success) {
            this.purchasedItems = result.data.data.purchasesList;
          }
        })
        .catch((error) => {
          this.$toast.error(error.response.data.msg);
        });
    },
  },
};
</script>

<style scoped>
</style>

