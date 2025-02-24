import axios from "axios";
import React, { useState } from "react";
import { FaFacebook, FaHeart, FaRegHeart, FaWhatsapp } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addUser } from "../../../Store/User";
import Modal from "../../Products/Components/Modal";

const Details = ({ singleProduct }) => {
  const [quantity, setQuantity] = useState(1);
  const [showMore, setShowMore] = useState(false);
  const [notification, setnotification] = useState("");
  const [cartText, setCartText] = useState("Add To Cart");
  const [showLoginModal, setShowLoginModal] = useState(false);

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleQuantityChange = (type) => {
    if (type === "increment") {
      setQuantity(quantity + 1);
    } else if (type === "decrement" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const clearNotification = () => {
    setnotification("");
  };

  const originalPrice = singleProduct?.price; // Placeholder, adjust as needed
  const discountedPrice = singleProduct?.oprice; // Placeholder, adjust as needed
  const discountPercentage = Math.round(
    ((originalPrice - discountedPrice) / originalPrice) * 100
  );

  const handleWishlistToggle = async (productId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `https://sinaih-health.vercel.app/api/users/wishlist?productId=${productId}&userId=${user?._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 401) {
        setShowLoginModal(true); // Show the modal if unauthorized
      } else {
        const user = response?.data?.updatedUser;
        dispatch(addUser(user)); // Update user state with the new wishlist
        setnotification(response.data.message);
        setTimeout(() => clearNotification(), 3000);
      }
    } catch (error) {
      if (error?.response?.status === 401) setShowLoginModal(true);
      console.log(error);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `https://sinaih-health.vercel.app/api/users/addToCart?productId=${productId}&userId=${user?._id}&qty=${quantity}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 401) {
        setShowLoginModal(true);
      } else {
        const user = response?.data?.updatedUser;
        dispatch(addUser(user));
        setnotification(response.data.message);
        setTimeout(() => clearNotification(), 3000);
        setCartText("Go To Bag");
      }
    } catch (error) {
      if (error?.response?.status === 401) setShowLoginModal(true);
      console.log(error);
    }
  };

  return (
    <div className="p-4 rounded-lg shadow-lg w-full h-auto">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold mb-1">{singleProduct?.brand}</h1>
        <div className="flex justify-end mt-4 space-x-2">
          <FaFacebook
            className="text-blue-500 cursor-pointer shadow-lg"
            size={24}
          />
          <FaSquareXTwitter
            className="text-black cursor-pointer shadow-lg"
            size={24}
          />
          <FaWhatsapp
            className="text-green-500 cursor-pointer shadow-lg"
            size={24}
          />
        </div>
      </div>
      <h2 className="text-xl mb-2">{singleProduct?.name}</h2>
      <h3 className="text-sm text-gray-500 mb-4">{singleProduct?.category}</h3>

      <div className="mb-4">
        <span className="line-through text-gray-500 mr-2">
          ₹{originalPrice}
        </span>
        <span className="text-red-600 text-2xl font-semibold">
          ₹{discountedPrice}
        </span>
        <span className="text-green-600 ml-2">{discountPercentage}% OFF</span>
      </div>

      <p className="mb-4 w-full text-ellipsis overflow-hidden line-clamp-1">
        {singleProduct?.description}
      </p>
      <button
        onClick={() => setShowMore(!showMore)}
        className="text-blue-500 underline mb-4 cursor-pointer"
      >
        {showMore ? "Show Less" : "More Information"}
      </button>
      {showMore && (
        <p
          className="mb-4 transition-all duration-700 ease-in-out opacity-100 max-h-full overflow-hidden"
          style={{
            maxHeight: showMore ? "500px" : "0px", // Adjust maxHeight as needed
            opacity: showMore ? 1 : 0,
          }}
        >
          {singleProduct?.description}
        </p>
      )}

      <div className="flex items-center mb-4">
        <button
          onClick={() => handleQuantityChange("decrement")}
          className="px-2 py-1 border"
        >
          -
        </button>
        <span className="px-4">{quantity}</span>
        <button
          onClick={() => handleQuantityChange("increment")}
          className="px-2 py-1 border"
        >
          +
        </button>
      </div>

      <div className="flex gap-6 mt-10 ">
        {cartText === "Add To Cart" ? (
          <button
            className="bg-green-600 text-white w-60 py-2 rounded-lg cursor-pointer "
            onClick={() => handleAddToCart(singleProduct?._id)}
          >
            Add To Bag
          </button>
        ) : (
          <Link to="/cart">
            <button
              className="bg-green-600 text-white w-60 py-2 rounded-lg cursor-pointer "
              onClick={() => handleAddToCart(singleProduct?._id)}
            >
              Go To Bag
            </button>
          </Link>
        )}

        <div
          className="cursor-pointer py-2 border-1 border-gray-200 p-2 shadow-2xl rounded-full"
          onClick={() => handleWishlistToggle(singleProduct?._id)}
        >
          {user?.wishlistedItems?.some(
            (item) => item?._id === singleProduct?._id
          ) ? (
            <FaHeart className="text-red-500" size={28} />
          ) : (
            <FaRegHeart className="text-gray-500" size={28} />
          )}
        </div>
      </div>
      {notification !== "" && (
        <div
          className="p-2 flex justify-center items-center rounded-md fixed w-11/12 sm:w-9/12 md:w-8/12 lg:w-4/12 bottom-8 left-1/2 transform -translate-x-1/2 z-10 text-white transition-all ease-in-out duration-300"
          style={{
            backgroundColor:
              notification === "Item added to wishlist" ||
              notification === "Item added to cart successfully"
                ? "rgb(34,193,34)"
                : "rgb(255,69,58)",
          }}
        >
          {notification}
        </div>
      )}

      {showLoginModal && (
        <div className="fixed top-6 left-0 w-full h-80 bg-opacity-50 z-50 flex justify-center items-start pt-8 ">
          <div className="">
            <Modal setShowLoginModal={setShowLoginModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Details;
