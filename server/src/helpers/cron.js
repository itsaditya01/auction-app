const cron = require("node-cron");
const Auction = require("../auction/auctionModel");
const { updateBuyerInAuction } = require("../bidding/bidService");

function scheduleAuctionTasks() {
  cron.schedule("*/10 * * * * *", async () => {
    const currentTime = new Date(); // Get the current time

    const auctionsToUpdate = await Auction.find({
      endTime: { $lte: currentTime },
      soldTo: { $exists: false },
    });

    auctionsToUpdate.map(async (auction) => {
      console.log(auction.itemName);
      try {
        await updateBuyerInAuction(auction);
      } catch (error) {
        console.log(error);
      }
    });
  });
}

module.exports = scheduleAuctionTasks;
