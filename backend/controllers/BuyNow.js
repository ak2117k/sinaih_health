const BuyNowBookings = require("../models/BuyNowBookings");

const createNewBooking = async (req, res) => {
  try {
    const {
      email,
      shippingAddress,
      bookingAddress,
      payment,
      products,
      shipping_info,
      OrderSummary,
    } = req.body;

    console.log(
      email,
      shippingAddress,
      bookingAddress,
      payment,
      products,
      shipping_info,
      OrderSummary
    );

    // Ensure that all necessary data is provided
    if (
      !email ||
      !shippingAddress ||
      !bookingAddress ||
      !products ||
      !shipping_info ||
      !OrderSummary
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new booking object
    const newBooking = {
      shippingAddress,
      bookingAddress,
      payment,
      products: products.map((p) => ({
        productId: p.productId,
        name: p.productName,
        quantity: p.quantity,
        price: p.price,
      })),
      shipping_info,
      OrderSummary,
    };

    // Check if user with the provided email already exists
    const userBooking = await BuyNowBookings.findOne({ email: email });

    if (userBooking) {
      // If user exists, push the new booking into their bookings array
      userBooking.bookings.push(newBooking);
      const response = await userBooking.save(); // Save the updated document
      return res
        .status(200)
        .json({ message: "Booking added successfully.", response });
    } else {
      // If user doesn't exist, create a new user with the provided email and booking
      const newUserBooking = new BuyNowBookings({
        email: email,
        bookings: [newBooking],
      });

      const response = await newUserBooking.save(); // Save the new user with the booking
      console.log(response);
      return res.status(201).json({
        message: "User and booking created successfully.",
        response: response,
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while processing your request." });
  }
};

module.exports = { createNewBooking };
