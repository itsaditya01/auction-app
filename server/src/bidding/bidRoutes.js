const express = require("express");
const verifytoken = require("../middlewares/verifytoken");
const { bid, getBids, getUsersWhoBidded } = require("./bidController");

const router = express.Router();

router.post("/:id", verifytoken, bid);
router.get("/:id", verifytoken, getBids);
router.get("/:id/users", verifytoken, getUsersWhoBidded);

module.exports = router;
