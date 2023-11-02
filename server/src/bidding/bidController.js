const { conn } = require("../database/connection");
const {
  addBid,
  getBidByAuctionId,
  getUsersByAuctionId,
} = require("./bidService");

exports.bid = async (req, res, next) => {
  try {
    const bidAmount = req.body.bidAmount;
    const userId = req.user;
    const auctionId = req.params.id;

    console.log({ bidAmount, userId, auctionId });

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

    const bids = await getBidByAuctionId(auctionId);

    let highestBid = 0;
    for (let index = 0; index < bids.length; index++) {
      if (highestBid < bids[index].bidAmount) {
        highestBid = bids[index].bidAmount;
      }
      if (bids[index].user._id.equals(req.user)) {
        bids[index].from = "me";
      }
    }

    console.log(bids);

    res.status(200).json({
      success: true,
      data: {
        bidsData: bids,
        highestBid,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getUsersWhoBidded = async (req, res, next) => {
  try {
    const usersList = await getUsersByAuctionId(req.params.id);

    res.status(200).json({
      success: true,
      data: {
        usersList,
      },
    });
  } catch (error) {
    next(error);
  }
};
