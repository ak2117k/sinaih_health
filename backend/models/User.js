const mongoose = require("mongoose");
const Cart = require("./Cart");

const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  flatNoOrBuildingNameAndStreetName: {
    type: String,
    required: true,
  },
  AreaoRLocality: {
    type: String,
    required: true,
  },
  LandMark: {
    type: String,
  },
});

const userSchema = mongoose.Schema(
  {
    profile: {
      email: {
        type: String,
        required: true,
        unique: true,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      passwordHash: {
        type: String,
        required: true,
      },
      DOB: {
        type: String,
      },
      gender: {
        type: String,
        enum: ["Male", "Female", "Others"],
      },
      contactNumber: {
        type: Number,
      },
      country: {
        // Added country field to the profile
        type: String,
        required: true,
      },
      acessType: {
        type: String,
        default: "Normal",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },

    myOrders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bookings",
      },
    ],
    myAddresses: [addressSchema],
    myPayments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Payments",
      },
    ],
    myCart: [
      { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Cart" },
    ],
    wishlistedItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
