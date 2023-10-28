const express = require("express");

const {
  createAuction,
  getAuctionList,
  getAuctionDetails,
  getPurchasesList,
  updateBuyer,
} = require("./auctionController");
const verifytoken = require("../middlewares/verifytoken");
const upload = require("../config/multer");

const router = express.Router();

router.get("/", getAuctionList);
router.post(
  "/create",
  verifytoken,
  upload.single("profilePhoto"),
  createAuction
);
router.get("/purchases", verifytoken, getPurchasesList);
router.get("/:id", verifytoken, getAuctionDetails);
router.put("/:id/sold", updateBuyer);

module.exports = router;
