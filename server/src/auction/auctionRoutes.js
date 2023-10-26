const express = require("express");
const {
  createAuction,
  getAuctionList,
  getAuctionDetails,
  getPurchasesList,
  updateBuyer,
} = require("./auctionController");
const verifytoken = require("../middlewares/verifytoken");

const router = express.Router();

router.get("/", getAuctionList);
router.post("/create", verifytoken, createAuction);
router.get("/purchases", verifytoken, getPurchasesList);
router.get("/:id", verifytoken, getAuctionDetails);
router.put("/:id/sold", updateBuyer);

module.exports = router;
