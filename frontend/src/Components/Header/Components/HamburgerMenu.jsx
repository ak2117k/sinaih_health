import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../../../Store/User";

const HamburgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isListItemOpen, setIsListItemOpen] = useState({
    Products: false,
    Account: false,
  });

  const brands = useSelector((state) => state.brands.brands);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Toggle main menu visibility
  const toggleMenu = (itemName) => {
    if (itemName === "Products" || itemName === "Account") return;
    setIsListItemOpen({
      Products: false,
      Account: false,
    });
    setIsMenuOpen(!isMenuOpen);
  };

  // Toggle the dropdown visibility for Products and Account sections
  const toggleDropdown = (itemName) => {
    setIsListItemOpen((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  const handleLogOut = () => {
    localStorage.clear();
    dispatch(clearUser());
    setIsMenuOpen(false);
    navigate("/");
  };

  return (
    <div className="relative">
      {/* Top Bar (Logo & Hamburger Icon) */}
      <div className="flex justify-between items-center md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-2xl z-50 cursor-pointer"
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Overlay Background (Dark Transparent Background) */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)} // Close menu when clicking overlay
      ></div>

      {/* Mobile Menu (Slide-in from Left) */}
      <ul
        className={`fixed top-10 left-0 h-auto w-screen bg-gray-200 p-6 shadow-lg z-50 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
      >
        {/* User Section */}
        {user ? (
          <div className="p-4 border-b border-gray-300 flex justify-between">
            <p>{`Hi, ${user.profile.firstName} ${user.profile.lastName}`}</p>
            <Link
              className="block text-sm text-red-500 hover:text-red-700"
              onClick={handleLogOut}
            >
              Logout
            </Link>
          </div>
        ) : (
          <div className="p-4 border-b border-gray-300 flex gap-4">
            <Link
              to="/sign-in"
              className="block text-sm text-blue-500 hover:text-blue-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/sign-up"
              className="block text-sm text-blue-500 hover:text-blue-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        )}

        {/* Main Menu Items */}
        {[
          { name: "Home", path: "/" },
          { name: "Men", path: "/medicines" },
          { name: "Women", path: "/medicines" },
          { name: "Medicines", path: "/medicines" },
          {
            name: "Products",
            items: brands, // List of brand items
          },
          { name: "Testimonials", path: "/testimonials" },
          { name: "About Us", path: "/aboutUs" },
          {
            name: "Account",
            items: ["myaccount", "orders", "wishlist", "addresses"],
          },
          { name: "Blogs", path: "/blogs" },
          { name: "Contact Us", path: "/contactUs" },
        ].map((item) => (
          <li
            key={item.name}
            className="p-3 hover:bg-[rgb(135,164,2)] hover:text-white text-black cursor-pointer transition-colors duration-200 flex justify-between"
            onClick={() => toggleMenu(item.name)} // Close menu on item click
          >
            {item?.path ? (
              <Link to={item.path} className="flex justify-between">
                {item.name}
              </Link>
            ) : (
              <>
                <p className="w-full relative">
                  {item.name}
                  {item.items && (
                    <span
                      className="text-black ml-2 text-lg cursor-pointer"
                      onClick={() => toggleDropdown(item.name)}
                    >
                      {isListItemOpen[item.name] ? "-" : "+"}
                    </span>
                  )}
                </p>
                {isListItemOpen[item.name] && item.items && (
                  <div className="absolute bg-gray-200 shadow-md p-2 rounded-md h-auto right-4 mt-6 w-full transition-all duration-300 ease-in-out">
                    <ul>
                      {item.items.map((b, index) => (
                        <li
                          key={index}
                          className="hover:bg-[rgb(135,164,2)] hover:text-white flex p-2 ml-50"
                        >
                          {item.name === "Products" ? (
                            <Link
                              to={`/medicines/${b}`}
                              className="flex start"
                              onClick={() => setIsMenuOpen(false)} // Close menu after clicking brand
                            >
                              {b}
                            </Link>
                          ) : (
                            <Link
                              to={`/myaccount/${b}`}
                              className="flex start capitalize"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {b}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HamburgerMenu;
