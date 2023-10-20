const express = require("express");
const verifytoken = require("../middlewares/verifytoken");

const router = express.Router();

router.post('/bid/:id', verifytoken, )

module.exports = router;
