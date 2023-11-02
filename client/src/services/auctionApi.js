import api from "./axios";

export default {
  addAuction(auctionDetails) {
    return api.post("auction/create", auctionDetails);
  },

  getAuctionList() {
    return api.get("auction");
  },

  getMyAuctions() {
    return api.get("auction/my-auctions");
  },

  getAuction(id) {
    return api.get("auction/" + id);
  },

  getPurchasedItems() {
    return api.get("auction/purchases");
  },

  updateBuyer(auctionId, body) {
    return api.post("auction/" + auctionId + "/sold", body);
  },
};
