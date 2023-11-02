const Auction = require("./auctionModel");
const mongoose = require("mongoose");

exports.addAuction = async ({
  itemName,
  itemDescription,
  startingPrice,
  addedBy,
  startTime,
  endTime,
  itemPhoto,
}) => {
  try {
    const auction = new Auction({
      itemName,
      itemDescription,
      startingPrice,
      addedBy,
      startTime,
      endTime,
      itemPhoto,
    });
    await auction.save();
    return auction;
  } catch (error) {
    throw error;
  }
};

exports.fetchAllAuction = async () => {
  try {
    const auctions = await Auction.find({}).sort({ endTime: -1 });
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

exports.updateBuyer = async (auctionId, userId, sellingPrice) => {
  try {
    const result = await Auction.findByIdAndUpdate(auctionId, {
      $set: {
        soldTo: new mongoose.mongo.ObjectId(userId),
        sellingPrice,
      },
    });
    return;
  } catch (error) {
    throw error;
  }
};

exports.getAuctionsByUser = async (userId) => {
  try {
    const result = await Auction.find({
      addedBy: new mongoose.Types.ObjectId(userId),
    }).sort({ created_at: -1 });
    return result;
  } catch (error) {
    throw error;
  }
};
