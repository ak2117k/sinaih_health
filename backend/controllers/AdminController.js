const Admin = require("../models/Admin");
const { Product } = require("../models/Product");
const User = require("../models/User");
const Bookings = require("../models/Bookings");
const BuyNowBookings = require("../models/BuyNowBookings");
const Payments = require("../models/payments");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();
const { setUser } = require("../utils/auth");

const handleCreateAdmin = async (req, res) => {
  try {
    const { username, password, adminCode } = req.body;
    if (!username || !password)
      return res
        .status(400)
        .json({ message: "userName and Password required" });
    const userNameCheck = await Admin.findOne({ username: username });
    if (userNameCheck)
      return res.status(409).json({ message: "Account exist" });
    if (adminCode !== process.env.ADMINCODE)
      return res
        .status(403)
        .json({ message: "Invalid Admin code. Unauthorized access" });
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newAdmin = new Admin({
      username: username,
      password: hashedPassword,
    });
    const response = await newAdmin.save();
    return res.status(201).json({ message: "Admin Created", response });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const handleAdminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Username and password required" });
    const adminCheck = await Admin.findOne({ username: username });
    if (!adminCheck)
      return res.status(404).json({ message: "Account not found" });
    const passwordCheck = await bcrypt.compare(password, adminCheck.password);
    if (!passwordCheck)
      return res.status(404).json({ message: "Invalid Creditianls" });
    return res.status(200).json({ message: "Login Successfull" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const handleGetProducts = async (req, res) => {
  try {
    // if (!req.user) {
    //   return res.status(401).json({ message: "Unauthorized. Please log in." });
    // }
    const response = await Product.find({});
    return res
      .status(200)
      .json({ message: "Product fetched Successfully", response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const handleUpdateProductDetails = async (req, res) => {
  try {
    const { productId, updatedData } = req.body;
    const item = await Product.findByIdAndUpdate(
      productId,
      { $set: updatedData },
      { new: true }
    );
    if (!item) return res.status(404).json({ message: "Product Not found" });
    await item.save();
    return res.status(201).json({ message: "Item updated Successfull" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const handleDeleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const response = Product.findByIdAndDelete(productId);
    if (!response)
      return res.status(404).json({ message: "Product Not found" });
    return res.status(200).json({ message: "Product Deleted successfull" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const handleShowUsers = async (req, res) => {
  try {
    const result = await User.find({})
      .populate("wishlistedItems")
      .populate({
        path: "myCart",
        populate: {
          path: "items.productId",
          model: "Product",
        },
      })
      .populate({
        path: "myOrders",
        populate: {
          path: "bookings.products.productId",
          model: "Product",
        },
      });
    return res.status(200).json({ messgae: "User fetched", result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const handleUpdateUserDetails = async (req, res) => {
  try {
    console.log("route hitted");
    const { userId, orderId, newStatus } = req.body;

    if (!userId || !orderId || !newStatus) {
      return res
        .status(400)
        .json({ message: "User ID, Order ID, and New Status are required" });
    }

    // Update the order status for the specific order inside the myOrders array
    const user = await User.findOneAndUpdate(
      { _id: userId, "myOrders._id": orderId },
      { $set: { "myOrders.$.OrderStatus": newStatus } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User or Order not found" });
    }

    return res.status(200).json({
      message: "Order status updated successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleShowBookings = async (req, res) => {
  try {
    const result = await Bookings.find({})
      .populate("bookings.products.productId")
      .populate("bookings.payment_info");
    return res
      .status(200)
      .json({ message: "Fetched Orders Successfully", result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleShowBuyNowBookings = async (req, res) => {
  try {
    const result = await BuyNowBookings.find({});
    return res
      .status(200)
      .json({ message: "Fetched Orders Successfully", result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleShowPayments = async (req, res) => {
  try {
    const result = await Payments.find({});
    return res
      .status(200)
      .json({ message: "Fetched Orders Successfully", result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  handleCreateAdmin,
  handleAdminLogin,
  handleGetProducts,
  handleUpdateProductDetails,
  handleDeleteProduct,
  handleShowUsers,
  handleUpdateUserDetails,
  handleShowBookings,
  handleShowBuyNowBookings,
  handleShowPayments,
};
