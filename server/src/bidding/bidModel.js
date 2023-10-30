const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bidSchema = new Schema(
  {
    bidAmount: {
      type: Number,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    auctionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auction",
    },
  },
  { timestamps: true }
);

const Bid = mongoose.model("Bid", bidSchema);
module.exports = Bid;
