const Bid = require("./bidModel");

exports.addBid = async (userId, auctionId, bidAmount) => {
  try {
    const bid = Bid({
      userId,
      auctionId,
      bidAmount,
    });
    await bid.save();
    return bid;
  } catch (error) {
    throw error;
  }
};

exports.getBidByAuctionId = async (auctionId) => {
  try {
    const bids = await Bid.find({ auctionId });
    return bids;
  } catch (error) {
    throw error;
  }
};
