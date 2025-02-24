import React from "react";
import Header from "./Components/Header";
import DifferentProduct from "./Components/DifferentProduct";
import ProductCard from "./Components/ProductCard";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FiHeart, FiLogIn } from "react-icons/fi";
const Index = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <>
      {user === null && (
        <div className="flex justify-center items-center p-6 bg-gray-100 rounded-md shadow-md my-6 mx-4 sm:mx-6 md:mx-10 lg:mx-16">
          <FiLogIn className="text-4xl text-gray-500 mr-4" />
          <div className="text-center text-sm sm:text-base md:text-lg lg:text-xl text-gray-700">
            Log In to see your wishlisted items.
            <br />
            <Link to="/sign-in" className="text-blue-600 hover:underline">
              Log In
            </Link>
          </div>
        </div>
      )}

      {user !== null && user.wishlistedItems.length === 0 && (
        <div className="flex justify-center items-center p-6 bg-yellow-100 rounded-md shadow-md my-6 mx-4 sm:mx-6 md:mx-10 lg:mx-16">
          <FiHeart className="text-4xl text-gray-500 mr-4" />
          <div className="text-center text-sm sm:text-base md:text-lg lg:text-xl text-gray-700">
            Nothing in your wishlist.
            <br />
            Browse products to add to your wishlist.
            <br />
            <Link to="/medicines">
              <button className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                Browse Products
              </button>
            </Link>
          </div>
        </div>
      )}
      {user !== null && user.wishlistedItems.length > 0 && (
        <>
          <div className="p-4">
            <Header />
          </div>
          <div className="p-2">
            <DifferentProduct />
          </div>
          <div className="p-4">
            <ProductCard />
          </div>
        </>
      )}
    </>
  );
};

export default Index;
