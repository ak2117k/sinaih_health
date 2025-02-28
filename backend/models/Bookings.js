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
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      total_price: { type: Number, required: true },
    },
  ],
  payment_info: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Payments",
    required: true,
  },
  shipping_info: {
    shipping_date: { type: Date, required: true, default: Date.now() },
    shipping_Cost: {
      type: String,
      required: true,
    },
  },
  OrderSummary: {
    Total: {
      type: String,
      required: true,
    },
  },
  OrderStatus: {
    type: String,
    enum: ["Confirmed", "Shipped", "In-transist", "Delivered"],
    default: "Confirmed",
  },
});

const userBookingSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bookings: [bookingSchema],
});

const Bookings = mongoose.model("Bookings", userBookingSchema);
module.exports = Bookings;
