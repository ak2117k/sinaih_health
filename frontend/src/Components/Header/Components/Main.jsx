import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import logo from "../../../assets/SinaiHealth.png";

const Main = () => {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  const [isHovered, setIsHovered] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleSeachValueChange = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <div className="">
      {/* For Smaller and medium Screen */}
      <div className="lg:hidden md:hidden sm:block bg-[rgb(135,164,2)] text-sm text-white flex justify-center items-center text-center p-2">
        Minimum order value is CA$ excluding shipping
      </div>

      {/* For Larger Screen  */}

      <div className="hidden lg:flex gap-40 h-20 items-center">
        <div className="w-40 h-14  ml-20">
          <Link to="/">
            <img src={logo} className="w-40 h-14"></img>
          </Link>
        </div>
        <div className="flex ml-10">
          <input
            type="search"
            placeholder="Search Products... "
            className="focus:outline-none flex items-center justify-start border-[1px] border-gray-500 p-2 w-80 br-none h-10"
            onChange={handleSeachValueChange}
          ></input>
          <div className=" flex text-white justify-center items-center bg-[rgb(135,164,2)] w-8 h-10 text-10 cursor-pointer font-semibold">
            <Link to={`/medicines?q=${searchValue}`}>
              <CiSearch className="w-6 h-10" />
            </Link>
          </div>
        </div>
        <div className="flex gap-2 ml-40">
          {!user && (
            <div className="flex gap-2">
              <Link to="/sign-in">
                <div className="pl-4 items-center justify-center cursor-pointer">
                  <div className="pl-2">
                    <FaUserCircle className="w-4 h-4" />
                  </div>
                  <div className="text-gray-500 text-sm block">Login</div>
                </div>
              </Link>

              <div className="">or</div>
              <Link to="/sign-up">
                <div className="cursor-pointer">
                  <div className="pl-4">
                    <FaUserPlus />
                  </div>
                  <div className="text-gray-500 text-sm">Sign Up</div>
                </div>
              </Link>
            </div>
          )}
          {user && (
            <div
              className="ml-14 mr-20 cursor-pointer relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="">
                <FaUserCircle className="w-6 h-6 " />
              </div>
              {isHovered && (
                <div className="absolute top-6 left-0 mt-1 w-40 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  <ul className="space-y-2 p-2">
                    {/* Wrap each menu item in a Link for navigation */}
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <Link to="/myaccount">Account</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <Link to="/myaccount/orders">Orders</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <Link to="/myaccount/wishlist">Wishlist</Link>
                    </li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                      <Link to="myaccount/addresses">Address</Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="cursor-pointer w-8 flex items-center justify-center relative">
            <Link to="/cart">
              <FiShoppingCart className="w-8 h-8" />
              <span className="absolute top-[-13px] right-[-4px] bg-yellow-500 text-white text-xs font-semibold rounded-full px-2 py-1">
                {user?.myCart[0]?.items?.length > 0
                  ? user?.myCart[0]?.items?.length
                  : ""}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
