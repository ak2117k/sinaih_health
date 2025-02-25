import axios from "axios";
import React, { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addUser } from "../../../Store/User";
import Modal from "./Modal";

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [notification, setnotification] = useState("");

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const clearNotification = () => {
    setnotification("");
  };

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
        console.log(response.data.message);
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
      }
    } catch (error) {
      if (error?.response?.status === 401) setShowLoginModal(true);
      console.log(error);
    }
  };

  return (
    <div className="p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow h-auto sm:h-[550px] md:h-[600px]">
      <div className="flex justify-center items-center w-full  sm:h-20 md:h-60">
        <Link
          to={`/products/${product.name
            .split(" ")
            .map((w) => w.trim())
            .join("_")}`}
          className="flex justify-center items-center h-full w-full"
        >
          <img
            src={product?.images[0]}
            alt={product.name}
            className="transition-all duration-300 ease-out transform hover:translate-y-[-5px] w-full sm:w-3/4 md:w-2/3  hover:scale-105 cursor-pointer h-full"
          />
        </Link>
      </div>
      <div className="flex justify-between items-center mt-2 sm:mt-4">
        <h2 className="text-lg sm:text-xl font-semibold">{product.name}</h2>
        <div
          className="cursor-pointer"
          onClick={() => handleWishlistToggle(product._id)}
        >
          {user?.wishlistedItems?.some((item) => item._id === product._id) ? (
            <FaHeart className="text-red-500" size={24} />
          ) : (
            <FaRegHeart className="text-gray-500" size={24} />
          )}
        </div>
      </div>
      <p className="text-gray-600 text-ellipsis overflow-hidden line-clamp-2 mt-2 sm:mt-3">
        {product.description}
      </p>
      <div className="text-[rgb(135,164,2)] font-bold mt-4 text-lg sm:text-xl">
        ${product.price}
      </div>

      <div className="flex justify-between items-center mt-4 sm:mt-6">
        <div className="flex items-center">
          <button
            onClick={handleDecrease}
            className="bg-gray-300 text-gray-700 px-2 py-1 rounded-l-md hover:bg-gray-400 focus:outline-none cursor-pointer"
          >
            -
          </button>
          <span className="mx-2 text-lg">{quantity}</span>
          <button
            onClick={handleIncrease}
            className="bg-gray-300 text-gray-700 px-2 py-1 rounded-r-md hover:bg-gray-400 focus:outline-none cursor-pointer"
          >
            +
          </button>
        </div>

        <button
          className="bg-[rgb(135,164,2)] text-white px-4 py-2 rounded-md hover:bg-[rgb(135,164,6)] mr-6 cursor-pointer"
          onClick={() => handleAddToCart(product._id)}
        >
          Add to Cart
        </button>
      </div>

      {showLoginModal && (
        <div className="fixed top-6 left-0 w-full h-80 bg-opacity-50 z-50 flex justify-center items-start pt-8 ">
          <div className="">
            <Modal setShowLoginModal={setShowLoginModal} />
          </div>
        </div>
      )}
      {notification !== "" && (
        <div
          className="p-2 flex justify-center items-center rounded-md fixed top-[650px] left-[45%] text-white z-10 transition-all ease-in-out duration-300"
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
    </div>
  );
};

export default ProductCard;
