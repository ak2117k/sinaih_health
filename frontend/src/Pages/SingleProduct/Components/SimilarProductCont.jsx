import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Slider from "react-slick"; // Importing Slick Carousel
import { addUser } from "../../../Store/User";

const SimilarProductCont = ({ similarProducts }) => {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  // State to track quantities for each product
  const [quantities, setQuantities] = useState({});
  const [notification, setnotification] = useState("");
  const [cartText, setCartText] = useState({});

  useEffect(() => {
    // Initialize quantity for each product to 1 when component mounts
    const initialQuantities = similarProducts?.reduce((acc, product) => {
      if (product?._id) {
        acc[product._id] = 1; // Set initial quantity to 1 for each product
      }
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, [similarProducts]);

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
        `https://sinaih-health.vercel.app/api/users/addToCart?productId=${productId}&userId=${user?._id}&qty=${quantities[productId]}`,
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
        setCartText((p) => ({
          ...p,
          [productId]: "Go To Bag",
        }));
      }
    } catch (error) {
      if (error?.response?.status === 401) setShowLoginModal(true);
      console.log(error);
    }
  };

  const handleQuantityChange = (productId, type) => {
    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      if (type === "increment") {
        updatedQuantities[productId] = updatedQuantities[productId] + 1;
      } else if (type === "decrement" && updatedQuantities[productId] > 1) {
        updatedQuantities[productId] = updatedQuantities[productId] - 1;
      }
      return updatedQuantities;
    });
  };

  // Slick settings for the carousel
  const slickSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // Medium screens
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, // Small screens
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      {similarProducts && (
        <div className="p-2">
          <h1 className="font-bold text-[20px]">Similar Products</h1>

          {/* Grid View for larger screens */}
          <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4 p-4">
            {similarProducts?.length > 0 &&
              similarProducts?.map((product) => {
                const quantity = (quantities && quantities[product._id]) || 1;

                return (
                  <div
                    className="border-1 border-gray-400 rounded-lg shadow-lg p-4 relative"
                    key={product._id}
                  >
                    <div className="flex justify-center items-center mb-4">
                      <Link
                        to={`/products/${product.name
                          .split(" ")
                          .map((w) => w.trim())
                          .join("_")}`}
                      >
                        <img
                          className="w-40 h-40 object-contain cursor-pointer"
                          src={product.images[0]}
                          alt={product.name}
                        />
                      </Link>
                    </div>

                    {/* Wishlist icon */}
                    <div
                      className="cursor-pointer absolute top-2 right-2"
                      onClick={() => handleWishlistToggle(product._id)}
                    >
                      {user?.wishlistedItems?.some(
                        (item) => item._id === product._id
                      ) ? (
                        <FaHeart className="text-red-500" size={24} />
                      ) : (
                        <FaRegHeart className="text-gray-500" size={24} />
                      )}
                    </div>

                    {/* Product Name */}
                    <div className="text-center mb-2">
                      <h1 className="text-lg font-semibold text-ellipsis line-clamp-1">
                        {product.name}
                      </h1>
                    </div>

                    {/* Price */}
                    <div className="flex justify-center gap-2 mb-4">
                      {product.price !== product.oprice && (
                        <h2 className="line-through text-gray-500 mr-2">
                          {product.price}
                        </h2>
                      )}
                      <h2 className="text-xl font-bold">${product?.oprice}</h2>
                    </div>

                    {/* Quantity and Add to Cart */}
                    <div className="flex items-baseline">
                      <div className="flex justify-between items-center gap-2 h-20">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              handleQuantityChange(product._id, "decrement")
                            }
                            className="px-2 py-1 border rounded-l-md hover:bg-gray-200"
                          >
                            -
                          </button>
                          <span className="px-4 text-lg">{quantity}</span>
                          <button
                            onClick={() =>
                              handleQuantityChange(product._id, "increment")
                            }
                            className="px-2 py-1 border rounded-r-md hover:bg-gray-200"
                          >
                            +
                          </button>
                        </div>

                        {cartText[product._id] ? (
                          <button
                            onClick={() => handleAddToCart(product._id)}
                            className="bg-green-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-green-700 cursor-pointer"
                          >
                            <Link to="/cart">
                              <FaShoppingCart /> Go To Bag
                            </Link>
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAddToCart(product._id)}
                            className="bg-green-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-green-700 cursor-pointer"
                          >
                            <FaShoppingCart /> Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Slick Carousel for small and medium screens */}
          <div className="sm:hidden">
            <Slider {...slickSettings}>
              {similarProducts?.map((product) => {
                const quantity = (quantities && quantities[product._id]) || 1;

                return (
                  <div
                    className="border-1 border-gray-400 rounded-lg shadow-lg p-4 relative"
                    key={product._id}
                  >
                    <div className="flex justify-center items-center mb-4 ">
                      <Link
                        to={`/products/${product.name
                          .split(" ")
                          .map((w) => w.trim())
                          .join("_")}`}
                      >
                        <img
                          className="w-40 h-40 object-contain cursor-pointer"
                          src={product.images[0]}
                          alt={product.name}
                        />
                      </Link>
                    </div>

                    {/* Wishlist icon */}
                    <div
                      className="cursor-pointer absolute top-2 right-2"
                      onClick={() => handleWishlistToggle(product._id)}
                    >
                      {user?.wishlistedItems?.some(
                        (item) => item._id === product._id
                      ) ? (
                        <FaHeart className="text-red-500" size={24} />
                      ) : (
                        <FaRegHeart className="text-gray-500" size={24} />
                      )}
                    </div>

                    {/* Product Name */}
                    <div className="text-center mb-2">
                      <h1 className="text-lg font-semibold text-ellipsis line-clamp-1">
                        {product.name}
                      </h1>
                    </div>

                    {/* Price */}
                    <div className="flex justify-center gap-2 mb-4">
                      {product.price !== product.oprice && (
                        <h2 className="line-through text-gray-500 mr-2">
                          {product.price}
                        </h2>
                      )}
                      <h2 className="text-xl font-bold">{product?.oprice}</h2>
                    </div>

                    {/* Quantity and Add to Cart */}
                    <div className="flex items-baseline ml-6">
                      <div className="flex justify-between items-center gap-4 h-20">
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              handleQuantityChange(product._id, "decrement")
                            }
                            className="px-2 py-1 border rounded-l-md hover:bg-gray-200"
                          >
                            -
                          </button>
                          <span className="px-4 text-lg">{quantity}</span>
                          <button
                            onClick={() =>
                              handleQuantityChange(product._id, "increment")
                            }
                            className="px-2 py-1 border rounded-r-md hover:bg-gray-200"
                          >
                            +
                          </button>
                        </div>

                        {cartText[product._id] ? (
                          <Link to="/cart" className="flex gap-2">
                            <button
                              onClick={() => handleAddToCart(product._id)}
                              className="bg-green-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-green-700 cursor-pointer"
                            >
                              <FaShoppingCart /> Go To Bag
                            </button>
                          </Link>
                        ) : (
                          <button
                            onClick={() => handleAddToCart(product._id)}
                            className="bg-green-600 text-white py-2 px-4 rounded-lg flex items-center gap-2 hover:bg-green-700 cursor-pointer"
                          >
                            <FaShoppingCart /> Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      )}

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
    </div>
  );
};

export default SimilarProductCont;
