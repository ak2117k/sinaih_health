const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  paymentType: {
    type: String,
    default: "Paypal",
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  transactionId: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payments", paymentSchema);
