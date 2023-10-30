import api from "./axios";

export default {
  addBid(auctionId, bidDetails) {
    return api.post("bid/" + auctionId, bidDetails);
  },

  getBids(auctionId) {
    return api.get("bid/" + auctionId);
  },

  getUsersList(auctionId) {
    return api.get("bid/" + auctionId + "/users");
  },
};
