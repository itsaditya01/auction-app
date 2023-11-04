const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const auctionSchema = new Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    itemPhoto: {
      data: Buffer,
      contentType: String,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    itemDescription: {
      type: String,
      required: true,
    },
    startingPrice: {
      type: Number,
      required: true,
    },
    sellingPrice: {
      type: Number,
    },
    soldTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Auction = mongoose.model("auction", auctionSchema);
module.exports = Auction;
