const mongoose = require("mongoose");
const express = require("express");

const {
  newProduct,
  getProducts,
  getSingleProductDetails,
  handleaAddProductReview,
  handleReviewLike,
  handleReviewDislike,
  getSearchProducts,
} = require("../controllers/ProductController");

const router = express.Router();

router.post("/addProduct", newProduct);

router.get("/getProducts", getProducts);

router.get("/searchproduct", getSearchProducts);

router.get("/:productName", getSingleProductDetails);

router.post("/addReview", handleaAddProductReview);

router.put("/reviewLike", handleReviewLike);

router.put("/reviewDislike", handleReviewDislike);

module.exports = router;
