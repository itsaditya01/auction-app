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
      cover
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-item>
      <v-card-title>Cafe Badilico</v-card-title>

      <v-card-subtitle>
        <span class="">item tag</span>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <div class="mb-3 text-subtitle-2">Start bid with $100</div>

      <div>
        Small plates, salads & sandwiches - an intimate setting with 12 indoor
        seats plus patio seating.
      </div>
    </v-card-text>

    <v-divider class="mx-4 mb-1"></v-divider>

    <v-card-title>Auction time</v-card-title>

    <div class="px-4">
      <v-chip-group v-model="selection">
        <v-chip>5:30PM</v-chip>

        <v-chip>7:30PM</v-chip>
      </v-chip-group>
    </div>

    <v-card-actions>
      <v-btn color="deep-purple-lighten-2" variant="text" @click="reserve">
        Know more
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    selection: 1,
  }),

  methods: {
    reserve() {
      this.loading = true;

      setTimeout(() => (this.loading = false), 2000);
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