const mongoose = require("mongoose");

// Reply Schema
const replySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  Image: {
    type: Buffer,
  },
  like: {
    type: Number,
  },
  dislike: {
    type: Number,
  },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reply", // Recursive reference to the Reply model
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Review Schema
const reviewSchema = mongoose.Schema({
  ratings: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  Image: {
    type: Buffer,
  },
  like: {
    type: Number,
    default: 0,
  },
  dislike: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  comments: {
    type: String,
  },
  replies: [replySchema], // Array of replies
});

// Product Schema
const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  brand: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  oprice: {
    type: Number,
  },
  description: {
    type: String,
    required: true,
  },
  stockSize: {
    type: Number,
    required: true,
  },
  images: [
    {
      type: String, // Keep Buffer if you're saving images as raw binary data
    },
  ],
  dose_form: {
    type: String,
    required: true,
  },
  pack_size: {
    type: String,
    required: true,
  },
  reviews: [reviewSchema], // Array of reviews for the product
});

productSchema.index({
  name: "text",
  brand: "text",
  category: "text",
  description: "text",
});

// Models
const Product = mongoose.model("Product", productSchema);
const Reply = mongoose.model("Reply", replySchema); // Separate model for replies

module.exports = { Product, Reply };
