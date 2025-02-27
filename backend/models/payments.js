const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  paymentType: {
    type: String,
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed", "Failed"], // Track payment status
    default: "pending",
    required: true,
  },
  amountPaid: {
    type: Number,
    required: true,
  },
  transactionId: {
    type: String,
    required: function () {
      return this.paymentType === "PayPal"; // Only require for PayPal payments
    },
  },
  paypalDetails: {
    payerId: {
      type: String,
      required: function () {
        return this.paymentType === "PayPal"; // Only required for PayPal
      },
    },
    paymentId: {
      type: String,
      required: function () {
        return this.paymentType === "PayPal"; // Only required for PayPal
      },
    },
    status: {
      type: String,
      enum: ["pending", "approved", "denied"],
      default: "pending",
      required: function () {
        return this.paymentType === "PayPal"; // Only required for PayPal
      },
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payments", paymentSchema);
