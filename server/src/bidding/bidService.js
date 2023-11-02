const Bid = require("./bidModel");
const User = require("../user/userModel");
const mongoose = require("mongoose");
const { updateBuyer } = require("../auction/auctionService");

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
    const bids = await Bid.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $unwind: "$user",
      },
      {
        $match: {
          auctionId: new mongoose.Types.ObjectId(auctionId),
        },
      },

      {
        $project: {
          bidAmount: 1,
          "user._id": 1,
          "user.firstName": 1,
          "user.lastName": 1,
        },
      },
      {
        $sort: { created_at: -1 },
      },
    ]);
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

exports.updateBuyerInAuction = async (auction) => {
  try {
    const highestBider = await Bid.find({
      auctionId: new mongoose.Types.ObjectId(auction._id),
    })
      .sort({ bidAmount: -1 })
      .limit(1);

    if (highestBider.length === 0) {
      await updateBuyer(auction._id, null, null);
    } else {
      await updateBuyer(
        auction._id,
        highestBider[0].userId,
        highestBider[0].bidAmount
      );
    }

    return;
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
