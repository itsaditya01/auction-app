<template>
  <v-card
    class="mx-auto d-flex flex-column justify-space-between"
    max-width="600"
    height="650"
  >
    <v-toolbar color="orange-lighten-1" dark class="d-flex">
      <v-toolbar-title>Bidding Window</v-toolbar-title>
    </v-toolbar>

    <v-list lines="two" class="d-flex flex-column flex-grow-1">
      <template v-for="(item, index) in items">
        <div
          v-if="item.from === 'me'"
          class="d-flex flex-row-reverse"
          :key="index"
        >
          <v-list-item :key="item.title" :append-avatar="avatar" ripple>
            <template v-slot:title>
              <div v-html="item.title"></div>
            </template>

            <template v-slot:subtitle>
              <div v-html="item.subtitle"></div>
            </template>
          </v-list-item>
        </div>

        <div v-else :key="item.header">
          <v-list-subheader v-if="item.header" :key="item.header" inset>
            {{ item.header }}
          </v-list-subheader>

          <v-divider v-else-if="item.divider" :key="index" inset></v-divider>

          <v-list-item v-else :key="item.title" :prepend-avatar="avatar" ripple>
            <template v-slot:title>
              <div v-html="item.title"></div>
            </template>

            <template v-slot:subtitle>
              <div v-html="item.subtitle"></div>
            </template>
          </v-list-item>
        </div>
      </template>
    </v-list>
    <div class="">
      <v-row>
        <v-col cols="11" class="mx-auto">
          <v-text-field
            v-model="bidAmount"
            type="number"
            append-icon="mdi-send"
            variant="outlined"
            clear-icon="mdi-close-circle"
            label="Message"
            @click:append="sendBid"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
import bidApi from "../services/bidApi";
import { state, socket } from "../services/socket";

export default {
  data() {
    return {
      bidAmount: null,
      avatar:
        "https://cdn4.vectorstock.com/i/1000x1000/52/38/avatar-icon-vector-11835238.jpg",
      items: [
        {
          title: "Meeting ",
          subtitle: `<span class="font-weight-bold">$100</span>`,
        },
        {
          title: "Summer BB",
          subtitle: '<span class="font-weight-bold">$150</span>',
        },
      ],
    };
  },
  methods: {
    sendBid(bidAmount) {
      socket.emit("sendBid", bidAmount, (error) => {
        if (error) {
          this.$toast.error(error);
        } else {
          this.items.push({
            title: "Aditya",
            from: "me",
            subtitle:
              '<span class="font-weight-bold">$' + this.bidAmount + "</span>",
          });
          this.$toast.success("Bid succesfully submitted");
        }
      });
    },
    getBids() {
      bidApi.getBids(this.$route.params.id).then((result) => {
        if (result.data.success) {
          state.bids = result.data.data.bidsData;
        }
      });
    },
  },
};
</script>

<style>
</style>