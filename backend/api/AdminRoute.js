const express = require("express");
const router = express.Router();

const {
  handleCreateAdmin,
  handleAdminLogin,
  handleGetProducts,
  handleUpdateProductDetails,
  handleDeleteProduct,
  handleShowUsers,
  handleUpdateUserDetails,
  handleShowBookings,
  handleShowBuyNowBookings,
} = require("../controllers/AdminController");

router.post("/sign-up", handleCreateAdmin);

router.post("/log-in", handleAdminLogin);

router.get("/getproducts", handleGetProducts);

router.patch("/updateProduct", handleUpdateProductDetails);

router.delete("/deleteProduct", handleDeleteProduct);

router.get("/getUsers", handleShowUsers);

router.patch("/updateuserOrderStatus", handleUpdateUserDetails);

router.get("/getBookings", handleShowBookings);

router.get("/getBuyNowBookings", handleShowBuyNowBookings);

module.exports = router;
