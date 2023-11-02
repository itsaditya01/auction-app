<template>
  <v-card class="mx-auto main-card" max-width="425">
    <v-list lines="two" class="users-card">
      <v-list-subheader color="white" class="text-h6 py-3"
        >Total bidders</v-list-subheader
      >

      <div v-if="loading" class="loading">
        <div class="loadingio-spinner-eclipse-afh6smwet9o">
          <div class="ldio-hdy9ozyx8eu"><div></div></div>
        </div>
      </div>
      <v-list-item
        v-else
        v-for="(user, index) in users"
        prepend-avatar="https://cdn.vuetifyjs.com/images/lists/1.jpg"
        :title="user.name?.firstName + ' ' + user.name?.lastName"
        :active="index === 0 && !isLive"
        active-color="light-green-accent-4"
        :key="user._id?.userId"
      >
        <template v-slot:subtitle>
          <span class="font-weight-bold">Highest bid</span> &mdash; ${{
            user.maxBidAmount
          }}
        </template>
      </v-list-item>

      <v-divider inset></v-divider>
    </v-list>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      externalHtml: `<div
          class="d-flex px-10 bg-secondary rounded-pill"
        >
          Winner
        </div>`,
    };
  },
  props: ["users", "isLive"],
  methods: {},
};
</script>

<style scoped>
.main-card {
  background: transparent;
}
.users-card {
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(17, 25, 40, 0.75);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.125);
  color: white;
}
</style>