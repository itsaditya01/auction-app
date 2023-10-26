const { conn } = require("../database/connection");
const {
  addAuction,
  fetchAllAuction,
  fetchAuctionDetails,
  getAllPurchases,
  updateBuyer,
} = require("./auctionService");

function convertUTCDateToLocalDate(date) {
  var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

  var offset = date.getTimezoneOffset() / 60;
  var hours = date.getHours();

  newDate.setHours(hours - offset);

  return newDate;
}

exports.createAuction = async (req, res, next) => {
  const session = await conn.startSession();
  try {
    session.startTransaction();

    const auction = await addAuction({ ...req.body, addedBy: req.user });
    await session.commitTransaction();

    res.status(201).json({
      success: true,
      msg: "Auction created successfully.",
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  }
};

exports.getAuctionList = async (req, res, next) => {
  try {
    const auctionList = await fetchAllAuction();

    const currentDate = convertUTCDateToLocalDate(new Date());
    auctions = auctionList.map((auction) => {
      auction.startTime = convertUTCDateToLocalDate(auction.startTime);
      auction.endTime = convertUTCDateToLocalDate(auction.endTime);
      return auction;
    });

    const liveAuctions = auctions.filter((auction) => {
      if (auction.startTime <= currentDate && auction.endTime > currentDate) {
        return auction;
      }
    });

    let completedAuctions = auctions.filter((auction) => {
      if (auction.endTime < currentDate) {
        return auction;
      }
    });
    let upcomingAuctions = auctions.filter((auction) => {
      if (auction.startTime > currentDate) {
        return auction;
      }
    });

    const auctionData = {
      liveAuctions,
      completedAuctions,
      upcomingAuctions,
    };

    res.status(200).json({
      success: true,
      data: {
        auctionData,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getAuctionDetails = async (req, res, next) => {
  try {
    const auctionId = req.params.id;

    const auctionData = await fetchAuctionDetails(auctionId);

    res.status(200).json({
      success: true,
      data: {
        auctionData,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.getPurchasesList = async (req, res, next) => {
  try {
    const purchasesList = await getAllPurchases(req.user);
    res.status(200).json({
      success: true,
      data: {
        purchasesList,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.updateBuyer = async (req, res, next) => {
  try {
    const auctionId = req.params.id;
    const soldTo = req.body.soldTo;
    const auction = await updateBuyer(auctionId, soldTo);

    res.status(200).json({
      success: true,
      auction,
      msg: "Auction ended successfully",
    });
  } catch (error) {
    next(error);
  }
};
