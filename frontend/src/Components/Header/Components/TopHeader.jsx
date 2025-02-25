import React, { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoIosSearch } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { MdOutlineShoppingBag } from "react-icons/md";
import HamburgerMenu from "./HamburgerMenu";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const TopHeader = () => {
  const user = useSelector((state) => state.user.user);
  const [searchVal, setSearchValue] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const params = useParams();

  const handleSearchValueChange = (e) => {
    setSearchValue(e.target.value);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    if (isSearchVisible) {
      setSearchValue(""); // Clear search when hiding input
    }
  };

  return (
    <div className="w-full">
      {/* Small and Medium Screens */}
      <div className="relative">
        {/* When search is not visible, show the header */}
        {!isSearchVisible && (
          <div className="flex justify-between p-2 sm:block md:block lg:hidden pt-4">
            <div className="flex gap-2">
              <div>
                <HamburgerMenu />
              </div>
              <div>
                <Link to="/">
                  <h1 className="font-semibold text-gray-600">SINAI HEALTH</h1>
                </Link>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              {/* Search Icon - Toggles search input visibility */}
              <div onClick={toggleSearch} className="cursor-pointer">
                <IoIosSearch className="text-2xl" />
              </div>
              <div>
                <FaLocationDot />
              </div>
              <Link to="/cart">
                <div className="relative mb-2">
                  <MdOutlineShoppingBag className="w-10 h-5" />
                  {user?.myCart[0]?.items?.length > 0 && (
                    <span className="absolute top-[-11px] right-[-2px] bg-yellow-500 text-white text-[10px] font-semibold rounded-full px-2 py-1">
                      {user?.myCart[0]?.items?.length > 0
                        ? user?.myCart[0]?.items?.length
                        : ""}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>
        )}

        {/* When search is visible, show the search input */}
        {isSearchVisible && (
          <div className="absolute top-0 left-0 w-full h-12 bg-white z-50 flex justify-center ">
            <div className="flex w-full sm:w-full md:w-full  bg-gray-100 mb-1">
              <input
                className="border-none w-full p-2 rounded-l-md focus:outline-none"
                value={searchVal}
                onChange={handleSearchValueChange}
                type="text"
                placeholder="Search..."
                onFocus={(e) => (e.target.style.border = "none")}
              />
              <Link to={`/medicines?q=${searchVal}`}>
                <IoIosSearch className="text-xl text-black p-2 cursor-pointer w-8 h-full " />
              </Link>
              <button
                onClick={toggleSearch}
                className="text-black text-md font-semibold p-2 cursor-pointer "
              >
                X
              </button>
            </div>
          </div>
        )}
      </div>

      {/* For Larger Screens */}
      <div className="hidden lg:flex justify-between bg-[rgb(135,164,2)] w-full p-1">
        <div className="ml-20 text-white text-sm flex gap-6">
          <div className="">Note : All values are in CA$</div>
          <div className="">
            Minimum order value is 50 CA$ excluding shipping
          </div>
        </div>
        <div className="flex mr-20 cursor-pointer">
          <div className="pt-[4px] text-white text-sm">
            <CiLocationOn />
          </div>
          <div className="text-white text-sm">Track Order</div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
