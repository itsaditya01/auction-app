const Bid = require("./bidModel");
const User = require("../user/userModel");
const mongoose = require("mongoose");

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
    const bids = await Bid.find({ auctionId }).sort({ created_at: 1 });
    return bids;
  } catch (error) {
    throw error;
  }
};

exports.getUsersByAuctionId = async (auctionId) => {
  try {
    const users = await Bid.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "creators",
        },
      },
      {
        $match: {
          auctionId: new mongoose.Types.ObjectId(auctionId),
        },
      },
      {
        $group: {
          _id: {
            userId: "$userId",
          },
          name: {
            $first: {
              firstName: "$creators.firstName",
              lastName: "$creators.lastName",
            },
          },
          maxBidAmount: { $max: "$bidAmount" },
        },
      },
      {
        $sort: { maxBidAmount: -1 },
      },
    ]);
    return users;
  } catch (error) {
    throw error;
  }
};

// {
//         $unwind: "$userBids",
//       },
//       {
//         $match: { "userBids.auctionId": auctionId },
//       },
//       {
//         $group: {
//           _id: "$_id",
//           maxBidAmount: { $max: "$userBids.amount" },
//         },
//       },
//       {
//         $sort: { maxBidAmount: -1 },
//       },
