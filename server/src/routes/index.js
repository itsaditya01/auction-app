const express = require("express");

const router = express.Router();

router.use("/user", require("../user/userRoutes"));
router.use("/auction", require("../auction/auctionRoutes"));
router.use("/bid", require("../bidding/bidRoutes"));

module.exports = router;
