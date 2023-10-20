const { conn } = require("../database/connection");
const { addBid, getBidByAuctionId } = require("./bidService");

exports.bid = async (req, res, next) => {
  try {
    const bidAmount = req.body.bidAmount;
    const userId = req.user;
    const auctionId = req.params.id;

    const bid = await addBid(userId, auctionId, bidAmount);

    res.status(200).json({
      success: true,
      msg: "Bid added successfully.",
    });
  } catch (error) {
    next(error);
  }
};

exports.getBids = async (req, res, next) => {
  try {
    const auctionId = req.params.id;

    const bidsData = await getBidByAuctionId(auctionId);

    res.status(200).json({
      success: true,
      data: {
        bidsData,
      },
    });
  } catch (error) {
    next(error);
  }
};
