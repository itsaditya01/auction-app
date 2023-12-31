const express = require("express");

const {
  createAuction,
  getAuctionList,
  getAuctionDetails,
  getPurchasesList,
  updateBuyer,
  getAuctionByUserId,
} = require("./auctionController");
const verifytoken = require("../middlewares/verifytoken");
const upload = require("../config/multer");
const { fileValidation } = require("../middlewares/fileValidation");

const router = express.Router();

router.get("/", getAuctionList);
router.get("/my-auctions", verifytoken, getAuctionByUserId);
router.post(
  "/create",
  verifytoken,
  upload.single("file"),
  fileValidation,
  createAuction
);
router.get("/purchases", verifytoken, getPurchasesList);
router.get("/:id", verifytoken, getAuctionDetails);
router.put("/:id/sold", updateBuyer);

module.exports = router;
