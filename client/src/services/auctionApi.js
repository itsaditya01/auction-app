import api from "./axios";

export default {
  addAuction(auctionDetails) {
    return api.post("auction/create", auctionDetails);
  },

  getAuctionList() {
    return api.get("auction");
  },

  getAuction(id) {
    return api.get("auction/" + id);
  },

  getPurchasedItems() {
    return api.get("auction/purchases");
  },
};
