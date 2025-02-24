import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Total = () => {
  const userCart = useSelector((state) => state.user.user.myCart);
  const cartItems = userCart[0]?.items;

  const calculateTotal = () => {
    return (
      cartItems?.reduce(
        (total, item) => total + item.quantity * (item.productId.oprice || 0),
        0
      ) || 0
    );
  };

  return (
    <div className="mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-gray-700 mb-4">PRICE SUMMARY</h3>
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-600">Total Price :</span>
        <span className="text-green-600 font-bold pr-2">
          ₹{calculateTotal()}
        </span>
      </div>

      <div className="mt-2 flex justify-between">
        <span className="text-gray-600">Discount :</span>
        <span className="text-green-600 font-bold pr-2">₹{0}</span>
      </div>

      <div className="mt-2 flex justify-between">
        <span className="text-gray-600">Delivery Fee :</span>
        <span className="text-green-600 font-bold pr-2">₹{0}</span>
      </div>

      <div className="w-full mt-2">
        <hr />
      </div>

      <Link to="/orders/checkout">
        <button className="bg-[rgb(135,164,2)] text-white px-6 py-2 rounded-lg hover:bg-[rgb(135,164,6)] cursor-pointer w-full mt-4">
          Proceed to Checkout
        </button>
      </Link>
    </div>
  );
};

export default Total;
