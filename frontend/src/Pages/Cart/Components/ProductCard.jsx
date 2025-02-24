import axios from "axios";
import { X } from "lucide-react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addUser } from "../../../Store/User";

const ProductCard = () => {
  const userCart = useSelector((state) => state.user.user.myCart);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleRemoveItem = async (itemId) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.delete(
        `https://sinaih-health.vercel.app/api/users/deleteitemfromcart?productId=${itemId}&userId=${user?._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const user = response?.data?.updatedUser;
        dispatch(addUser(user));
        console.log("Item successfully removed from the cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantityChange = async (itemId, delta) => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `https://sinaih-health.vercel.app/api/users/updateCart?productId=${itemId}&userId=${user?._id}&type=${delta}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const user = response?.data?.updatedUser;
        dispatch(addUser(user));
        console.log("Data updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {userCart[0]?.items.map((cartItem) => (
          <div
            key={cartItem._id}
            className="shadow-lg rounded-xl p-4 flex flex-col justify-between relative hover:shadow-2xl transition-all duration-300"
          >
            {/* Remove Item Button */}
            <button
              className="absolute top-2 right-2 p-1 bg-red-200 text-red-600 rounded-full hover:bg-red-500 hover:text-white transition-all cursor-pointer"
              onClick={() => handleRemoveItem(cartItem.productId._id)}
            >
              <X size={14} />
            </button>

            {/* Product Image */}
            <div className="w-full flex items-center justify-center">
              <Link
                to={`/products/${cartItem?.productId.name
                  .split(" ")
                  .map((w) => w.trim())
                  .join("_")}`}
                className="flex justify-center items-center w-full"
              >
                <img
                  src={cartItem.productId.images[0]}
                  alt={cartItem.productId.name}
                  className="w-[60%] h-40 object-cover rounded-xl mb-4 transition-all duration-300 ease-out transform hover:translate-y-[-5px] cursor-pointer"
                />
              </Link>
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {cartItem.productId.name}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-1 mb-3">
                {cartItem.productId.description}
              </p>
              <div className="flex justify-between items-center mt-2">
                {/* Quantity Controls */}
                <div className="flex items-center w-16 h-8">
                  <button
                    onClick={() =>
                      handleQuantityChange(cartItem.productId._id, "sub")
                    }
                    className="bg-gray-300 text-gray-700 px-2 py-1 rounded-l-md hover:bg-gray-400 focus:outline-none cursor-pointer"
                  >
                    -
                  </button>
                  <span className="mx-2 text-lg">{cartItem.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(cartItem.productId._id, "add")
                    }
                    className="bg-gray-300 text-gray-700 px-2 py-1 rounded-r-md hover:bg-gray-400 focus:outline-none cursor-pointer"
                  >
                    +
                  </button>
                </div>
                {/* Product Total Price */}
                <span className="text-sm text-green-600 font-semibold">
                  Total: ₹{cartItem.quantity * (cartItem.productId.oprice || 0)}
                </span>
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Added on: 08-Feb-2025
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
