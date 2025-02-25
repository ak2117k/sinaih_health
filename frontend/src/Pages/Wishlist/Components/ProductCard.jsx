import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../../Store/User";

const ProductCard = () => {
  const userWishlistedItems = useSelector(
    (state) => state.user?.user?.wishlistedItems || []
  );
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  // Handle removing item from the wishlist
  const handleRemoveItem = async (productId) => {
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
      if (response.status === 200) {
        const updatedUser = response?.data?.updatedUser;
        dispatch(addUser(updatedUser)); // Update the user state with the new wishlist
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Handle adding item to the cart after removing from wishlist
  const handleAddToBag = async (productId) => {
    try {
      // First, remove the item from the wishlist
      await handleRemoveItem(productId);

      // Then, add it to the cart
      const token = localStorage.getItem("authToken");
      const response = await axios.put(
        `https://sinaih-health.vercel.app/api/users/addToCart?productId=${productId}&userId=${
          user?._id
        }&qty=${1}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const updatedUser = response?.data?.updatedUser;
        console.log("Added to cart");
        dispatch(addUser(updatedUser)); // Update the user state with the new cart
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {userWishlistedItems?.map((product) => (
        <div
          key={product._id}
          className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow relative"
        >
          {/* Close (X) Button */}
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none cursor-pointer"
            onClick={() => handleRemoveItem(product._id)}
          >
            ✕
          </button>
          {/* Product Image */}
          <div className="flex justify-center items-center w-full h-40">
            <img
              src={product?.images[0]}
              alt={product.name}
              className="transition-all duration-300 ease-out transform hover:translate-y-[-5px] w-80 md:w-[50%] object-cover hover:scale-105 cursor-pointer"
            />
          </div>
          {/* Product Info */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600 text-ellipsis overflow-hidden line-clamp-2">
              {product.description}
            </p>
            <div className="text-[rgb(135,164,2)] font-bold mt-2">
              ${product.price}
            </div>

            {/* Stock Status */}
            <div
              className={`mt-2 text-sm font-semibold ${
                product.stockSize > 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {product.stockSize > 0 ? "Available" : "Out of Stock"}
            </div>
          </div>
          {/* Add to Cart Button */}
          <div className="w-full mt-6">
            <button
              className={`px-4 py-2 rounded-md text-white ${
                product.stockSize > 0
                  ? "bg-[rgb(135,164,2)] hover:bg-[rgb(135,164,6)]"
                  : "bg-gray-400 cursor-not-allowed"
              } w-full flex justify-center items-center cursor-pointer`}
              disabled={product.stockSize === 0}
              onClick={() => handleAddToBag(product._id)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
