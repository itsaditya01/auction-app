const Auction = require("./auctionModel");
const mongoose = require("mongoose");

exports.addAuction = async ({
  itemName,
  itemDescription,
  startingPrice,
  addedBy,
  startTime,
  endTime,
}) => {
  try {
    const auction = new Auction({
      itemName,
      itemDescription,
      startingPrice,
      addedBy,
      startTime,
      endTime,
    });
    await auction.save();
    return auction;
  } catch (error) {
    throw error;
  }
};

exports.fetchAllAuction = async () => {
  try {
    const auctions = await Auction.find({});
    return auctions;
  } catch (error) {
    throw error;
  }
};

exports.fetchAuctionDetails = async (auctionId) => {
  try {
    const result = await Auction.findById(auctionId);
    return result;
  } catch (error) {
    throw error;
  }
};

exports.getAllPurchases = async (userId) => {
  try {
    console.log(userId);
    const result = await Auction.find({
      soldTo: userId,
    });
    return result;
  } catch (error) {
    throw error;
  }
};

exports.updateBuyer = async (auctionId, userId) => {
  try {
    const result = await Auction.findByIdAndUpdate(auctionId, {
      soldTo: new mongoose.mongo.ObjectId(userId),
    });
  } catch (error) {
    throw error;
  }
};
