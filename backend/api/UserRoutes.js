const express = require("express");
const router = express.Router();
const {
  createUser,
  handleUserLogin,
  handleWishlist,
  handleAddToCart,
  handleUpdateCart,
  handleDeleteItemFromCart,
  handleAddAddress,
  handleUpdateAddress,
  handleCreateBooking,
  handleDeleteAddress,
} = require("../controllers/UserController");
const { checkForAuthentication } = require("../middlewares/auth");

//post router for user sign-up
router.post("/sign-up", createUser);

//post router for user log-in
router.post("/log-in", handleUserLogin);

router.put("/wishlist", checkForAuthentication, handleWishlist);

router.put("/addToCart", checkForAuthentication, handleAddToCart);

router.put("/updateCart", handleUpdateCart);

router.delete("/deleteitemfromcart", handleDeleteItemFromCart);

router.post("/addAddress", handleAddAddress);

router.put("/updateAddress", handleUpdateAddress);

router.post("/createBooking", checkForAuthentication, handleCreateBooking);

router.delete("/deleteAddress", checkForAuthentication, handleDeleteAddress);

module.exports = router;
