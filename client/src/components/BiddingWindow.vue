<template>
  <v-card
    class="mx-auto d-flex flex-column justify-space-between custom-card"
    max-width="600"
    height="650"
  >
    <v-toolbar class="d-flex custom-title">
      <v-toolbar-title>Bidding Window </v-toolbar-title>
      <img
        v-if="isLive"
        :src="require('../assets/live.gif')"
        alt="live"
        height="25"
        class="pe-5"
      />
    </v-toolbar>

    <v-list
      lines="two"
      class="d-flex flex-column flex-grow-1 custom-card pt-2"
      id="userlist"
      ref="container"
    >
      <div v-for="(bid, index) in bids" :key="index">
        <div v-if="bid.from === 'me'" class="d-flex flex-row-reverse">
          <v-list-item :append-avatar="avatar" ripple>
            <template v-slot:title>
              <div v-html="'Me'" class="text-end"></div>
            </template>

            <template v-slot:subtitle>
              <div>
                <span class="font-weight-bold">${{ bid.bidAmount }}</span>
              </div>
            </template>
          </v-list-item>
        </div>

        <div v-else>
          <!-- <v-list-subheader v-if="item.header" :key="item.header" inset>
            {{ item.header }}
          </v-list-subheader>

          <v-divider v-else-if="item.divider" :key="index" inset></v-divider> -->

          <v-list-item :prepend-avatar="avatar" ripple>
            <template v-slot:title>
              <div
                v-html="bid.user?.firstName + ' ' + bid.user?.lastName"
              ></div>
            </template>

            <template v-slot:subtitle>
              <div>
                <span class="font-weight-bold">${{ bid.bidAmount }}</span>
              </div>
            </template>
          </v-list-item>
        </div>
      </div>
    </v-list>
    <div class="" v-if="!isOwner">
      <v-row>
        <v-col cols="11" class="mx-auto mt-4">
          <v-text-field
            ref="bidamount"
            :rules="[
              rules.required,
              rules.isValid,
              rules.validBid,
              rules.validHighestBid,
            ]"
            :disabled="!isLive"
            v-model="bidAmount"
            type="number"
            append-icon="mdi-send"
            variant="outlined"
            clear-icon="mdi-close-circle"
            label="Bid"
            @click:append="sendBid"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
import bidApi from "@/services/bidApi";
import { socket } from "../services/socket";
import { useVuelidate } from "@vuelidate/core";

export default {
  props: ["bids", "isLive", "startingBid", "highestBid", "isOwner"],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      bidAmount: null,
      avatar:
        "https://cdn4.vectorstock.com/i/1000x1000/52/38/avatar-icon-vector-11835238.jpg",
      rules: {
        required: (value) => !!value || "Field is required",
        isValid: (value) => value > 0 || "Bid should be positive number",
      },
    };
  },
  validations() {
    return {
      bidAmount: {
        sameAsExpectedValue: (value) => value < startingBid,
        lessThanHighestBid: (value) => value < highestBid,
      },
    };
  },
  mounted() {
    console.log(this.isOwner);
    this.rules["validBid"] = (value) =>
      value >= this.startingBid ||
      "Bid should not be smaller than Starting price";
    this.rules["validHighestBid"] = (value) =>
      value >= this.highestBid ||
      "Bid should not be smaller than current highest bid";
  },
  watch: {
    bids: {
      handler() {
        this.$nextTick(this.scrollToBottom);
      },
      deep: true,
    },
  },
  methods: {
    scrollToBottom() {
      const container = document.getElementById("userlist");
      container.scrollTop = container.scrollHeight;
    },
    sendBid() {
      if (!socket.connected) {
        this.$toast.error(
          "You're not connected to auction. Please refresh the page"
        );
      }
      this.$refs["bidamount"].validate().then((result) => {
        if (result.length === 0) {
          socket.emit("sendBid", this.bidAmount, async (error) => {
            if (error) {
              this.$toast.error(error);
            } else {
              const response = await bidApi.addBid(this.$route.params.id, {
                bidAmount: this.bidAmount,
              });
              if (!response.data.success) {
                this.$toast.error(response.data.msg);
              }
              this.$toast.success("Bid succesfully submitted");

              this.$emit("addBid", {
                user: {
                  firstName: "Me",
                  lastName: "",
                },
                from: "me",
                bidAmount: this.bidAmount,
              });
              this.$emit("changeHighestBid", this.bidAmount);
              this.$emit("getUsersList");
              this.bidAmount = null;
            }
          });
        }
      });
      return;
    },
  },
};
</script>

<style scoped>
.custom-card {
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  background-color: rgba(17, 25, 40, 0.75);
  /* border-radius: 12px; */
  border: 1px solid rgba(255, 255, 255, 0.125);
  color: white;
}

.custom-title {
  background: #1c2434;
  color: white;
  box-shadow: -1px 4px 10px 3px rgba(199, 199, 199, 0.75);
}
</style>