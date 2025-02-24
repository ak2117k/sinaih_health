import React from "react";
import Header from "./Components/Header";
import ProductCard from "./Components/ProductCard";
import Total from "./Components/Total";
import { useSelector } from "react-redux";
import { FiHeart, FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";

const index = () => {
  const user = useSelector((state) => state.user.user);
  return (
    <>
      {user === null && (
        <div className="flex justify-center items-center p-6 bg-gray-100 rounded-md shadow-md my-6 mx-4 sm:mx-6 md:mx-10 lg:mx-16">
          <FiLogIn className="text-4xl text-gray-500 mr-4" />
          <div className="text-center text-sm sm:text-base md:text-lg lg:text-xl text-gray-700">
            Log In to see your Cart.
            <br />
            <Link to="/sign-in" className="text-blue-600 hover:underline">
              Log In
            </Link>
          </div>
        </div>
      )}
      {user !== null && (
        <>
          <div className="hidden lg:flex gap-4 ml-4 mt-2">
            <div className="w-[70%] ">
              <div className="">
                <Header />
              </div>
              <div className="">
                <ProductCard />
              </div>
            </div>
            <div className="w-[30%]">
              <Total />
            </div>
          </div>

          <div className="block lg:hidden">
            <div className="w-full px-4 py-4">
              <Header />
            </div>
            <div className="w-full px-4 py-4">
              <ProductCard />
            </div>
            <div className="w-full px-4 py-4">
              <Total />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default index;
