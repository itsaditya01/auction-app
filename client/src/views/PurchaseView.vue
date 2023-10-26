<template>
  <div class="d-flex flex-wrap" style="gap: 35px;">
    <purchased-item-card
      v-for="i in [2, 345, 5, 32, 32 ,32,234,2,34,243,2,34,234,2,34,23,4]"
      :key="i"
    ></purchased-item-card>
  </div>
</template>

<script>
import PurchasedItemCard from "@/components/PurchasedItemCard.vue";
export default {
  components: {
    PurchasedItemCard,
  },
};
</script>

<style scoped>
</style>

