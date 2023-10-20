const Auction = require("./auctionModel");

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
