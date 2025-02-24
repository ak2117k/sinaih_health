const User = require("../models/User");
const { v4: uuid } = require("uuid");
const { setUser, getUser } = require("../utils/auth");
const bcrypt = require("bcrypt");
const { mongoose } = require("mongoose");
const Cart = require("../models/Cart");
const Bookings = require("../models/Bookings");
const Payments = require("../models/payments");
const createUser = async (req, res) => {
  try {
    const {
      email,
      firstName,
      lastName,
      password,
      DOB,
      gender,
      contactNumber,
      country,
    } = req.body;

    const oldUser = await User.findOne({ "profile.email": email });
    console.log(oldUser);
    if (oldUser) {
      return res.status(400).json({ message: "User already exits" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new User({
      profile: {
        email: email,
        firstName: firstName,
        lastName: lastName,
        passwordHash: hashedPassword,
        DOB: DOB,
        gender: gender,
        contactNumber: contactNumber,
        country: country,
      },
      myOrders: [],
      myAddresses: [],
      myPayments: [],
      myCart: [],
    });
    const response = await newUser.save();
    if (response) {
      return res
        .status(201)
        .json({ message: "User Created Successfully", response });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log("email", email, "password", password);

  const user = await User.findOne({ "profile.email": email })
    .populate("wishlistedItems")
    .populate({
      path: "myCart",
      populate: {
        path: "items.productId",
        model: "Product",
      },
    });
  if (!user) {
    return res.status(404).json({ message: "Invalid Username or password" });
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.profile.passwordHash
  );
  console.log(passwordMatch);
  if (!passwordMatch) {
    return res.status(404).json({ message: "Invalid Username or password" });
  }
  const token = setUser(user);
  console.log(user);
  return res
    .status(201)
    .json({ message: "Login successfull", token: token, user: user });
  // res.cookie("uid", token, {
  //   httpOnly: true, // Cookie will not be accessible via JavaScript
  //   secure: false, // Set to false for localhost (since it's HTTP, not HTTPS)
  //   sameSite: "Strict", // Helps prevent CSRF attacks
  //   maxAge: 3600000, // 1 hour expiration
  // });
  // return res.redirect("/log-in");
};

const getUserDetails = async (userId) => {
  try {
    const user = User.findOne({ _id: userId })
      .populate("wishlistedItems")
      .populate({
        path: "myCart",
        populate: {
          path: "items.productId",
          model: "Product",
        },
      });

    return user;
  } catch (error) {
    console.log("Error fetching user details");
    throw new Error("Unable to fetch user details");
  }
};

const handleWishlist = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }
    const { productId, userId } = req.query;
    if (!productId)
      return res.status(400).json({ message: "Product Id required" });
    console.log("after pdid");
    console.log(userId, productId);
    const userDetails = await User.findOne({ _id: userId });
    console.log(userDetails);
    if (!userDetails)
      return res.status(404).json({ message: "User not found" });
    const itemIndex = userDetails.wishlistedItems.findIndex(
      (item) => item.toString() === productId
    );
    console.log(itemIndex);
    if (itemIndex > -1) userDetails.wishlistedItems.splice(itemIndex, 1);
    else userDetails.wishlistedItems.push(productId);

    await userDetails.save();
    const updatedUser = await getUserDetails(userId);

    return res.status(200).json({
      message:
        itemIndex > -1
          ? "Item removed from wishlist"
          : "Item added to wishlist",
      updatedUser,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const handleAddToCart = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized. Please log in." });
    }

    const { productId, qty, userId } = req.query;

    if (!productId || !qty) {
      return res
        .status(400)
        .json({ message: "Product Id and Quantity are required" });
    }

    const quantity = parseInt(qty, 10);

    if (isNaN(quantity) || quantity <= 0) {
      return res.status(400).json({ message: "Invalid quantity value" });
    }

    const userDetails = await User.findOne({ _id: userId });

    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    let userCart = await Cart.findOne({ userId: userId });

    if (!userCart) {
      userCart = new Cart({
        userId: userId,
        items: [
          {
            productId: productId,
            quantity: quantity,
          },
        ],
      });
      await userCart.save();

      userDetails.myCart.push(userCart._id);
      await userDetails.save();
      console.log(userDetails);
    } else {
      const existingItemIndex = userCart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (existingItemIndex > -1) {
        userCart.items[existingItemIndex].quantity += quantity;
      } else {
        userCart.items.push({
          productId: productId,
          quantity: quantity,
        });
      }

      await userCart.save();
    }
    const updatedUser = await getUserDetails(userId);

    return res.status(200).json({
      message: "Item added to cart successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server error" });
  }
};

const handleUpdateCart = async (req, res) => {
  try {
    const { productId, userId, type } = req.query;
    console.log(productId, userId, type);

    // Find the user's cart
    let userCart = await Cart.findOne({ userId: userId });

    if (!userCart) {
      return res.status(404).json({ message: "Cart not found for this user" });
    }

    // Find the index of the product in the cart
    const itemIndex = userCart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    // Check if the product exists in the cart
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Update the quantity based on the type (add or remove)
    if (type === "add") {
      userCart.items[itemIndex].quantity += 1;
    } else if (type === "sub") {
      if (userCart.items[itemIndex].quantity > 1) {
        userCart.items[itemIndex].quantity -= 1;
      } else {
        return res
          .status(400)
          .json({ message: "Cannot reduce quantity below 1" });
      }
    }

    // Save the updated cart
    await userCart.save();

    // Retrieve updated user details
    const updatedUser = await getUserDetails(userId);

    return res.status(200).json({
      message: "Item updated successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleDeleteItemFromCart = async (req, res) => {
  try {
    const { productId, userId } = req.query;
    let userCart = await Cart.findOne({ userId: userId });
    console.log(userCart);
    if (!userCart) {
      return res.status(404).json({ message: "Cart not found for this user" });
    }
    userCart.items = await userCart.items.filter(
      (item) => item.productId.toString() !== productId
    );
    await userCart.save();
    const updatedUser = await getUserDetails(userId);
    console.log(updatedUser);
    return res.status(200).json({
      message: "Item successfully removed from the cart",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleAddAddress = async (req, res) => {
  try {
    const {
      name,
      state,
      city,
      postalCode,
      contactNumber,
      country,
      userId,
      flatNoOrBuildingNameAndStreetName,
      AreaoRLocality,
      LandMark,
    } = req.body;
    if (!userId) return res.status(400).json({ message: "userID required" });

    console.log(
      name,
      state,
      city,
      postalCode,
      contactNumber,
      country,
      userId,
      flatNoOrBuildingNameAndStreetName,
      AreaoRLocality,
      LandMark
    );

    if (
      !name ||
      !state ||
      !city ||
      !postalCode ||
      !contactNumber ||
      !country ||
      !AreaoRLocality ||
      !flatNoOrBuildingNameAndStreetName
    ) {
      return res.status(400).json({ message: "All Fields required" });
    }
    const userDetails = await User.findOne({ _id: userId });
    if (!userDetails)
      return res.status(404).json({ message: "User not found" });

    const newAddress = {
      name: name,
      state: state,
      city: city,
      postalCode: postalCode,
      contactNumber: contactNumber,
      country: country,
      flatNoOrBuildingNameAndStreetName: flatNoOrBuildingNameAndStreetName,
      AreaoRLocality: AreaoRLocality,
      LandMark: LandMark,
    };

    userDetails.myAddresses.push(newAddress);

    await userDetails.save();

    const updatedUser = await getUserDetails(userId);

    return res.status(200).json({ message: "Address Added", updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleUpdateAddress = async (req, res) => {
  try {
    const {
      name,
      state,
      city,
      postalCode,
      contactNumber,
      country,
      userId,
      flatNoOrBuildingNameAndStreetName,
      AreaoRLocality,
      LandMark,
      addressId,
    } = req.body;

    if (!userId || !addressId) {
      return res
        .status(400)
        .json({ message: "UserID and AddressID are required" });
    }
    console.log(
      name,
      state,
      city,
      postalCode,
      contactNumber,
      country,
      AreaoRLocality,
      flatNoOrBuildingNameAndStreetName
    );

    if (
      !name ||
      !state ||
      !city ||
      !postalCode ||
      !contactNumber ||
      !country ||
      !AreaoRLocality ||
      !flatNoOrBuildingNameAndStreetName
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userDetails = await User.findOne({ _id: userId });
    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the address by addressId
    const addressIndex = userDetails.myAddresses.findIndex(
      (address) => address._id.toString() === addressId
    );

    if (addressIndex === -1) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Update the address details
    userDetails.myAddresses[addressIndex] = {
      name,
      state,
      city,
      postalCode,
      contactNumber,
      country,
      flatNoOrBuildingNameAndStreetName,
      AreaoRLocality,
      LandMark,
    };

    // Save the updated user details
    await userDetails.save();

    // Retrieve updated user details
    const updatedUser = await getUserDetails(userId);

    return res
      .status(200)
      .json({ message: "Address updated successfully", updatedUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleDeleteAddress = async (req, res) => {
  try {
    const { addressId, userId } = req.query;

    if (!addressId || !userId) {
      return res
        .status(400)
        .json({ message: "Address Id and user Id required" });
    }

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const updatedAddresses = user.myAddresses.filter(
      (address) => address._id.toString() !== addressId.toString()
    );

    user.myAddresses = updatedAddresses;
    await user.save();

    const updatedUser = await getUserDetails(userId);

    return res.status(200).json({
      message: "Address successfully removed",
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const handleCreateBooking = async (req, res) => {
  console.log("route hitted");
  try {
    // Destructure request body
    const {
      shippingAddress,
      bookingAddress,
      products,
      payment_info,
      shipping_info,
      OrderSummary,
      userId,
    } = req.body;

    console.log(
      shippingAddress,
      bookingAddress,
      products,
      payment_info,
      shipping_info,
      OrderSummary,
      userId
    );

    // Validate required fields
    if (
      !shippingAddress ||
      !bookingAddress ||
      !products ||
      !payment_info ||
      !shipping_info ||
      !OrderSummary ||
      !userId
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newPayment = new Payments({
      paymentType: payment_info.method,
      paymentStatus: payment_info.status,
      amountPaid: OrderSummary.Total,
      codDetails: payment_info.codDetails,
      transactionId: payment_info.transactionId,
      payerId: payment_info.payerId,
    });

    // Save the payment and get the ObjectId
    const savedPayment = await newPayment.save();

    const shippingDetails = {
      shipping_type: shipping_info.shippingMethod,
      shipping_date: Date.now(),
      shipping_Cost: shipping_info.shippingCost,
    };

    const newBooking = new Bookings({
      userId: userId,
      bookings: [
        {
          shippingAddress: shippingAddress,
          bookingAddress: bookingAddress,
          products: products,
          payment_info: savedPayment._id,
          shipping_info: shippingDetails,
          OrderSummary: OrderSummary,
          OrderStatus: "Confirmed",
        },
      ],
    });

    const savedBooking = await newBooking.save();

    const user = await User.findById(userId);
    if (user) {
      user.myOrders.push(savedBooking._id);
      await user.save();
    }

    const userCart = await Cart.findOne({ userId: userId });
    if (userCart) {
      userCart.items = [];
      await userCart.save();
    }

    const updatedUser = await getUserDetails(userId);

    return res.status(201).json({
      message: "Booking created successfully",
      updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
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
};
