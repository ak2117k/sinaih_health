const mongoose = require("mongoose");
const express = require("express");
const { createNewBooking } = require("../controllers/BuyNow");

const router = express.Router();

router.post("/createBuyNowBooking", createNewBooking);

module.exports = router;
