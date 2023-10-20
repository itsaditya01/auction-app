const express = require("express");
const { createAuction, getAuctionList, getAuctionDetails } = require("./auctionController");
const verifytoken = require("../middlewares/verifytoken");

const router = express.Router();

router.get("/", getAuctionList);
router.post("/create", verifytoken, createAuction);
router.get('/:id', verifytoken, getAuctionDetails)

module.exports = router;
