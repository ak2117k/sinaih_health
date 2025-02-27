const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
  shippingAddress: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  bookingAddress: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  payment: {
    transactionId: {
      type: String,
    },
    amount: {
      type: String,
    },
    currency: {
      type: String,
    },
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      quantity: { type: String, required: true },
      price: { type: String, required: true },
    },
  ],

  shipping_Cost: {
    type: Number,
  },
  OrderSummary: {
    Total: {
      type: Number,
    },
  },
  OrderStatus: {
    type: String,
    enum: ["Confirmed", "Shipped", "In-transist", "Delivered"],
    default: "Confirmed",
  },
});

const userBuyNowBookingSchema = mongoose.Schema({
  email: {
    type: String,
  },
  bookings: [bookingSchema],
});

const BuyNowBookings = mongoose.model(
  "BuyNowBookings",
  userBuyNowBookingSchema
);
module.exports = BuyNowBookings;
